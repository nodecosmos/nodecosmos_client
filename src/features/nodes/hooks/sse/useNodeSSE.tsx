import { CHANNEL_NAME, InitActions } from '../../../../../workers/sse';
import nodecosmos from '../../../../api/nodecosmos-server';
import { NodecosmosDispatch } from '../../../../store';
import { ActionTypes, UUID } from '../../../../types';
import { SSECreateComment } from '../../../comments/commentsSlice';
import { selectCurrentUser } from '../../../users/users.selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeSSE(rootId?: UUID) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!currentUser || !rootId) {
            return;
        }

        const channel = new BroadcastChannel(CHANNEL_NAME);

        channel.onmessage = (event) => {
            switch (event.data.action) {
            case ActionTypes.CreateComment:
                dispatch(SSECreateComment(event.data.payload));
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
                        url: `${nodecosmos.defaults.baseURL}/nodes/${rootId}/events/listen`,
                        userId: currentUser.id,
                    });
                });
            });
        }

        window.onbeforeunload = () => {
            channel.postMessage({ action: ActionTypes.CloseSSE });
        };

        return () => {
            channel.postMessage({ action: ActionTypes.CloseSSE });

            channel.close();
        };
    }, [currentUser, dispatch, rootId]);
}
