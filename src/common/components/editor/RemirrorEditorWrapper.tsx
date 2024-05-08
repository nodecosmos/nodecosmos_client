import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorFocusContainer from './RemirrorEditorFocusContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';
import { useEditorContext } from '../../hooks/editor/useEditorContext';
import { RemirrorExtensions } from '../../hooks/editor/useExtensions';
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import { RemirrorEventListenerProps } from '@remirror/core';
import {
    EditorComponent, Remirror, useRemirror,
} from '@remirror/react';
import React, { useCallback, useEffect } from 'react';
import { MarkdownExtension } from 'remirror/extensions';
import * as Y from 'yjs';

export default function RemirrorEditorWrapper() {
    const {
        base64, markdown, onChange, p = 8, doc, isRealTime, extensions, info, clearState, autoFocus = true, onBlur,
    } = useEditorContext();

    const handleChange = useCallback((remirrorProps: RemirrorEventListenerProps<MarkdownExtension>) => {
        if (remirrorProps.tr && remirrorProps.tr.docChanged) {
            let encoded = null;

            if (doc && isRealTime) {
                encoded = Y.encodeStateAsUpdateV2(doc);
            }

            onChange(remirrorProps.helpers, encoded);
        }
    }, [doc, isRealTime, onChange]);

    const {
        manager, state, setState,
    } = useRemirror<RemirrorExtensions>({
        extensions: () => extensions,
        content: (!base64 && markdown) || undefined,
        stringHandler: 'markdown',
    });

    useEffect(() => {
        // Whenever clearState changes, clear the content
        if (clearState !== undefined) {
            if (manager.output) {
                manager.output.clearContent();
            }
        }
    }, [clearState, manager, setState]);

    return (
        <RemirrorEditorContainer>
            <Remirror
                manager={manager}
                initialContent={state}
                autoFocus={autoFocus}
                onChange={handleChange}
                onBlur={onBlur}
                editable
            >
                <RemirrorEditorToolbar />
                <RemirrorEditorFocusContainer>
                    <Box className="DescriptionHTML" p={p}>
                        <EditorComponent />
                    </Box>
                </RemirrorEditorFocusContainer>
                {
                    info && (
                        <Box sx={{
                            ml: 1,
                            mb: 1,
                            color: 'text.tertiary',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                        }}
                        >
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <Typography
                                ml={1}
                                fontWeight="bold"
                                variant="caption"
                                color="text.tertiary">
                                {info}
                            </Typography>
                        </Box>
                    )
                }
            </Remirror>
        </RemirrorEditorContainer>
    );
}
