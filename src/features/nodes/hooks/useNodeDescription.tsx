import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import extractTextFromHtml from '../../../utils/extractTextFromHtml';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import { selectNode, selectSelected } from '../nodes.selectors';
import { getDescriptionBase64, updateDescription } from '../nodes.thunks';
import { PKWithTreeBranch } from '../nodes.types';
import { HelpersFromExtensions } from '@remirror/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

interface UseNodeDescription {
    handleChange: (
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => void;
    loading: boolean;
    descriptionMarkdown: string | null;
    descriptionBase64: string | null;
}

export default function useNodeDescription(): UseNodeDescription {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        treeBranchId, branchId, id,
    } = useSelector(selectSelected) as PKWithTreeBranch;
    const { isTmp } = useSelector(selectNode(treeBranchId, id));
    const handleChangeTimeout = React.useRef<number| null>(null);
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    const {
        descriptionMarkdown,
        descriptionBase64,
    } = useSelector(selectNode(treeBranchId, id));

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();
            dispatch(getDescriptionBase64({
                treeBranchId,
                branchId,
                id,
            })).finally(() => {
                setFetched();
                setTimeout(unsetLoading, 250);
            });
        }

        return () => {
            if (!loading && fetched) {
                unsetFetched();
            }
        };
    }, [branchId, dispatch, fetched, id, loading, setFetched, setLoading, treeBranchId, unsetFetched, unsetLoading]);

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
        handleChange,
        loading,
        descriptionMarkdown,
        descriptionBase64,
    };
}
