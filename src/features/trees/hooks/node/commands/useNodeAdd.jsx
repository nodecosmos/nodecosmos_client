import {
    useCallback, useEffect, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../../../app/appSlice';
import { buildTmpTreeNode, updateTreeNode } from '../../../treeActions';
import { selectIsNodeActionInProgress } from '../../../../nodes/nodes.selectors';
import { buildTmpNode } from '../../../../nodes/nodeActions';
import useNodeContext from '../useNodeContext';

export default function useNodeAdd() {
    const {
        isTemp,
        nodeId,
        title,
        treeNodeId,
        treeRootNodeId,
    } = useNodeContext();
    const dispatch = useDispatch();
    const isNodeActionInProgress = useSelector(selectIsNodeActionInProgress);
    const [loading, setLoading] = useState(false);

    const initTempChildNode = useCallback(() => {
        const tmpNodeId = `tmp_${Date.now()}`;

        dispatch(setAlert({
            isOpen: false,
        }));
        dispatch(buildTmpNode({ tmpNodeId, nodeId }));
        dispatch(buildTmpTreeNode({
            tmpNodeId, nodeId, treeNodeId, treeRootNodeId,
        }));
    }, [dispatch, nodeId, treeRootNodeId, treeNodeId]);

    //------------------------------------------------------------------------------------------------------------------
    const addNode = useCallback(async () => {
        if (isNodeActionInProgress) {
            setLoading(true);
            dispatch(updateTreeNode({
                treeNodeId, isCreationInProgress: true,
            }));

            const message = 'Too Fast! Please wait until current node is saved before creating new node.';
            console.warn(message);
        } else if (isTemp) {
            const message = title ? `Node "${title}" not initialized yet. Please wait...`
                : 'Current node not initialized yet. '
        + 'Please add title to current node in order to create child node.';

            dispatch(setAlert({
                isOpen: true, severity: 'error', message, anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            }));
        } else {
            initTempChildNode();
        }
    }, [dispatch, initTempChildNode, isNodeActionInProgress, isTemp, title, treeNodeId]);

    useEffect(() => {
        if (loading && !isNodeActionInProgress) {
            setLoading(false);
            dispatch(updateTreeNode({
                treeNodeId, isCreationInProgress: false,
            }));
            initTempChildNode();
        }
    }, [dispatch, initTempChildNode, loading, isNodeActionInProgress, treeNodeId]);

    return addNode;
}
