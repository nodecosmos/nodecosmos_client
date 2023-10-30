import { tags as t } from '@lezer/highlight';
import { useTheme } from '@mui/material';
import { createTheme } from '@uiw/codemirror-themes';

export default function useCodeMirrorTheme() {
    const theme = useTheme();

    const {
        tagName,
        string,
        number,
        attributeName,
        className,
        operator,
        bracket,
        heading,
        emphasis,
        quote,
        meta,
        link,
        foreground,
        caret,
        selection,
        selectionMatch,
        lineHighlight,
        gutterBackground,
        gutterForeground,
        gutterActiveForeground,
    } = theme.palette.markdownEditor;

    const codeMirrorTheme = createTheme({
        theme: 'dark',
        settings: {
            background: 'transparent',
            foreground,
            caret,
            selection,
            selectionMatch,
            lineHighlight,
            gutterBackground,
            gutterForeground,
            gutterActiveForeground,
        },
        styles: [
            {
                tag: t.tagName,
                color: tagName,
            },
            {
                tag: [t.string],
                color: string,
            },
            {
                tag: t.number,
                color: number,
            },
            {
                tag: t.attributeName,
                color: attributeName,
            },
            {
                tag: t.className,
                color: className,
            },
            {
                tag: t.operator,
                color: operator,
            },
            {
                tag: t.bracket,
                color: bracket,
            },
            {
                tag: t.heading,
                color: heading,
            },
            {
                tag: t.emphasis,
                color: emphasis,
            },
            {
                tag: t.quote,
                color: quote,
            },
            {
                tag: t.meta,
                color: meta,
            },
            {
                tag: t.link,
                color: link,
            },
        ],
    });

    return codeMirrorTheme;
}
