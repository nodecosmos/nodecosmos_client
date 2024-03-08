import { useNodePaneContext } from './pane/useNodePaneContext';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import extractTextFromHtml from '../../../utils/extractTextFromHtml';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import { selectNode } from '../nodes.selectors';
import { getDescriptionBase64, updateDescription } from '../nodes.thunks';
import { HelpersFromExtensions } from '@remirror/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

interface UseNodeDescriptionEdit {
    handleChange: (
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => void;
    descriptionMarkdown: string | null;
    descriptionBase64: string | null;
}

const EMPTY_PARAGRAPH = '<p></p>';

export default function useNodeDescription(): UseNodeDescriptionEdit {
    const {
        treeBranchId, // branchId of the current tree
        isTmp,
        id,
        branchId, // branchId of the selected node
        loading,
        setLoading,
        unsetLoading,
    } = useNodePaneContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleChangeTimeout = React.useRef<number| null>(null);
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    const {
        descriptionMarkdown,
        descriptionBase64,
        description: currentDescription,
    } = useSelector(selectNode(treeBranchId, id));

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();
            dispatch(getDescriptionBase64({
                treeBranchId,
                branchId,
                id,
            })).then(() => {
                setFetched();
                unsetLoading();
            }).catch((e) => {
                console.error(e);
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
            const isEmptySame = !currentDescription && (!descriptionHtml || (descriptionHtml === EMPTY_PARAGRAPH));

            if (isEmptySame || (descriptionHtml === currentDescription)) {
                return;
            }

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
    }, [isTmp, currentDescription, dispatch, treeBranchId, branchId, id]);

    return {
        handleChange,
        descriptionMarkdown,
        descriptionBase64,
    };
}
