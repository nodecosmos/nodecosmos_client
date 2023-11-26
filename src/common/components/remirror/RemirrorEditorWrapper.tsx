import RemirrorClickable from './RemirrorClickable';
import RemirrorEditorContainer from './RemirrorEditorContainer';
import RemirrorEditorToolbar from './RemirrorEditorToolbar';
import DescriptionContainer from '../DescriptionContainer';
import { AnyExtension, RemirrorEventListenerProps } from '@remirror/core';
import {
    EditorComponent, Remirror, useRemirror,
} from '@remirror/react';
import { UseRemirrorProps } from '@remirror/react-core';
import React from 'react';
import { MarkdownExtension } from 'remirror/extensions';

interface RemirrorEditorWrapperProps {
    extensions: AnyExtension[];
    setInitialContent: boolean;
    markdown: string;
    onChange?: (props: RemirrorEventListenerProps<MarkdownExtension>) => void;
}

export default function RemirrorEditorWrapper(props: RemirrorEditorWrapperProps) {
    const {
        extensions, setInitialContent, markdown, onChange,
    } = props;

    const options: UseRemirrorProps<AnyExtension> = {
        extensions: () => extensions,
        stringHandler: 'markdown',
    };

    if (setInitialContent) {
        options.content = markdown;
    }

    const { manager, state } = useRemirror(options);

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

