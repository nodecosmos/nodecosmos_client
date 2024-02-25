import { useNodePaneContext } from './pane/useNodePaneContext';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectBranch } from '../../branch/branches.selectors';
import { BranchStatus } from '../../branch/branches.types';
import useBranchParams from '../../branch/hooks/useBranchParams';
import { selectNode, selectNodeAttribute } from '../nodes.selectors';
import { getDescriptionBase64, getOriginalDescriptionBase64 } from '../nodes.thunks';
import {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseNodeDescriptionMd {
    diffViewEnabled: boolean;
    loading: boolean;
    originalDescriptionMarkdown: string | null;
    branchDescriptionMarkdown: string | null;
    descriptionBase64: string | null;
}

export default function useNodeDescriptionMd(): UseNodeDescriptionMd {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch, mainBranchId } = useBranchParams();
    const {
        treeBranchId, // branchId of the current tree
        id,
        branchId, // branchId of the selected node
        loading,
        setLoading,
        unsetLoading,
    } = useNodePaneContext();
    const branch = useSelector(selectBranch(treeBranchId));
    const { descriptionMarkdown, descriptionBase64 } = useSelector(selectNode(treeBranchId, id));
    const mainDescMarkdown = useSelector(selectNodeAttribute(mainBranchId, id, 'descriptionMarkdown'));
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const isDescriptionEdited = branch?.editedNodeDescriptions?.has(id);
    const isMerged = branch?.status === BranchStatus.Merged;
    const mergedDescriptionChange = branch?.descriptionChangeByObject?.[id];

    // fetch original and branch description base64
    const getBranchDescriptionBase64 = useCallback(() => {
        return dispatch(getDescriptionBase64({
            treeBranchId,
            branchId,
            id,
        }));
    }, [dispatch, treeBranchId, branchId, id]);

    const getOriginalDescriptionBase64Cb = useCallback(() => {
        return dispatch(getOriginalDescriptionBase64({
            mainBranchId,
            currentBranchId: branchId,
            id,
        }));
    }, [dispatch, mainBranchId, branchId, id]);

    const { originalDescriptionMarkdown, branchDescriptionMarkdown } = useMemo(() => {
        // if the branch is merged and the description has been changed,
        // show the state of the description at the time of the merge
        if (isMerged && mergedDescriptionChange) {
            return {
                originalDescriptionMarkdown: mergedDescriptionChange.old,
                branchDescriptionMarkdown: mergedDescriptionChange.new,
            };
        }
        return {
            originalDescriptionMarkdown: mainDescMarkdown,
            branchDescriptionMarkdown: descriptionMarkdown,
        };
    }, [mergedDescriptionChange, descriptionMarkdown, isMerged, mainDescMarkdown]);

    const loadMarkdown = useCallback(() => {
        if (isBranch && !isMerged && branch?.editedNodeDescriptions?.has(id)) {
            setLoading();
            return getBranchDescriptionBase64().then(getOriginalDescriptionBase64Cb);
        } else if (!branchDescriptionMarkdown && !fetched) {
            setLoading();
            return getBranchDescriptionBase64();
        }

        return Promise.resolve();
    }, [
        branch?.editedNodeDescriptions,
        branchDescriptionMarkdown,
        getBranchDescriptionBase64,
        getOriginalDescriptionBase64Cb,
        id,
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
        originalDescriptionMarkdown,
        branchDescriptionMarkdown,
        descriptionBase64,
    };
}
