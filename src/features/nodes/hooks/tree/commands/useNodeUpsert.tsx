import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import usePrevious from '../../../../../common/hooks/usePrevious';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosError, UUID } from '../../../../../types';
import { SAVE_NODE_TIMEOUT } from '../../../../nodes/constants';
import {
    replaceTmpWithPersisted, setActionInProgress, updateState,
} from '../../../actions';
import { selectNodeAttribute } from '../../../nodes.selectors';
import { createNode, updateNodeTitle } from '../../../nodes.thunks';
import useNodeContext from '../useNodeContext';
import {
    ChangeEvent,
    useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeTitleChange() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        branchId,
        id,
        parentId,
        rootId,
        title,
        isTemp,
        persistentId,
    } = useNodeContext();

    const order = useSelector(selectNodeAttribute(branchId, id, 'order'));
    const prevTitle = usePrevious(title);
    const handleServerError = useHandleServerErrorAlert();
    const [shouldReplaceTmpNode, setShouldReplaceTmpNode] = useState(false);

    //------------------------------------------------------------------------------------------------------------------
    const saveNodeTimeout = useRef<number | null>(null);

    const changeTitle = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        dispatch(setActionInProgress(true));
        dispatch(updateState({ id, title: value }));

        // TODO: Check if this is necessary
        if (persistentId !== id) {
            dispatch(updateState({ id: persistentId as UUID, title: value }));
        }

        if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

        if (!value || value === prevTitle) {
            dispatch(setActionInProgress(false));
            return;
        }

        saveNodeTimeout.current = setTimeout(async () => {
            if (persistentId) {
                const response = await dispatch(updateNodeTitle({ rootId, id: persistentId, branchId, title: value }));

                if (response.meta.requestStatus === 'rejected') {
                    const error: NodecosmosError = response.payload as NodecosmosError;
                    handleServerError(error);
                    console.error(error);

                    return;
                }
                dispatch(setActionInProgress(false));
            } else {
                const data = {
                    rootId,
                    parentId,
                    isRoot: false,
                    isPublic: true,
                    title: value,
                    order,
                    tmpNodeId: id,
                };

                dispatch(createNode(data)).then((response) => {
                    if (response.meta.requestStatus === 'rejected') {
                        const error: NodecosmosError = response.payload as NodecosmosError;
                        handleServerError(error);
                        console.error(error);

                        return;
                    }
                    dispatch(setActionInProgress(false));
                }).catch((error) => {
                    console.log(error);
                    dispatch(setActionInProgress(false));
                });
            }
        }, SAVE_NODE_TIMEOUT);
    }, [branchId, dispatch, handleServerError, id, order, parentId, persistentId, prevTitle, rootId]);

    //------------------------------------------------------------------------------------------------------------------
    const blurNode = useCallback(() => {
        dispatch(updateState({ branchId, id, isEditing: false }));

        const shouldReplace = !!title; // if title is empty, we don't have to replace tmp node with persisted node
        setShouldReplaceTmpNode(shouldReplace);
    }, [branchId, dispatch, id, title]);

    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (shouldReplaceTmpNode && isTemp && persistentId) {
            dispatch(replaceTmpWithPersisted({ branchId, tmpId: id, persistentId }));
        }
    }, [branchId, dispatch, id, isTemp, persistentId, shouldReplaceTmpNode]);

    //------------------------------------------------------------------------------------------------------------------
    return { changeTitle, blurNode };
}
