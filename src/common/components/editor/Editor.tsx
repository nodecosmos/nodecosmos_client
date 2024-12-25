import EditorContainer from './EditorContainer';
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
import { keymap } from 'prosemirror-keymap';
import { DOMSerializer, DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, {
    useCallback, useEffect, useRef,
} from 'react';
import * as Y from 'yjs';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-gapcursor/style/gapcursor.css';

export enum ContentType {
    Markdown,
    HTML,
    Base64YDoc,
}

export interface EditorProps {
    content: string;
    contentType: ContentType;
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

export default function Editor(props: EditorProps) {
    const editorRef = useRef(null);
    const editorViewRef = useRef<EditorView | null>(null); // Ref to store the EditorView
    const [editorView, setEditorView] = React.useState<EditorView | null>(null);
    const {
        content,
        contentType,
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
        if (!editorRef.current || editorViewRef.current) return;
        if (!y.docNode && isRealTime) return;

        const plugins = [
            keymap(buildKeymap(schema)),
            keymap(baseKeymap),
            buildInputRules(schema),
            trailingNode(),
        ];

        let doc;
        if (isRealTime) {
            doc = y.docNode;
            plugins.push(...y.plugins);
        } else if (contentType === ContentType.Markdown) {
            doc = markdownParser.parse(content);
        } else {
            const parser = DOMParser.fromSchema(schema);
            let div = document.createElement('div');
            div.innerHTML = content;
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
        const view = new EditorView(editorRef.current, {
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

    useEffect(() => {
        if (autoFocus && editorView) {
            editorView.focus();
        }
    }, [autoFocus, editorView]);

    const handleClick = useCallback(() => {
        if (!editorView) return;

        editorView.focus();
    }, [editorView]);

    return (
        <EditorContext.Provider value={ctxValue}>
            <EditorContainer>
                <EditorToolbar />
                <div className="TextEditor display-flex justify-center" onClick={handleClick}>
                    <div className="max-w-900 w-100">
                        <div
                            ref={editorRef}
                            className={`ContainerRef DescriptionHTML size-850 ${editorClassName}`} />
                    </div>
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
