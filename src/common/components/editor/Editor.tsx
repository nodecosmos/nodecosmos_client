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

    const y = useYDoc({
        isRealTime,
        base64,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        wsRoomId,
    });

    const [, resetState] = React.useState<boolean>(false);

    useEffect(() => {
        if (clearState !== undefined) {
            if (editorViewRef.current) {
                editorViewRef.current.state.doc = schema.nodeFromJSON({
                    type: 'doc',
                    content: [],
                });
                editorViewRef.current.updateState(editorViewRef.current.state);
            }
        }
    }, [clearState]);

    useEffect(() => {
        if (!editorContainerRef.current || editorViewRef.current) return;
        if (!y.docNode && isRealTime) return;

        let doc;

        if (isRealTime) {
            doc = y.docNode;
        } else {
            doc = markdownParser.parse(markdown);
        }

        const state = EditorState.create({
            doc,
            schema,
            plugins: [
                keymap(baseKeymap),
                ...y.plugins,
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

                if (isRealTime && y.yDoc) {
                    uint8ArrayState = Y.encodeStateAsUpdateV2(y.yDoc);
                }

                resetState((prev) => !prev);
                onChange(html, markdown, uint8ArrayState);
            },
        });

        editorViewRef.current = view;

        setEditorView(view);

        return () => {
            view.destroy();
            editorViewRef.current = null;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRealTime, y.docNode, y.plugins, y.yDoc]);

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
