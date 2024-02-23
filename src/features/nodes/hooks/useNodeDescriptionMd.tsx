import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectBranch } from '../../branch/branches.selectors';
import { BranchStatus } from '../../branch/branches.types';
import useBranchParams from '../../branch/hooks/useBranchParams';
import {
    selectNode, selectNodeAttribute, selectSelected,
} from '../nodes.selectors';
import { getDescriptionBase64, getOriginalDescriptionBase64 } from '../nodes.thunks';
import { PKWithTreeBranch } from '../nodes.types';
import {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseNodeDescriptionMd {
    showDiff: boolean;
    loading: boolean;
    originalDescriptionMarkdown: string | null;
    branchDescriptionMarkdown: string | null;
    descriptionBase64: string | null;
}

export default function useNodeDescriptionMd(): UseNodeDescriptionMd {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranch, mainBranchId } = useBranchParams();
    const {
        treeBranchId, branchId, id,
    } = useSelector(selectSelected) as PKWithTreeBranch;
    const branch = useSelector(selectBranch(treeBranchId));
    const { descriptionMarkdown, descriptionBase64 } = useSelector(selectNode(treeBranchId, id));
    const mainDescMarkdown = useSelector(selectNodeAttribute(mainBranchId, id, 'descriptionMarkdown'));
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const isMerged = branch?.status === BranchStatus.Merged;

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

    const unsetLoader = useCallback(() => {
        setTimeout(unsetLoading, 250);
    }, [unsetLoading]);

    const { originalDescriptionMarkdown, branchDescriptionMarkdown } = useMemo(() => {
        const mergedDescriptionChange = branch?.descriptionChangeByObject?.[id];

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
    }, [branch?.descriptionChangeByObject, descriptionMarkdown, id, isMerged, mainDescMarkdown]);

    const loadMarkdown = useCallback(() => {
        if (isBranch && !isMerged && branch?.editedNodeDescriptions?.has(id)) {
            return getBranchDescriptionBase64().then(getOriginalDescriptionBase64Cb);
        } else if (!branchDescriptionMarkdown) {
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
    ]);

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();

            loadMarkdown().then(() => {
                setFetched();
                unsetLoader();
            });
        }

        return () => {
            if (!loading && fetched) {
                unsetFetched();
            }
        };
    }, [fetched, loadMarkdown, loading, setFetched, setLoading, unsetFetched, unsetLoader]);

    return {
        showDiff: isBranch,
        loading,
        originalDescriptionMarkdown,
        branchDescriptionMarkdown,
        descriptionBase64,
    };
}
