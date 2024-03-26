import { usePaneContext } from '../../../common/hooks/pane/usePaneContext';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import { selectDescription } from '../descriptions.selectors';
import { getDescriptionBase64, saveDescription } from '../descriptions.thunks';
import { HelpersFromExtensions } from '@remirror/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const EMPTY_PARAGRAPH = '<p></p>';

export default function useDescriptionEdit() {
    const {
        branchId,
        objectNodeId,
        objectId,
        objectType,
        loading,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleChangeTimeout = React.useRef<number| null>(null);
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();

    const {
        html: currentHTML, markdown, base64,
    } = useSelector(selectDescription(branchId, objectId));

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();
            dispatch(getDescriptionBase64({
                branchId,
                objectId,
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
    }, [dispatch, fetched, loading, branchId, objectId, setFetched, setLoading, unsetFetched, unsetLoading]);

    const handleChange = useCallback((
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => {
        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
        }

        handleChangeTimeout.current = setTimeout(() => {
            const descriptionHtml = helpers.getHTML();
            const isEmptySame = !currentHTML && (!descriptionHtml || (descriptionHtml === EMPTY_PARAGRAPH));

            if (isEmptySame || (descriptionHtml === currentHTML)) {
                return;
            }

            const markdown = helpers.getMarkdown();

            dispatch(saveDescription({
                branchId,
                objectId,
                nodeId: objectNodeId,
                objectType,
                html: descriptionHtml as string,
                markdown,
                base64: uint8ArrayState ? uint8ArrayToBase64(uint8ArrayState) : null,
            }));
        }, 500);
    }, [currentHTML, dispatch, branchId, objectId, objectNodeId, objectType]);

    return {
        objectId,
        objectNodeId,
        branchId,
        handleChange,
        markdown,
        base64,
    };
}
