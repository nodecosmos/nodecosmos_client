import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import usePrevious from '../../../../../common/hooks/usePrevious';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosError } from '../../../../../types';
import {
    replaceTmpWithPersisted, setActionInProgress, updateState,
} from '../../../actions';
import { SAVE_NODE_TIMEOUT } from '../../../nodes.constants';
import { selectNodeAttribute } from '../../../nodes.selectors';
import { createNode, updateNodeTitle } from '../../../nodes.thunks';
import useNodeContext from '../useNodeContext';
import {
    ChangeEvent,
    useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeUpsert() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        treeBranchId,
        branchId,
        id,
        parentId,
        rootId,
        title,
        isTemp,
        persistedId,
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
        dispatch(updateState({
            treeBranchId,
            branchId,
            id,
            title: value,
        }));

        // TODO: Check if this is necessary
        // if (persistedId !== id) {
        //     dispatch(updateState({ branchId, id: persistedId as UUID, title: value }));
        // }

        if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);

        if (!value || value === prevTitle) {
            dispatch(setActionInProgress(false));
            return;
        }

        saveNodeTimeout.current = setTimeout(async () => {
            if (persistedId) {
                const response = await dispatch(updateNodeTitle({
                    treeBranchId,
                    rootId,
                    id: persistedId,
                    branchId,
                    title: value,
                }));

                if (response.meta.requestStatus === 'rejected') {
                    const error: NodecosmosError = response.payload as NodecosmosError;
                    handleServerError(error);
                    console.error(error);

                    return;
                }
                dispatch(setActionInProgress(false));
            } else {
                const data = {
                    treeBranchId,
                    branchId,
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
    }, [treeBranchId, branchId, dispatch, handleServerError, id, order, parentId, persistedId, prevTitle, rootId]);

    //------------------------------------------------------------------------------------------------------------------
    const blurNode = useCallback(() => {
        dispatch(updateState({
            treeBranchId,
            branchId,
            id,
            isEditing: false,
        }));

        const shouldReplace = !!title; // if title is empty, we don't have to replace tmp node with persisted node
        setShouldReplaceTmpNode(shouldReplace);
    }, [treeBranchId, branchId, dispatch, id, title]);

    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (shouldReplaceTmpNode && isTemp && persistedId) {
            dispatch(replaceTmpWithPersisted({
                branchId,
                tmpId: id,
                persistedId,
            }));
        }
    }, [treeBranchId, branchId, dispatch, id, isTemp, persistedId, shouldReplaceTmpNode]);

    //------------------------------------------------------------------------------------------------------------------
    return {
        changeTitle,
        blurNode,
    };
}
