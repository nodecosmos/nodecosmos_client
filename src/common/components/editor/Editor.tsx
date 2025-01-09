import EditorContainer from './EditorContainer';
import EditorText from './EditorText';
import EditorToolbar from './EditorToolbar';
import markdownParser from './markdown/parser';
import markdownSerializer from './markdown/serializer';
import { buildInputRules } from './plugins/inputRules';
import { buildKeymap } from './plugins/keymap';
import { placeholderPlugin } from './plugins/placeholder';
import { trailingNode } from './plugins/trailingNodePlugin';
import schema from './schema';
import { EditorExtensions } from './types';
import { UUID } from '../../../types';
import { useEditorContextCreator } from '../../hooks/editor/useEditorContext';
import useYDoc from '../../hooks/editor/useYDoc';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { DOMSerializer, DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, {
    useCallback, useEffect, useRef,
} from 'react';
import * as Y from 'yjs';

export enum ContentType {
    Markdown,
    HTML,
    Base64YDoc,
}

export interface EditorProps {
    content: string;
    contentType: ContentType;
    currentHTML?: string;
    onChange: (html: string, markdown: string, uint8ArrayState: Uint8Array | null) => void;
    fileObjectId: UUID;
    isRealTime?: boolean;
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
    placeholder?: string;
    showBorder?: boolean;
}

function Editor(props: EditorProps) {
    const editorRef = useRef(null);
    const editorViewRef = useRef<EditorView | null>(null); // Ref to store the EditorView instance
    const [editorView, setEditorView] = React.useState<EditorView | null>(null);
    const {
        content,
        contentType,
        currentHTML,
        onChange,
        fileObjectId,
        isRealTime,
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
        placeholder,
        showBorder = true,
    } = props;

    const [
        EditorContext,
        ctxValue,
    ] = useEditorContextCreator({
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
        onBlur,
        showBorder,
    });

    const y = useYDoc({
        isRealTime,
        base64: content,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        wsRoomId,
    });

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
        if (!editorRef.current || editorViewRef.current) return;
        if (!y.docNode && isRealTime) return;

        const plugins = [
            keymap(buildKeymap(schema)),
            keymap(baseKeymap),
            buildInputRules(schema),
            trailingNode(),
            history({ newGroupDelay: 100 }),
        ];

        let doc;
        if (isRealTime) {
            doc = y.docNode;
            plugins.push(...y.plugins);
        } else if (contentType === ContentType.Markdown) {
            doc = markdownParser.parse(content);
        }

        if (contentType === ContentType.HTML || (isRealTime && !content && currentHTML)) {
            const parser = DOMParser.fromSchema(schema);
            let div = document.createElement('div');
            div.innerHTML = content || (currentHTML ?? '');
            doc = parser.parse(div);
        }

        if (placeholder) {
            plugins.push(placeholderPlugin(placeholder));
        }

        const state = EditorState.create({
            doc,
            schema,
            plugins,
        });

        // Initialize EditorView
        editorViewRef.current = new EditorView(editorRef.current, {
            state,
            dispatchTransaction(transaction) {
                if (!editorViewRef.current) return;

                const newState = editorViewRef.current.state.apply(transaction);
                editorViewRef.current.updateState(newState);

                if (transaction.docChanged) {
                    const html = getHtml(newState);
                    const markdown = getMarkdown(newState);

                    // Extract content for onChange
                    let uint8ArrayState = null;

                    if (isRealTime && y.yDoc) {
                        uint8ArrayState = Y.encodeStateAsUpdateV2(y.yDoc);
                    }

                    onChange(html, markdown, uint8ArrayState);
                }

                if (transaction.docChanged || transaction.selectionSet) {
                    editorViewRef.current.focus();

                    editorViewRef.current.dom.dispatchEvent(
                        new CustomEvent('pm-state-change', { detail: { state: newState } }),
                    );
                }
            },
        });

        setEditorView(editorViewRef.current);

        return () => {
            editorViewRef?.current?.destroy();
            editorViewRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRealTime, y.docNode, y.plugins, y.yDoc]);

    useEffect(() => {
        if (autoFocus && editorViewRef.current) {
            editorViewRef.current.focus();
        }
    }, [autoFocus]);

    const handleClick = useCallback(() => {
        if (!editorViewRef.current) return;

        editorViewRef.current.focus();
    }, []);

    return (
        <EditorContext.Provider value={ctxValue}>
            <EditorContainer>
                <EditorToolbar />
                <EditorText editorRef={editorRef} editorClassName={editorClassName} handleClick={handleClick} />
            </EditorContainer>
        </EditorContext.Provider>
    );
}

function getHtml(newState: EditorState): string {
    const fragment = DOMSerializer
        .fromSchema(newState.schema)
        .serializeFragment(newState.doc.content);

    const div = document.createElement('div');
    div.appendChild(fragment);

    return div.innerHTML;
}

function getMarkdown(newState: EditorState): string {
    return markdownSerializer.serialize(newState.doc);
}

export default React.memo(Editor);
