import { WS_URI } from '../../../api/nodecosmos-server';
import { selectCurrentUser } from '../../../features/users/users.selectors';
import { UUID } from '../../../types';
import { base64ToUint8Array } from '../../../utils/serializer';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    ySyncPlugin, yCursorPlugin, yUndoPlugin,
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

    const doc = useMemo(() => {
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
            if (!isRealTime || !wsRoomId || !doc) return null;

            const wsProvider = new WebsocketProvider(
                `${WS_URI}/ws/descriptions/${wsAuthNodeBranchId}/${wsAuthNodeId}/${wsAuthRootId}`, wsRoomId, doc,
            );

            wsProvider.awareness.setLocalStateField('user', { name: currentUser.username });

            return wsProvider;
        },
        [currentUser.username, doc, isRealTime, wsAuthNodeBranchId, wsAuthNodeId, wsAuthRootId, wsRoomId],
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
        if (!doc || !provider) {
            return null;
        }

        return {
            doc,
            plugins: [
                ySyncPlugin(doc.getXmlFragment(PROSEMIRROR_Y_DOC)),
                yCursorPlugin(provider.awareness),
                yUndoPlugin(),
                history(),
                dropCursor(),
                gapCursor(),
            ],
        };
    }, [doc, provider]);
}
