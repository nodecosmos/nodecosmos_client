import { HEADER_HEIGHT } from '../../../features/app/constants';
import { NodecosmosTheme } from '../../../themes/type';
import { useEditorContext } from '../../hooks/editor/useEditorContext';
import { Box, useTheme } from '@mui/material';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function RemirrorEditorContainer({ children }: Props) {
    const theme: NodecosmosTheme = useTheme();
    const {
        toolbarHeight, p = 0, px = 0, py = 0, editorBackgroundColor, editorFocusColor,
    } = useEditorContext();

    return (
        <Box
            sx={{
                height: '100%',
                cursor: 'text',
                overflow: 'hidden',
                backgroundColor: editorBackgroundColor ?? 'background.3',
                // toolbar
                '.RemirrorToolbar': {
                    display: 'flex',
                    alignItems: 'center',
                    height: toolbarHeight ?? HEADER_HEIGHT,
                    position: 'relative',
                    zIndex: 1,
                    width: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'auto',
                    borderBottom: 1,
                    borderColor: 'borders.2',
                    backgroundColor: 'background.5',
                },
                '.RemirrorTextEditor': {
                    overflow: 'auto',
                    height: `calc(100% - ${HEADER_HEIGHT} - 16px)`, // 16px is the padding of the editor
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'borders.4',
                    m: 1,
                    '&:focus-within': {
                        outline: 2,
                        outlineColor: editorFocusColor ?? 'toolbar.purple',
                    },
                },
                '.remirror-editor-wrapper': {
                    width: 1,
                    height: `calc(100% - ${HEADER_HEIGHT})`,
                    minHeight: 100,
                    overflow: 'auto',
                    p: p ?? 0,
                    px: px ?? 0,
                    py: py ?? 0,
                    caretColor: theme.palette.text.primary + '!important',
                },
                '.MuiButtonBase-root': {
                    color: 'text.secondary',
                    backgroundColor: 'background.5',
                    border: 0,
                    borderColor: 'borders.2',
                    // mr: 0.5,
                    width: 40,
                    height: 28,

                    '&.Mui-selected': {
                        backgroundColor: 'background.8',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.secondary',
                            backgroundColor: 'background.8',
                        },
                    },

                    '&.Mui-disabled': {
                        border: 0,
                        backgroundColor: 'background.5',
                        color: 'text.disabled',
                    },
                },
            }}
        >
            {children}
        </Box>
    );
}
