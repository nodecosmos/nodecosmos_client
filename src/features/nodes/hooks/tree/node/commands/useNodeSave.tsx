import useHandleServerErrorAlert from '../../../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../../../store';
import { NodecosmosError } from '../../../../../../types';
import {
    clearJustCreatedNode,
    replaceTmpNodeWithPersisted, setSaveInProgress, updateState,
} from '../../../../actions';
import { SAVE_NODE_TIMEOUT } from '../../../../nodes.constants';
import { selectNodeAttribute, selectSaveInProgress } from '../../../../nodes.selectors';
import { create, updateTitle } from '../../../../nodes.thunks';
import { TreeType } from '../../../../nodes.types';
import useTreeContext from '../../useTreeContext';
import useNodeContext from '../useNodeContext';
import {
    ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeSave() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { type: treeType } = useTreeContext();
    const {
        isTmp,
        treeBranchId,
        branchId,
        id,
        parentId,
        rootId,
        persistedId,
    } = useNodeContext();
    const order = useSelector(selectNodeAttribute(treeBranchId, id, 'order'));
    const handleServerError = useHandleServerErrorAlert();
    const saveInProgress = useSelector(selectSaveInProgress);
    const [shouldReplaceTmpNode, setShouldReplaceTmpNode] = useState(false);

    //------------------------------------------------------------------------------------------------------------------
    // debounce save node
    const saveNodeTimeout = useRef<number | null>(null);
    const saveQueue = useRef<ChangeEvent<HTMLInputElement>[]>([]);
    const saveNode = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;

        // Update title of tmp node within redux store
        dispatch(updateState({
            treeBranchId,
            id,
            title,
            isCreationInProgress: isTmp,
        }));

        // Change title of persisted node if tmp node is not replaced yet
        if (isTmp && persistedId) {
            dispatch(updateState({
                treeBranchId,
                id: persistedId,
                title,
            }));
        }

        if (saveNodeTimeout.current) {
            clearTimeout(saveNodeTimeout.current);
        }
        saveNodeTimeout.current = setTimeout(async () => {
            if (saveInProgress) {
                saveQueue.current.push(event);
                return;
            }
            dispatch(setSaveInProgress(true));

            let response;
            if (persistedId) {
                // Update persisted node
                response = await dispatch(updateTitle({
                    treeBranchId,
                    branchId,
                    id: persistedId,
                    title,
                }));
            } else {
                // Create new node
                let creationBranchId;
                if (treeType === TreeType.ContributionRequest) {
                    creationBranchId = treeBranchId;
                }

                const data = {
                    treeBranchId,
                    branchId: creationBranchId,
                    rootId,
                    parentId,
                    isRoot: false,
                    isPublic: true,
                    title,
                    order: order as number,
                    tmpId: id,
                };

                response = await dispatch(create(data));
            }

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);
            }

            dispatch(setSaveInProgress(false));
        }, SAVE_NODE_TIMEOUT);
    },
    [
        treeBranchId, branchId, dispatch, handleServerError, id, saveInProgress,
        order, parentId, persistedId, rootId, treeType, isTmp,
    ]);

    const processQueue = useCallback(async () => {
        if ((saveQueue.current.length > 0)) {
            const nextItem = saveQueue.current.shift();

            if (nextItem) {
                await saveNode(nextItem);
                await processQueue();
            }
        }
    }, [saveNode]);

    useEffect(() => {
        processQueue().catch((error) => {
            console.error(error);
        });
    }, [processQueue]);

    //------------------------------------------------------------------------------------------------------------------
    const blurNode = useCallback(() => {
        dispatch(updateState({
            treeBranchId,
            id,
            isEditing: false,
        }));
        setShouldReplaceTmpNode(true);
    }, [dispatch, id, treeBranchId]);

    useEffect(() => {
        if (shouldReplaceTmpNode && isTmp && persistedId) {
            // Replace tmp node with persisted node within redux store
            dispatch(replaceTmpNodeWithPersisted({
                treeBranchId,
                tmpId: id,
            }));
        }
    }, [dispatch, id, isTmp, persistedId, shouldReplaceTmpNode, treeBranchId]);

    useEffect(() => {
        return () => {
            if (persistedId) {
                dispatch(clearJustCreatedNode());
            }
        };
    }, [dispatch, persistedId]);

    //------------------------------------------------------------------------------------------------------------------
    return {
        saveNode,
        blurNode,
    };
}
