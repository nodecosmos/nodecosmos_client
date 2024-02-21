import RemirrorClickable from './RemirrorClickable';
import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';
import { EnabledExtensions, RemirrorExtensions } from '../../hooks/remirror/useExtensions';
import { Box } from '@mui/material';
import { RemirrorEventListenerProps } from '@remirror/core';
import {
    EditorComponent, Remirror, useRemirror,
} from '@remirror/react';
import React from 'react';
import { MarkdownExtension } from 'remirror/extensions';

interface RemirrorEditorWrapperProps {
    extensions: RemirrorExtensions[];
    setInitialContent: boolean;
    markdown: string;
    onChange?: (props: RemirrorEventListenerProps<MarkdownExtension>) => void;
    enabledExtensions?: EnabledExtensions[];
    p?: number;
}

export default function RemirrorEditorWrapper(props: RemirrorEditorWrapperProps) {
    const {
        extensions, setInitialContent, markdown, onChange, enabledExtensions, p = 8,
    } = props;

    const { manager, state } = useRemirror<RemirrorExtensions>({
        extensions: () => extensions,
        content: (setInitialContent && markdown) || undefined,
        stringHandler: 'markdown',
    });

    return (
        <RemirrorEditorContainer>
            <Remirror
                manager={manager}
                initialContent={state}
                autoFocus
                onChange={onChange}
            >
                <RemirrorEditorToolbar enabledExtensions={enabledExtensions} />
                <RemirrorClickable>
                    <Box className="DescriptionHTML" p={p}>
                        <EditorComponent />
                    </Box>
                </RemirrorClickable>
            </Remirror>
        </RemirrorEditorContainer>
    );
}
