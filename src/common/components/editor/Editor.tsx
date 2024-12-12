import EditorContainer from './EditorContainer';
import EditorToolbar from './EditorToolbar';
import markdownParser from './markdown/parser';
import markdownSerializer from './markdown/serializer';
import schema from './schema';
import { EditorExtensions } from './types';
import { UUID } from '../../../types';
import { useEditorContextCreator } from '../../hooks/editor/useEditorContext';
import useYDoc from '../../hooks/editor/useYDoc';
import useOutsideClick from '../../hooks/useOutsideClick';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { DOMSerializer } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-gapcursor/style/gapcursor.css';

export interface EditorProps {
    markdown: string;
    onChange: (html: string, markdown: string, uint8ArrayState: Uint8Array | null) => void;
    fileObjectId: UUID;
    isRealTime?: boolean;
    base64?: string | null;
    wsRoomId?: UUID;
    wsAuthNodeId?: UUID;
    wsAuthNodeBranchId?: UUID;
    wsAuthRootId?: UUID;
    extensions?: EditorExtensions[];
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
    editorClassName?: string;
}

export default function Editor(props: EditorProps) {
    const editorContainerRef = useRef(null);
    const editorViewRef = useRef<EditorView | null>(null); // Ref to store the EditorView
    const [editorView, setEditorView] = React.useState<EditorView | null>(null);
    const {
        markdown,
        onChange,
        fileObjectId,
        isRealTime,
        base64,
        wsRoomId,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        extensions,
        p,
        px,
        py,
        toolbarHeight,
        editorBackgroundColor,
        editorOutline,
        editorFocusBorderColor,
        info,
        clearState,
        autoFocus,
        editorClassName,
        onBlur,
    } = props;

    const {
        EditorContext,
        ctxValue,
    } = useEditorContextCreator({
        fileObjectId,
        editorView,
        extensions,
        p,
        px,
        py,
        toolbarHeight,
        editorBackgroundColor,
        editorOutline,
        editorFocusBorderColor,
        info,
        clearState,
        autoFocus,
    });

    const yDoc = useYDoc({
        isRealTime,
        base64,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        wsRoomId,
    });

    const [, resetState] = React.useState<boolean>(false);

    useEffect(() => {
        if (!editorContainerRef.current || editorViewRef.current) return;
        if (!yDoc && isRealTime) return;

        const doc = markdownParser.parse(markdown);
        const ydocPlugins = yDoc ? yDoc.plugins : [];

        const state = EditorState.create({
            doc,
            schema,
            plugins: [
                keymap(baseKeymap),
                ...ydocPlugins,
            ],
        });

        // Initialize EditorView
        const view = new EditorView(editorContainerRef.current, {
            state,
            dispatchTransaction(transaction) {
                if (!editorViewRef.current) return;

                const newState = editorViewRef.current.state.apply(transaction);
                editorViewRef.current.updateState(newState);

                const html = getHtml(newState);
                const markdown = getMarkdown(newState);

                // Extract content for onChange
                let uint8ArrayState = null;

                if (isRealTime && yDoc) {
                    uint8ArrayState = Y.encodeStateAsUpdateV2(yDoc.doc);
                }

                resetState((prev) => !prev);
                onChange(html, markdown, uint8ArrayState);
            },
        });

        editorViewRef.current = view;

        setEditorView(view);

        return () => {
            console.log('Destroying EditorView');
            view.destroy();
            editorViewRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRealTime, yDoc]);

    useOutsideClick(editorContainerRef, onBlur);

    return (
        <EditorContext.Provider value={ctxValue}>
            <EditorContainer>
                <EditorToolbar />
                <div className="TextEditor">
                    <div ref={editorContainerRef} className={`ContainerRef DescriptionHTML ${editorClassName}`} />
                </div>
            </EditorContainer>
        </EditorContext.Provider>
    );
}

// @ts-ignore
function getHtml(newState: EditorState): string {
    const fragment = DOMSerializer
        .fromSchema(newState.schema)
        .serializeFragment(newState.doc.content);

    const div = document.createElement('div');
    div.appendChild(fragment);

    return div.innerHTML;
}

// @ts-ignore
function getMarkdown(newState: EditorState): string {
    return markdownSerializer.serialize(newState.doc);
}
