import { setAlert } from '../../../../app/appSlice';
import { buildTmpNode, updateState } from '../../../nodes.actions';
import { selectSaveInProgress } from '../../../nodes.selectors';
import useAuthorizeNodeAction from '../useAuthorizeNodeAction';
import useNodeContext from '../useNodeContext';
import {
    useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeAdd() {
    const {
        id,
        branchId,
        isTmp,
        title,
    } = useNodeContext();
    const dispatch = useDispatch();
    const saveInProgress = useSelector(selectSaveInProgress);
    const [shouldAddNode, setShouldAddNode] = useState(false);
    const authorizeNodeAction = useAuthorizeNodeAction();

    const initTempChildNode = useCallback(() => {
        if (!authorizeNodeAction()) {
            return;
        }

        const tmpId = `tmp_${Date.now()}`;

        dispatch(setAlert({ isOpen: false }));
        dispatch(buildTmpNode({
            branchId,
            tmpId,
            id,
        }));
    }, [authorizeNodeAction, dispatch, branchId, id]);

    const addNode = useCallback(async () => {
        if (shouldAddNode) return;

        if (saveInProgress) {
            setShouldAddNode(true);
            dispatch(updateState({
                branchId,
                id,
                isCreationInProgress: true,
            }));

            const message = 'Too Fast! Please wait until current node is saved before creating new node.';
            console.warn(message);
        } else if (isTmp) {
            const message = title ? `Node "${title}" not initialized yet. Please wait...`
                : 'Current node not initialized yet. '
                + 'Please add title to current node in order to create child node.';

            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message,
            }));
        } else {
            initTempChildNode();
        }
    }, [shouldAddNode, saveInProgress, isTmp, dispatch, branchId, id, title, initTempChildNode]);

    useEffect(() => {
        if (shouldAddNode && !saveInProgress) {
            initTempChildNode();
            setShouldAddNode(false);
            dispatch(updateState({
                branchId,
                id,
                isCreationInProgress: false,
            }));
        }
    }, [dispatch, id, initTempChildNode, saveInProgress, shouldAddNode, branchId]);

    return addNode;
}
