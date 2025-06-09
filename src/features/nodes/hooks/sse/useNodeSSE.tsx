import { CHANNEL_NAME, InitActions } from '../../../../../workers/sse';
import nodecosmos from '../../../../api/nodecosmos-server';
import { NodecosmosDispatch } from '../../../../store';
import { ActionTypes, UUID } from '../../../../types';
import { showThreadIfNotExists } from '../../../comments/comments.thunks';
import { SSECreateComment } from '../../../comments/commentsSlice';
import { selectCurrentUser } from '../../../users/users.selectors';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeSSE(rootId?: UUID) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const initializedByRootId = useRef<Set<UUID>>(new Set<UUID>());

    useEffect(() => {
        if (!currentUser || !rootId || initializedByRootId.current.has(rootId)) {
            return;
        }

        initializedByRootId.current.add(rootId);

        const channel = new BroadcastChannel(CHANNEL_NAME);

        channel.onmessage = async (event) => {
            switch (event.data.action) {
            case ActionTypes.CreateComment: {
                const thread = event.data.payload;
                const {
                    threadId, branchId, objectId,
                } = thread;
                await dispatch(showThreadIfNotExists({
                    rootId,
                    threadId,
                    branchId,
                    objectId,
                }));
                dispatch(SSECreateComment(thread));
            }
                break;
            }
        };

        if ('Notification' in self && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission().catch((error) => {
                console.error('Notification permission error:', error);
            });
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.active?.postMessage({
                        action: InitActions.Initialize,
                        url: `${nodecosmos.defaults.baseURL}/no-compress-nodes/${rootId}/events/listen`,
                        userId: currentUser.id,
                    });
                });
            });
        }

        window.onbeforeunload = () => {
            channel.postMessage({ action: ActionTypes.CloseSSE });
        };

        return () => {
            if (initializedByRootId.current.has(rootId)) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                initializedByRootId.current.delete(rootId);
                channel.postMessage({ action: ActionTypes.CloseSSE });
            }
        };
    }, [currentUser, dispatch, rootId]);
}
