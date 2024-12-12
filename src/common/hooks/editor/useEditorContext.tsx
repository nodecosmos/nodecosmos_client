import { UUID } from '../../../types';
import { EditorExtensions } from '../../components/editor/types';
import { EditorView } from 'prosemirror-view';
import {
    createContext, useContext, useMemo,
} from 'react';

interface EditorContextProps {
    extensions?: EditorExtensions[];
    toolbarHeight?: number;
    editorBackgroundColor?: string;
    editorOutline?: number,
    editorFocusBorderColor?: string,
    p?: number,
    px? : number,
    py? : number,
    fileObjectId?: UUID;
    editorView: EditorView | null;
    autoFocus?: boolean;
    info?: string;
    clearState?: boolean;
}

const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

export function useEditorContextCreator(props: EditorContextProps) {
    return useMemo(() => ({
        EditorContext,
        ctxValue: props,
    }), [props]);
}

export function useEditorContext() {
    return useContext(EditorContext);
}
