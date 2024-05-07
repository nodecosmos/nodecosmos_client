import useExtensions, { RemirrorExtensions } from './useExtensions';
import { RemirrorEditorProps } from '../../components/editor/RemirrorEditor';
import { createContext, useContext } from 'react';
import { Doc } from 'yjs';

interface EditorContextValue extends RemirrorEditorProps {
    extensions: RemirrorExtensions[];
    doc: Doc | null;
}

const EditorContext = createContext<EditorContextValue>({} as EditorContextValue);

export function useEditorContextCreator(props: RemirrorEditorProps) {
    const {
        wsRoomId, base64, wsAuthNodeId, wsAuthNodeBranchId, wsAuthRootId,
        isRealTime, enabledExtensions,
    } = props;

    const { extensions, doc } = useExtensions({
        isRealTime,
        base64,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        wsRoomId,
        enabledExtensions,
    });

    return {
        EditorContext,
        ctxValue: {
            ...props,
            extensions,
            doc,
        },
    };
}

export function useEditorContext() {
    return useContext(EditorContext);
}
