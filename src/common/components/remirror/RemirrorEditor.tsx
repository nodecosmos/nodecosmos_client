import RemirrorEditorWrapper from './RemirrorEditorWrapper';
import useExtensions from '../../hooks/remirror/useExtensions';
import { HelpersFromExtensions, RemirrorEventListenerProps } from '@remirror/core';
import React, { useCallback } from 'react';
import { MarkdownExtension } from 'remirror/extensions';
import * as Y from 'yjs';

interface RemirrorEditorProps {
    markdown: string;
    onChange: (helpers: HelpersFromExtensions<MarkdownExtension>, uint8ArrayState: Uint8Array | null) => void;
    wsRoomId?: string;
    base64?: string | null;
    wsAuthNodeId?: string;
    isRealTime?: boolean;
}

export default function RemirrorEditor(props: RemirrorEditorProps) {
    const {
        markdown, onChange, wsRoomId, base64, wsAuthNodeId, isRealTime,
    } = props;

    const { extensions, doc } = useExtensions({
        isRealTime,
        base64,
        wsAuthNodeId,
        wsRoomId,
    });

    const handleChange = useCallback((remirrorProps: RemirrorEventListenerProps<MarkdownExtension>) => {
        if (remirrorProps.tr && remirrorProps.tr.docChanged) {
            let encoded = null;
            if (doc && isRealTime) {
                encoded = Y.encodeStateAsUpdateV2(doc);
            }

            onChange(remirrorProps.helpers, encoded);
        }
    }, [doc, isRealTime, onChange]);

    if (!extensions) return null;

    return (
        <RemirrorEditorWrapper
            extensions={extensions}
            markdown={markdown}
            onChange={handleChange}
            setInitialContent={!base64}
        />
    );
}

