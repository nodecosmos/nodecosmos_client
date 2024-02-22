import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import extractTextFromHtml from '../../../utils/extractTextFromHtml';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import useBranchParams from '../../branch/hooks/useBranchParams';
import {
    selectNode, selectNodeAttribute, selectSelected,
} from '../nodes.selectors';
import {
    getDescriptionBase64, getOriginalDescriptionBase64, updateDescription,
} from '../nodes.thunks';
import { PKWithTreeBranch } from '../nodes.types';
import { HelpersFromExtensions } from '@remirror/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

interface UseNodeDescription {
    showDiff: boolean;
    handleChange: (
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => void;
    loading: boolean;
    currentDescriptionMarkdown: string | null;
    descriptionMarkdown: string | null;
    descriptionBase64: string | null;
}

export default function useNodeDescription(): UseNodeDescription {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { isBranched, mainBranchId } = useBranchParams();
    const {
        treeBranchId, branchId, id,
    } = useSelector(selectSelected) as PKWithTreeBranch;
    const { isTmp } = useSelector(selectNode(treeBranchId, id));
    const handleChangeTimeout = React.useRef<number| null>(null);
    const {
        descriptionMarkdown,
        descriptionBase64,
    } = useSelector(selectNode(treeBranchId, id));
    const currentDescriptionMarkdown = useSelector(selectNodeAttribute(mainBranchId, id, 'descriptionMarkdown'));

    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

    useEffect(() => {
        if (isBranched) {
            setLoading();

            dispatch(getDescriptionBase64({
                treeBranchId,
                branchId,
                id,
            })).then(() => dispatch(getOriginalDescriptionBase64({
                mainBranchId,
                currentBranchId: branchId,
                id,
            }))).finally(unsetLoading);
        } else if (!currentDescriptionMarkdown) {
            dispatch(getDescriptionBase64({
                treeBranchId,
                branchId,
                id,
            })).finally(unsetLoading);
        }
    }, [
        dispatch, treeBranchId, branchId, id, isBranched,
        mainBranchId, currentDescriptionMarkdown, setLoading, unsetLoading,
    ]);

    const handleChange = useCallback((
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => {
        if (isTmp) return;

        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = helpers.getHTML();
            const shortDescription = extractTextFromHtml(descriptionHtml);
            const markdown = helpers.getMarkdown();

            dispatch(updateDescription({
                treeBranchId,
                branchId,
                id,
                description: descriptionHtml,
                shortDescription,
                descriptionMarkdown: markdown,
                descriptionBase64: uint8ArrayState ? uint8ArrayToBase64(uint8ArrayState) : null,
            }));
        }, 500);
    }, [dispatch, treeBranchId, branchId, id, isTmp]);

    return {
        showDiff: isBranched,
        handleChange,
        loading,
        currentDescriptionMarkdown,
        descriptionMarkdown,
        descriptionBase64,
    };
}
