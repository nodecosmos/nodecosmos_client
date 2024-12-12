import {
    defaultMarkdownSerializer, MarkdownSerializer, MarkdownSerializerState,
} from 'prosemirror-markdown';
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
        ...defaultMarkdownSerializer.nodes,
        html: (state: MarkdownSerializerState, node: Node) => {
            state.write(node.attrs.content);
        },
        htmlInline: () => {},
    },
    customMarkHandlers,
);
