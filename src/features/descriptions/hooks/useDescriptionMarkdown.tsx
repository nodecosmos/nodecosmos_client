import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { ObjectType } from '../../../types';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { selectBranch } from '../../branch/branches.selectors';
import { BranchStatus } from '../../branch/branches.types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectDescription } from '../descriptions.selectors';
import { getDescription, getOriginalDescription } from '../descriptions.thunks';
import {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useDescriptionMarkdown() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        isBranch, originalId, branchId,
    } = useBranchContext();
    const {
        rootId,
        mainObjectId: objectId,
        objectType,
        loading,
        objectNodeId,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const branch = useSelector(selectBranch(branchId));
    const { markdown } = useSelector(selectDescription(branchId, objectId)) || {};
    const originalDescription = useSelector(selectDescription(originalId, objectId));
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    const isMerged = branch?.status === BranchStatus.Merged;

    const isDescriptionEdited = useMemo(() => {
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

        return isDescriptionEdited;
    }, [branch, objectId, objectType]);

    const mergedDescriptionChange = useMemo(() => branch?.descriptionChangeByObject?.[objectId], [branch, objectId]);

    const getBranchDescription = useCallback(() => {
        return dispatch(getDescription({
            rootId,
            nodeId: objectNodeId,
            branchId,
            objectId,
            objectType,
        }));
    }, [dispatch, rootId, objectNodeId, branchId, objectId, objectType]);

    const getOriginalDescriptionCb = useCallback(() => {
        return dispatch(getOriginalDescription({
            rootId,
            nodeId: objectNodeId,
            originalId,
            branchId,
            objectId,
            objectType,
        }));
    }, [dispatch, rootId, objectNodeId, originalId, branchId, objectId, objectType]);

    const [originalMarkdown, branchMarkdown] = useMemo(() => {
        // if the branch is merged and the description has been changed,
        // show the state of the description at the time of the merge
        if (isMerged && mergedDescriptionChange) {
            return [
                mergedDescriptionChange.old,
                mergedDescriptionChange.new,
            ];
        }
        return [originalDescription?.markdown, markdown];
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

    return useMemo(() => ({
        diffViewEnabled: isBranch && ((!isMerged && isDescriptionEdited) || (isMerged && !!mergedDescriptionChange)),
        loading,
        originalMarkdown,
        branchMarkdown,
        fetched,
    }),
    [
        isBranch, isMerged, isDescriptionEdited, mergedDescriptionChange,
        loading, originalMarkdown, branchMarkdown, fetched,
    ]);
}
