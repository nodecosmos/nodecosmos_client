import nodecosmos from '../../../api/nodecosmos-server';
import { NodecosmosDispatch } from '../../../store';
import { ActionTypes, UUID } from '../../../types';
import { Comment } from '../../comments/comments.types';
import { SSECreateComment } from '../../comments/commentsSlice';
import { selectCurrentUser } from '../../users/users.selectors';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeSSE(id: UUID, isNodeFetched: boolean) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const hasSse = useRef(false);

    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser || !isNodeFetched) {
        return;
    }

    if (hasSse.current) {
        return;
    }

    const eventSource = new EventSource(
        `${nodecosmos.defaults.baseURL}nodes/${id}/events/listen`,
        { withCredentials: true },
    );

    eventSource.addEventListener(ActionTypes.CreateComment, (event) => {
        const comment: Comment = JSON.parse(event.data);

        dispatch(SSECreateComment(comment));
    });

    hasSse.current = true;
}
