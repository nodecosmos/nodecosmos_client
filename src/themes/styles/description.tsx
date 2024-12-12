import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.DescriptionHTML': {
        fontFamily: '-apple-system, system-ui, Roboto, sans-serif',
        width: '100%',
        '&.size-850': { maxWidth: 850 },
        color: theme.palette.texts.secondary,
        hr: {
            border: 0,
            borderBottom: 8,
            borderColor: theme.palette.borders[2],
        },
        blockquote: {
            margin: 0,
            backgroundColor: theme.palette.markdownContent.canvas,
            borderLeft: '6px solid',
            padding: '12px 6px',
            borderColor: theme.palette.markdownContent.canvasBorder,
            marginBlockEnd: '1em',
        },
        table: {
            tr: {
                borderRadius: 8,
                'td, th': {
                    mt: 8,
                    borderBottom: 8,
                    borderRight: 8,
                    borderColor: theme.palette.borders[2],
                    p: '12px 16px',
                },
                'td:last-of-type': { borderRight: 0 },
                'th:last-of-type': { borderRight: 0 },
                '&:last-of-type td': { borderBottom: 0 },
                '&:hover': { backgroundColor: theme.palette.backgrounds[8] },
            },
        },
        pre: {
            marginLeft: 0,
            padding: 16,
            borderRadius: 4,
            backgroundColor: theme.palette.markdownContent.canvas,
            textWrap: 'wrap',
        },
        a: { color: theme.palette.texts.link },
        p: {
            fontSize: 16,
            fontWeight: 400,
            wordWrap: 'break-word',
        },
        '&.fs-18': { p: { fontSize: 18 } },

        'h1, h2, h3, h4, h5, h6, p': { '&:empty': { height: 32 } },

        h1: {
            borderBottom: `1px solid ${theme.palette.borders[2]}`,
            marginBottom: 16,
        },
        'img:not(.ProseMirror-separator)': {
            maxWidth: '100%',
            borderRadius: 6,
        },
        'p:has(> img[src])': { textAlign: 'center' },
        li: { marginBlockEnd: 8 },
    },
});
