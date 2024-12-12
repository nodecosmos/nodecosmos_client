import { HEADER_HEIGHT } from '../../../features/app/constants';
import { NodecosmosTheme } from '../../../themes/themes.types';
import { useEditorContext } from '../../hooks/editor/useEditorContext';
import { Box, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
    children: React.ReactNode;
}

export default function EditorContainer({ children }: Props) {
    const theme: NodecosmosTheme = useTheme();
    const {
        toolbarHeight,
        editorBackgroundColor,
        editorOutline = 2,
        editorFocusBorderColor = 'toolbar.purple',
        p = 0,
        px = 0,
        py = 0,
    } = useEditorContext();

    const sx = useMemo(() => ({
        height: '100%',
        cursor: 'text',
        overflow: 'hidden',
        backgroundColor: editorBackgroundColor ?? 'backgrounds.3',
        // toolbar
        '.EditorToolbar': {
            pl: 1,
            display: 'flex',
            alignItems: 'center',
            height: toolbarHeight ?? HEADER_HEIGHT,
            position: 'relative',
            zIndex: 1,
            width: 1,
            whiteSpace: 'nowrap',
            overflowX: 'auto',
            borderBottom: 1,
            borderColor: 'borders.2',
            backgroundColor: 'backgrounds.5',
        },
        '.TextEditor': {
            overflow: 'auto',
            height: `calc(100% - ${HEADER_HEIGHT} - 16px)`, // 16px is the padding of the editor
            border: 1,
            borderRadius: 1,
            borderColor: 'borders.4',
            m: 1,
            '&:focus-within': {
                outline: editorOutline,
                outlineColor: editorFocusBorderColor,
            },
        },
        '.ContainerRef': {
            width: 1,
            height: `calc(100% - ${HEADER_HEIGHT})`,
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
            backgroundColor: 'backgrounds.5',
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
                backgroundColor: 'backgrounds.5',
                color: 'texts.disabled',
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
        theme.palette.texts.primary,
        toolbarHeight,
    ]);

    return (
        <Box id="editor-container" sx={sx}>
            {children}
        </Box>
    );
}
