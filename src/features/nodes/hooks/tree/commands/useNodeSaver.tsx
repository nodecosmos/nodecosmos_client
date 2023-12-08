import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import usePrevious from '../../../../../common/hooks/usePrevious';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosError } from '../../../../../types';
import {
    clearJustCreatedNode, setActionInProgress, updateState,
} from '../../../actions';
import { SAVE_NODE_TIMEOUT } from '../../../nodes.constants';
import { selectNodeAttribute } from '../../../nodes.selectors';
import { create, updateTitle } from '../../../nodes.thunks';
import { TreeType } from '../../../nodes.types';
import useTreeContext from '../../useTreeContext';
import useNodeContext from '../useNodeContext';
import {
    ChangeEvent, useCallback, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeSaver() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { type: treeType } = useTreeContext();
    const {
        isJustCreated,
        treeBranchId,
        branchId,
        id,
        parentId,
        rootId,
        title,
        persistedId,
    } = useNodeContext();

    const order = useSelector(selectNodeAttribute(treeBranchId, id, 'order'));
    const prevTitle = usePrevious(title);
    const handleServerError = useHandleServerErrorAlert();

    //------------------------------------------------------------------------------------------------------------------
    // debounce save node
    const saveNodeTimeout = useRef<number | null>(null);

    const saveNode = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        dispatch(setActionInProgress(true));
        dispatch(updateState({
            treeBranchId,
            id,
            title: value,
        }));

        // Change title of persisted node if tmp node is not replaced yet
        if (persistedId !== id) {
            dispatch(updateState({
                treeBranchId,
                id: persistedId as string,
                title: value,
            }));
        }

        if (!value || value === prevTitle) {
            dispatch(setActionInProgress(false));
            return;
        }

        if (saveNodeTimeout.current) clearTimeout(saveNodeTimeout.current);
        saveNodeTimeout.current = setTimeout(async () => {
            if (persistedId) {
                // Update persisted node
                const response = await dispatch(updateTitle({
                    treeBranchId,
                    branchId,
                    id: persistedId,
                    title: value,
                }));

                if (response.meta.requestStatus === 'rejected') {
                    const error: NodecosmosError = response.payload as NodecosmosError;
                    handleServerError(error);
                    console.error(error);
                }
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
                    title: value,
                    order: order as number,
                    tmpNodeId: id,
                };

                const response = await dispatch(create(data));
                if (response.meta.requestStatus === 'rejected') {
                    const error: NodecosmosError = response.payload as NodecosmosError;
                    handleServerError(error);
                    console.error(error);
                }
            }

            dispatch(setActionInProgress(false));
        }, SAVE_NODE_TIMEOUT);
    },
    [
        treeBranchId, branchId, dispatch, handleServerError, id,
        order, parentId, persistedId, prevTitle, rootId, treeType,
    ]);

    //------------------------------------------------------------------------------------------------------------------
    const blurNode = useCallback(() => {
        dispatch(updateState({
            treeBranchId,
            id,
            isEditing: false,
            isJustCreated: false,
        }));

        dispatch(clearJustCreatedNode());
    }, [dispatch, treeBranchId, id]);

    useEffect(() => {
        return () => {
            if (isJustCreated) {
                dispatch(updateState({
                    treeBranchId,
                    id,
                    isEditing: false,
                    isJustCreated: false,
                }));

                dispatch(clearJustCreatedNode());
            }
        };
    }, [dispatch, id, isJustCreated, treeBranchId]);

    //------------------------------------------------------------------------------------------------------------------
    return {
        saveNode,
        blurNode,
    };
}
