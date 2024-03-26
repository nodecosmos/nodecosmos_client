import { usePaneContext } from '../../../common/hooks/pane/usePaneContext';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { selectBranch } from '../../branch/branches.selectors';
import { BranchStatus } from '../../branch/branches.types';
import useBranchParams from '../../branch/hooks/useBranchParams';
import { selectDescription } from '../descriptions.selectors';
import { getDescription, getOriginalDescription } from '../descriptions.thunks';
import {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useDescriptionMarkdown() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch, currentRootNodeId } = useBranchParams();
    const {
        branchId,
        objectId,
        objectType,
        loading,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const branch = useSelector(selectBranch(branchId));
    const { markdown } = useSelector(selectDescription(branchId, objectId));
    const originalDescription = useSelector(selectDescription(currentRootNodeId, objectId));
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    let isDescriptionEdited;

    switch (objectType) {
    case ObjectType.Node:
        isDescriptionEdited = branch?.editedNodeDescriptions?.has(objectId);
        break;
    case ObjectType.Flow:
        isDescriptionEdited = branch?.editedFlowDescriptions?.has(objectId);
        break;
    case ObjectType.IO:
        isDescriptionEdited = branch?.editedIODescriptions?.has(objectId);
        break;
    default:
        isDescriptionEdited = false;
    }

    const isMerged = branch?.status === BranchStatus.Merged;
    const mergedDescriptionChange = branch?.descriptionChangeByObject?.[objectId];

    // fetch original and branch description base64
    const getBranchDescriptionBase64 = useCallback(() => {
        return dispatch(getDescription({
            branchId,
            objectId,
        }));
    }, [dispatch, branchId, objectId]);

    const getOriginalDescriptionBase64Cb = useCallback(() => {
        return dispatch(getOriginalDescription({
            currentRootNodeId,
            currentBranchId: branchId,
            objectId,
        }));
    }, [branchId, currentRootNodeId, dispatch, objectId]);

    const { originalMarkdown, branchMarkdown } = useMemo(() => {
        // if the branch is merged and the description has been changed,
        // show the state of the description at the time of the merge
        if (isMerged && mergedDescriptionChange) {
            return {
                originalMarkdown: mergedDescriptionChange.old,
                branchMarkdown: mergedDescriptionChange.new,
            };
        }
        return {
            originalMarkdown: originalDescription?.markdown,
            branchMarkdown: markdown,
        };
    }, [mergedDescriptionChange, markdown, isMerged, originalDescription?.markdown]);

    const loadMarkdown = useCallback(() => {
        if (isBranch && !isMerged && branch?.editedNodeDescriptions?.has(objectId)) {
            setLoading();
            return getBranchDescriptionBase64().then(getOriginalDescriptionBase64Cb);
        } else if (!branchMarkdown && !fetched) {
            setLoading();
            return getBranchDescriptionBase64();
        }

        return Promise.resolve();
    }, [
        branch?.editedNodeDescriptions,
        branchMarkdown,
        getBranchDescriptionBase64,
        getOriginalDescriptionBase64Cb,
        objectId,
        isBranch,
        isMerged,
        fetched,
        setLoading,
    ]);

    useEffect(() => {
        if (!fetched && !loading) {
            loadMarkdown().then(() => {
                setFetched();
                unsetLoading();
            });
        }

        return () => {
            if (!loading && fetched) {
                unsetFetched();
            }
        };
    }, [fetched, loadMarkdown, loading, setFetched, setLoading, unsetFetched, unsetLoading]);

    return {
        diffViewEnabled: isBranch && ((!isMerged && isDescriptionEdited) || (isMerged && !!mergedDescriptionChange)),
        loading,
        originalMarkdown,
        branchMarkdown,
    };
}
