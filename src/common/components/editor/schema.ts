import {
    MarkSpec, NodeSpec, Schema,
} from 'prosemirror-model';

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
        }, // Add support for <heading>

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
    content: 'block+',
    group: 'block',
    parseDOM: [{ tag: 'blockquote' }],
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
    attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
    },
    group: 'inline',
    draggable: true,
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

const htmlInline = {
    inline: true,
    group: 'inline',
    attrs: { content: { default: '' } },
    parseDOM: [
        {
            tag: 'span.html-inline-content',
            getAttrs: (dom: HTMLElement) => ({ content: dom.innerHTML }),
        },
    ],
};

// Inline marks
const bold: MarkSpec = {
    parseDOM: [
        { tag: 'strong' },
        { tag: 'b' },
        { tag: 'bold' },
    ],
    toDOM() { return ['b', 0]; },
};

const italic: MarkSpec = {
    parseDOM: [
        { tag: 'em' },
        { tag: 'i' },
        { tag: 'italic' },
    ],
    toDOM() { return ['i', 0]; },
};

const strike: MarkSpec = {
    parseDOM: [{ tag: 'strike' }],
    toDOM() { return ['strike', 0]; },
};

const code: MarkSpec = {
    parseDOM: [{ tag: 'code' }],
    toDOM() { return ['code', 0]; },
};

const link: MarkSpec = {
    attrs: { href: {} },
    inclusive: false,
    parseDOM: [
        {
            tag: 'a[href]',
            getAttrs: (dom: Element) => ({ href: dom.getAttribute('href') }),
        },
        {
            tag: 'link[href]',
            getAttrs: (dom: Element) => ({ href: dom.getAttribute('href') }),
        },
    ],
    toDOM(node) {
        return ['a', { href: node.attrs.href }, 0];
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
        list_item: listItem,
        bullet_list: bulletList,
        ordered_list: orderedList,
        code_block: codeBlock,
        horizontal_rule: hardBreak,
        hard_break: hardBreak,
        blockquote,
        codeBlock,
        image,
        html,
        htmlInline,
        hardBreak,
        text: { group: 'inline' },
    },
    marks: {
        bold,
        italic,
        strike,
        code,
        link,
    },
});
