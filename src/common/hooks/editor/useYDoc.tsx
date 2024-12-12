import { WS_URI } from '../../../api/nodecosmos-server';
import { selectCurrentUser } from '../../../features/users/users.selectors';
import { UUID } from '../../../types';
import { base64ToUint8Array } from '../../../utils/serializer';
import schema from '../../components/editor/schema';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    ySyncPlugin, yCursorPlugin, initProseMirrorDoc,
} from 'y-prosemirror';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

const PROSEMIRROR_Y_DOC = 'prosemirror';

interface UseYDocProps {
    isRealTime?: boolean;
    base64?: string | null;
    wsAuthNodeId?: UUID;
    wsAuthNodeBranchId?: UUID;
    wsAuthRootId?: UUID;
    wsRoomId?: UUID;
}

export default function useYDoc(props: UseYDocProps) {
    const {
        isRealTime,
        base64,
        wsAuthNodeId,
        wsAuthNodeBranchId,
        wsAuthRootId,
        wsRoomId,
    } = props;

    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) {
        throw new Error('User not found');
    }

    const yDoc = useMemo(() => {
        if (!isRealTime) return null;

        const ydoc = new Y.Doc();

        if (base64) {
            const uint8Array = base64ToUint8Array(base64);
            base64 && Y.applyUpdateV2(ydoc, uint8Array);
        }

        return ydoc;

        // base64 is built on initial render if provided in props, and it should not be a dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRealTime]);

    const provider = useMemo(
        () => {
            if (!isRealTime || !wsRoomId || !yDoc) return null;

            const wsProvider = new WebsocketProvider(
                `${WS_URI}/ws/descriptions/${wsAuthNodeBranchId}/${wsAuthNodeId}/${wsAuthRootId}`, wsRoomId, yDoc,
            );

            wsProvider.awareness.setLocalStateField('user', { name: currentUser.username });

            return wsProvider;
        },
        [currentUser.username, yDoc, isRealTime, wsAuthNodeBranchId, wsAuthNodeId, wsAuthRootId, wsRoomId],
    );

    useEffect(() => {
        if (isRealTime) {
            if (!provider) return;

            provider.on('status', (event: {status: string}) => {
                console.log('status', event.status);
            });

            return () => {
                provider.disconnect();
            };
        }
    }, [isRealTime, provider]);

    return useMemo(() => {
        if (!yDoc || !provider) {
            return { plugins: [] };
        }

        const type = yDoc.get(PROSEMIRROR_Y_DOC, Y.XmlFragment);
        const { doc: docNode, mapping } = initProseMirrorDoc(type, schema);

        return {
            yDoc,
            docNode,
            plugins: [
                ySyncPlugin(type, { mapping }),
                yCursorPlugin(provider.awareness),
                history(),
                dropCursor(),
                gapCursor(),
            ],
        };
    }, [yDoc, provider]);
}
