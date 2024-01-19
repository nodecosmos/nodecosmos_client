import { setAlert } from '../../../../app/appSlice';
import { buildTmpNode, updateState } from '../../../actions';
import { selectSaveInProgress } from '../../../nodes.selectors';
import useNodeContext from '../node/useNodeContext';
import {
    useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useNodeAdd() {
    const {
        id,
        treeBranchId,
        branchId,
        isTmp,
        title,
    } = useNodeContext();
    const dispatch = useDispatch();
    const saveInProgress = useSelector(selectSaveInProgress);
    const [loading, setLoading] = useState(false);

    const initTempChildNode = useCallback(() => {
        const tmpId = `tmp_${Date.now()}`;

        dispatch(setAlert({ isOpen: false }));
        dispatch(buildTmpNode({
            treeBranchId,
            tmpId,
            id,
        }));
    }, [dispatch, id, treeBranchId]);

    //------------------------------------------------------------------------------------------------------------------
    const addNode = useCallback(async () => {
        if (saveInProgress) {
            setLoading(true);
            dispatch(updateState({
                treeBranchId,
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
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
            }));
        } else {
            initTempChildNode();
        }
    }, [saveInProgress, dispatch, id, initTempChildNode, isTmp, title, treeBranchId]);

    useEffect(() => {
        if (loading && !saveInProgress) {
            setLoading(false);
            dispatch(updateState({
                treeBranchId,
                id,
                isCreationInProgress: false,
            }));

            initTempChildNode();
        }
    }, [saveInProgress, branchId, dispatch, id, initTempChildNode, loading, treeBranchId]);

    return addNode;
}
