import { NodecosmosTheme } from '../type';

export default (theme: NodecosmosTheme) => ({
    '.DescriptionHTML': {
        width: '100%',
        color: theme.palette.text.secondary,
        hr: {
            border: 0,
            borderBottom: 8,
            borderColor: theme.palette.borders[2],
        },
        blockquote: {
            margin: 0,
            backgroundColor: theme.palette.markdownContent.canvas,
            borderRadius: 4,
            borderLeft: '8px solid',
            padding: '12px 6px',
            borderColor: theme.palette.borders[5],
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
                '&:hover': { backgroundColor: theme.palette.background[8] },
            },
        },
        pre: {
            marginLeft: 0,
            padding: 16,
            borderRadius: 4,
            backgroundColor: theme.palette.markdownContent.canvas,
            textWrap: 'wrap',
        },
        a: {
            color: theme.palette.text.link,
            fontWeight: 'bold',
        },
        p: { wordWrap: 'break-word' },
        'img:not(.ProseMirror-separator)': {
            maxWidth: 850,
            width: '100%',
            borderRadius: 20,
            marginTop: 16,
            marginBottom: 16,
        },
    },
});
