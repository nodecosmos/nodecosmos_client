import { EDITOR_TOOLBAR_HEIGHT, HEADER_HEIGHT } from '../../../features/app/constants';
import { NodecosmosTheme } from '../../../themes/themes.types';
import { useEditorContext } from '../../hooks/editor/useEditorContext';
import useOutsideClick from '../../hooks/useOutsideClick';
import { Box, useTheme } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-gapcursor/style/gapcursor.css';

interface Props {
    children: React.ReactNode;
}

export default function EditorContainer({ children }: Props) {
    const editorContainerRef = useRef(null);
    const theme: NodecosmosTheme = useTheme();
    const {
        toolbarHeight,
        editorBackgroundColor,
        editorOutline = 1.5,
        editorFocusBorderColor = 'borders.5',
        p = 0,
        px = 0,
        py = 0,
        onBlur,
    } = useEditorContext();

    const sx = useMemo(() => ({
        height: '100%',
        cursor: 'text',
        overflow: 'hidden',
        backgroundColor: editorBackgroundColor ?? 'backgrounds.3',
        border: editorOutline,
        borderColor: 'transparent',
        borderRadius: 1.5,
        '&:focus, &:focus-within, &:active, &:target, &:focus-visible': {
            border: editorOutline,
            borderColor: editorFocusBorderColor,
        },
        // toolbar
        '.EditorToolbar': {
            p: 1,
            display: 'flex',
            alignItems: 'center',
            height: toolbarHeight ?? EDITOR_TOOLBAR_HEIGHT,
            position: 'relative',
            zIndex: 1,
            width: 1,
            whiteSpace: 'nowrap',
            overflowX: 'auto',
            overflowY: 'hidden',
            // borderBottom: editorOutline ? 0 : 1,
            borderColor: 'borders.2',
            backgroundColor: 'backgrounds.5',
            borderBottom: `1px solid ${theme.palette.borders[2]}`,
        },
        '.TextEditor': {
            overflow: 'auto',
            height: `calc(100% - ${HEADER_HEIGHT} - 16px)`, // 16px is the padding of the editor
            m: 1,
            mt: 0.5,
            borderRadius: 1,
            '.placeholder': {
                color: 'texts.tertiary',
                fontSize: '1rem',
                // prevent the placeholder from being selected
                pointerEvents: 'none',
            },
        },
        '.ContainerRef': {
            width: 1,
            height: `calc(100% - ${HEADER_HEIGHT} - 16px)`,
            minHeight: 100,
            overflow: 'visible',
            p: p ?? 0,
            px: px ?? 0,
            py: py ?? 0,
            caretColor: theme.palette.texts.primary + '!important',
            '.ProseMirror': {
                padding: 2,
                margin: 0,
                outline: 'none',
                '&:focus': { outline: 'none' },
                height: 1,
            },
        },
        '.MuiButtonBase-root': {
            color: 'texts.secondary',
            border: 0,
            borderColor: 'borders.2',
            // mr: 0.5,
            width: 40,
            height: 28,

            '&.Mui-selected': {
                backgroundColor: 'backgrounds.8',
                color: 'texts.secondary',
                '&:hover': {
                    color: 'texts.secondary',
                    backgroundColor: 'backgrounds.8',
                },
            },

            '&.Mui-disabled': {
                border: 0,
                color: 'texts.disabled',
            },
            '&:hover': {
                border: 0,
                backgroundColor: 'backgrounds.8',
            },
        },
    }),
    [
        editorBackgroundColor,
        editorFocusBorderColor,
        editorOutline,
        p,
        px,
        py,
        theme.palette,
        toolbarHeight,
    ]);

    useOutsideClick(editorContainerRef, onBlur);

    return (
        <Box id="editor-container" sx={sx} ref={editorContainerRef}>
            {children}
        </Box>
    );
}
