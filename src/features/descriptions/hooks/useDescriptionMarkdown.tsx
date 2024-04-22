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
    const {
        isBranch, currentOriginalBranchId, currentBranchId,
    } = useBranchParams();
    const {
        branchId,
        mainObjectId: objectId,
        objectType,
        loading,
        objectNodeId,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const branch = useSelector(selectBranch(currentBranchId));
    const { markdown } = useSelector(selectDescription(currentBranchId, objectId)) || {};
    const originalDescription = useSelector(selectDescription(currentOriginalBranchId, objectId));
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    let isDescriptionEdited;

    switch (objectType) {
    case ObjectType.Node:
        isDescriptionEdited = branch?.editedDescriptionNodes?.has(objectId);
        break;
    case ObjectType.Flow:
        isDescriptionEdited = branch?.editedDescriptionFlows?.has(objectId);
        break;
    case ObjectType.Io:
        isDescriptionEdited = branch?.editedDescriptionIos?.has(objectId);
        break;
    case ObjectType.FlowStep:
        isDescriptionEdited = branch?.editedDescriptionFlowSteps?.has(objectId);
        break;
    default:
        isDescriptionEdited = false;
    }

    const isMerged = branch?.status === BranchStatus.Merged;
    const mergedDescriptionChange = branch?.descriptionChangeByObject?.[objectId];

    const getBranchDescription = useCallback(() => {
        return dispatch(getDescription({
            nodeId: objectNodeId,
            branchId,
            objectId,
            objectType,
        }));
    }, [dispatch, objectNodeId, branchId, objectId, objectType]);

    const getOriginalDescriptionCb = useCallback(() => {
        return dispatch(getOriginalDescription({
            nodeId: objectNodeId,
            currentOriginalBranchId,
            currentBranchId,
            branchId,
            objectId,
        }));
    }, [branchId, currentOriginalBranchId, currentBranchId, dispatch, objectId, objectNodeId]);

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
        if (isBranch && !isMerged && isDescriptionEdited) {
            setLoading();
            return getBranchDescription().then(getOriginalDescriptionCb);
        } else if (!branchMarkdown && !fetched) {
            setLoading();
            return getBranchDescription();
        }

        return Promise.resolve();
    }, [
        isDescriptionEdited,
        branchMarkdown,
        getBranchDescription,
        getOriginalDescriptionCb,
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
