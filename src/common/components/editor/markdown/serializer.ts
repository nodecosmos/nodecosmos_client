import { MarkdownSerializer, MarkdownSerializerState } from 'prosemirror-markdown';
import { Mark, Node } from 'prosemirror-model';

// Define the custom mark handlers with proper typings
const customMarkHandlers: {
    [mark: string]: {
        /**
         The string that should appear before a piece of content marked
         by this mark, either directly or as a function that returns an
         appropriate string.
         */
        open: string | ((state: MarkdownSerializerState, mark: Mark, parent: Node, index: number) => string);
        /**
         The string that should appear after a piece of content marked by
         this mark.
         */
        close: string | ((state: MarkdownSerializerState, mark: Mark, parent: Node, index: number) => string);
        /**
         When `true`, this indicates that the order in which the mark's
         opening and closing syntax appears relative to other mixable
         marks can be varied. (For example, you can say `**a *b***` and
         `*a **b***`, but not `` `a *b*` ``.)
         */
        mixable?: boolean;
        /**
         When enabled, causes the serializer to move enclosing whitespace
         from inside the marks to outside the marks. This is necessary
         for emphasis marks as CommonMark does not permit enclosing
         whitespace inside emphasis marks, see:
         http:spec.commonmark.org/0.26/#example-330
         */
        expelEnclosingWhitespace?: boolean;
        /**
         Can be set to `false` to disable character escaping in a mark. A
         non-escaping mark has to have the highest precedence (must
         always be the innermost mark).
         */
        escape?: boolean;
    }
} = {
    bold: {
        open: '**',
        close: '**',
        mixable: true,
        expelEnclosingWhitespace: true,
    },
    italic: {
        open: '_',
        close: '_',
        mixable: true,
        expelEnclosingWhitespace: true,
    },
    strike: {
        open: '~~',
        close: '~~',
        mixable: true,
        expelEnclosingWhitespace: true,
    },
    code: {
        open: '`',
        close: '`',
        mixable: true,
    },
    link: {
        open: (_state, mark) => `[${mark.attrs.href}](`,
        close: ')',
    },
    // Add more mark handlers as needed
};

// Instantiate the custom MarkdownSerializer with proper typings
export default new MarkdownSerializer(
    {
        blockquote(state, node) {
            state.wrapBlock('> ', null, node, () => state.renderContent(node));
        },
        codeBlock(state, node) {
            // Make sure the front matter fences are longer than any dash sequence within it
            const backticks = node.textContent.match(/`{3,}/gm);
            const fence = backticks ? (backticks.sort().slice(-1)[0] + '`') : '```';

            state.write(fence + (node.attrs.params || '') + '\n');
            state.text(node.textContent, false);
            // Add a newline to the current content before adding closing marker
            state.write('\n');
            state.write(fence);
            state.closeBlock(node);
        },
        heading(state, node) {
            state.write(state.repeat('#', node.attrs.level) + ' ');
            state.renderInline(node, false);
            state.closeBlock(node);
        },
        hardBreak(state, node) {
            state.write(node.attrs.markup || '---');
            state.closeBlock(node);
        },
        bulletList(state, node) {
            state.renderList(node, '  ', () => (node.attrs.bullet || '*') + ' ');
        },
        orderedList(state, node) {
            let start = node.attrs.order || 1;
            let maxW = String(start + node.childCount - 1).length;
            let space = state.repeat(' ', maxW + 2);
            state.renderList(node, space, i => {
                let nStr = String(start + i);
                return state.repeat(' ', maxW - nStr.length) + nStr + '. ';
            });
        },
        listItem(state, node) {
            state.renderContent(node);
        },
        paragraph(state, node) {
            state.renderInline(node);
            state.closeBlock(node);
        },

        image(state, node) {
            state.write('![' + state.esc(node.attrs.alt || '') + '](' + node.attrs.src.replace(/[()]/g, '\\$&')
                + (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : '') + ')');
        },
        text(state, node) {
            // @ts-ignore
            state.text(node.text!, !state.inAutolink);
        },
        html: (state: MarkdownSerializerState, node: Node) => {
            state.write(node.attrs.content);
        },
        htmlInline: () => {},
    },
    customMarkHandlers,
);
