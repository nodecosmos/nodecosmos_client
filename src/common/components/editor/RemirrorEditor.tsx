/* eslint-disable react/no-unused-prop-types */
import RemirrorEditorWrapper from './RemirrorEditorWrapper';
import { UUID } from '../../../types';
import { useEditorContextCreator } from '../../hooks/editor/useEditorContext';
import { EnabledExtensions } from '../../hooks/editor/useExtensions';
import { HelpersFromExtensions } from '@remirror/core';
import React from 'react';
import { MarkdownExtension } from 'remirror/extensions';

export interface RemirrorEditorProps {
    markdown: string;
    onChange: (helpers: HelpersFromExtensions<MarkdownExtension>, uint8ArrayState: Uint8Array | null) => void;
    isRealTime?: boolean;
    base64?: string | null;
    wsRoomId?: UUID;
    wsAuthNodeId?: UUID;
    wsAuthNodeBranchId?: UUID;
    wsAuthRootId?: UUID;
    enabledExtensions?: EnabledExtensions[];
    p?: number;
    px?: number;
    py?: number;
    toolbarHeight?: number;
    editorBackgroundColor?: string;
    editorOutline?: number;
    editorFocusBorderColor?: string;
    info?: string;
    clearState?: boolean;
    autoFocus?: boolean;
    onBlur?: () => void;
}

export default function RemirrorEditor(props: RemirrorEditorProps) {
    const {
        EditorContext,
        ctxValue,
    } = useEditorContextCreator(props);

    if (ctxValue.extensions.length === 0) return null;

    return (
        <EditorContext.Provider value={ctxValue}>
            <RemirrorEditorWrapper />
        </EditorContext.Provider>
    );
}
