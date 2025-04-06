import { NodeSpec, Schema } from 'prosemirror-model';

const doc = { content: 'block+' };

const paragraph: NodeSpec = {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }, { tag: 'paragraph' }],
    toDOM() { return ['p', 0]; },
};

const heading: NodeSpec = {
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
        {
            tag: 'h1',
            attrs: { level: 1 },
        },
        {
            tag: 'h2',
            attrs: { level: 2 },
        },
        {
            tag: 'h3',
            attrs: { level: 3 },
        },
        {
            tag: 'h4',
            attrs: { level: 4 },
        },
        {
            tag: 'h5',
            attrs: { level: 5 },
        },
        {
            tag: 'h6',
            attrs: { level: 6 },
        },
        {
            tag: 'heading',
            getAttrs: (dom) => ({ level: dom.hasAttribute('level') ? +dom.getAttribute('level')! : 1 }),
        },

    ],
    toDOM(node) {
        return ['h' + node.attrs.level, 0];
    },
};

const bulletList: NodeSpec = {
    content: 'listItem+',
    group: 'block',
    parseDOM: [{ tag: 'ul' }, { tag: 'bulletList' }],
    toDOM() { return ['ul', 0]; },
};

const orderedList: NodeSpec = {
    attrs: { order: { default: 1 } },
    content: 'listItem+',
    group: 'block',
    parseDOM: [
        {
            tag: 'ol',
            getAttrs: dom => ({ order: dom.hasAttribute('start') ? +dom.getAttribute('start')! : 1 }),
        },
        {
            tag: 'orderedList',
            getAttrs: (dom) => ({ order: dom.hasAttribute('start') ? +dom.getAttribute('start')! : 1 }),
        },
    ],
    toDOM(node) {
        return node.attrs.order === 1 ? ['ol', 0] : ['ol', { start: node.attrs.order }, 0];
    },
};

const listItem: NodeSpec = {
    content: 'paragraph block*',
    parseDOM: [
        { tag: 'li' },
        { tag: 'listItem' },
    ],
    toDOM() { return ['li', 0]; },
};

const blockquote: NodeSpec = {
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    parseDOM: [{
        tag: 'blockquote',
        preserveWhitespace: 'full',
    }],
    toDOM() { return ['blockquote', 0]; },
};

const codeBlock: NodeSpec = {
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    parseDOM: [
        {
            tag: 'pre',
            preserveWhitespace: 'full',
        },
        {
            tag: 'codeBlock',
            preserveWhitespace: 'full',
        },
    ],
    toDOM() { return ['pre', ['code', 0]]; },
};

const image: NodeSpec = {
    inline: true,
    group: 'inline',
    attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
    },
    parseDOM: [
        {
            tag: 'img',
            getAttrs: dom => ({
                src: dom.getAttribute('src'),
                title: dom.getAttribute('title'),
                alt: dom.getAttribute('alt'),
            }),
        },
        {
            tag: 'image',
            getAttrs: dom => ({
                src: dom.getAttribute('src'),
                title: dom.getAttribute('title'),
                alt: dom.getAttribute('alt'),
            }),
        },
    ],
    toDOM(node) { return ['img', node.attrs]; },
};

const hardBreak: NodeSpec = {
    inline: true,
    selectable: false,
    parseDOM: [
        { tag: 'br' },
        { tag: 'hardBreak' },
    ],
    toDOM() { return ['br']; },
};

// Example for raw HTML block - adjust parseDOM/toDOM as needed
const html: NodeSpec = {
    group: 'block',
    attrs: { content: { default: '' } },
    parseDOM: [
        {
            tag: 'div.html-content',
            getAttrs: (dom: HTMLElement) => ({ content: dom.innerHTML }),
        },
    ],
    toDOM() {
        return ['div', { class: 'html-content' }, 0];
    },
};

// don't use marks as they are considered as inline text by the yrs on the server
const bold: NodeSpec = {
    inline: true,
    group: 'inline',
    content: 'inline*',
    parseDOM: [
        { tag: 'strong' },
        { tag: 'b' },
        { tag: 'bold' },
    ],
    toDOM() { return ['b', 0]; },
};

const italic: NodeSpec = {
    inline: true,
    group: 'inline',
    content: 'inline*',
    parseDOM: [
        { tag: 'em' },
        { tag: 'i' },
        { tag: 'italic' },
    ],
    toDOM() { return ['i', 0]; },
};

const strike: NodeSpec = {
    inline: true,
    group: 'inline',
    content: 'inline*',
    parseDOM: [{ tag: 'strike' }],
    toDOM() { return ['strike', 0]; },
};

const code: NodeSpec = {
    inline: true,
    group: 'inline',
    content: 'inline*',
    parseDOM: [{ tag: 'code' }],
    toDOM() { return ['code', 0]; },
};

const link: NodeSpec = {
    inline: true,
    group: 'inline',
    content: 'inline+',
    attrs: { href: {} },
    parseDOM: [
        {
            tag: 'a',
            getAttrs: dom => ({ href: dom.getAttribute('href') }),
        },
        {
            tag: 'link',
            getAttrs: dom => ({ href: dom.getAttribute('href') }),
        },
    ],
    toDOM(node) {
        return ['a', node.attrs, 0];
    },
};

export default new Schema({
    nodes: {
        doc,
        paragraph,
        heading,
        bulletList,
        orderedList,
        listItem,
        blockquote,
        codeBlock,
        image,
        html,
        hardBreak,
        text: { group: 'inline' },
        bold,
        italic,
        strike,
        code,
        link,

        // keep snake case for compatibility with the old schema
        list_item: listItem,
        bullet_list: bulletList,
        ordered_list: orderedList,
        code_block: codeBlock,
        block_quote: blockquote,
        horizontal_rule: hardBreak,
        hard_break: hardBreak,
    },
});
