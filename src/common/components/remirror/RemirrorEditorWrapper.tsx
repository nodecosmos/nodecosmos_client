import RemirrorClickable from './RemirrorClickable';
import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';
import { RemirrorExtensions } from '../../hooks/remirror/useExtensions';
import DescriptionContainer from '../DescriptionContainer';
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
}

export default function RemirrorEditorWrapper(props: RemirrorEditorWrapperProps) {
    const {
        extensions, setInitialContent, markdown, onChange,
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
                <RemirrorEditorToolbar />
                <RemirrorClickable>
                    <DescriptionContainer width={1} maxWidth={'100%'}>
                        <EditorComponent />
                    </DescriptionContainer>
                </RemirrorClickable>
            </Remirror>
        </RemirrorEditorContainer>
    );
}
