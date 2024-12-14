import schema from '../schema';
import markdownIt, { Token } from 'markdown-it';
import { MarkdownParser } from 'prosemirror-markdown';

const md = markdownIt({ html: true });

function listIsTight(tokens: readonly Token[], i: number) {
    let it = i;
    while ((it += 1) < tokens.length)
        if (tokens[it].type != 'list_item_open') return tokens[it].hidden;
    return false;
}

export default new MarkdownParser(schema, md, {
    blockquote: { block: 'blockquote' },
    paragraph: { block: 'paragraph' },
    list_item: { block: 'listItem' },
    bullet_list: {
        block: 'bulletList',
        getAttrs: (_, tokens, i) => ({ tight: listIsTight(tokens, i) }),
    },
    ordered_list: {
        block: 'orderedList',
        getAttrs: (tok, tokens, i) => ({
            order: +tok.attrGet('start')! || 1,
            tight: listIsTight(tokens, i),
        }),
    },
    heading: {
        block: 'heading',
        getAttrs: tok => ({ level: +tok.tag.slice(1) }),
    },
    code_block: {
        block: 'codeBlock',
        noCloseToken: true,
    },
    fence: {
        block: 'codeBlock',
        getAttrs: tok => ({ params: tok.info || '' }),
        noCloseToken: true,
    },
    hr: { node: 'horizontal_rule' },
    image: {
        node: 'image',
        getAttrs: tok => ({
            src: tok.attrGet('src'),
            title: tok.attrGet('title') || null,
            alt: (tok.children![0] && tok.children![0].content) || null,
        }),
    },
    hardbreak: { node: 'hardBreak' },
    em: { mark: 'italic' },
    strong: { mark: 'bold' },
    link: {
        mark: 'link',
        getAttrs: tok => ({
            href: tok.attrGet('href'),
            title: tok.attrGet('title') || null,
        }),
    },
    code_inline: {
        mark: 'code',
        noCloseToken: true,
    },
    strike: { mark: 'strike' },
    html_block: {
        block: 'html',
        getAttrs: (token) => {
            return { content: token.content };
        },
        noCloseToken: true,
    },
    html_inline: {
        node: 'htmlInline',
        getAttrs: (token) => {
            return { content: token.content };
        },
    },
});
