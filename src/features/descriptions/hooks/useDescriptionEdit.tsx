import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { selectDescription } from '../descriptions.selectors';
import { getDescriptionBase64, saveDescription } from '../descriptions.thunks';
import { HelpersFromExtensions } from '@remirror/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownExtension } from 'remirror/extensions';

const EMPTY_PARAGRAPH = '<p></p>';

export default function useDescriptionEdit() {
    const {
        rootId,
        branchId,
        objectNodeId,
        mainObjectId: objectId,
        objectType,
        loading,
        setLoading,
        unsetLoading,
    } = usePaneContext();
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleChangeTimeout = React.useRef<number| null>(null);
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const handleServerError = useHandleServerErrorAlert();
    const {
        html: currentHTML, markdown, base64,
    } = useSelector(selectDescription(branchId, objectId)) || {};

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();
            dispatch(getDescriptionBase64({
                nodeId: objectNodeId,
                branchId,
                objectId,
                objectType,
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

            if (handleChangeTimeout.current) {
                alert('Changes might not be saved.'
                    + ' Please wait for the changes to be saved before navigating away.');
                handleChangeTimeout.current = null;
            }
        };
    },
    [
        branchId,
        objectNodeId,
        objectId,
        objectType,
        fetched,
        loading,
        setLoading,
        unsetFetched,
        unsetLoading,
        setFetched,
        dispatch,
    ]);

    const handleChange = useCallback((
        helpers: HelpersFromExtensions<MarkdownExtension>,
        uint8ArrayState: Uint8Array | null,
    ) => {
        if (uint8ArrayState === null) {
            throw new Error('uint8ArrayState is null');
        }

        if (handleChangeTimeout.current) {
            clearTimeout(handleChangeTimeout.current);
            handleChangeTimeout.current = null;
        }

        handleChangeTimeout.current = setTimeout(async () => {
            handleChangeTimeout.current = null;

            const markdown = helpers.getMarkdown();
            const descriptionHtml = helpers.getHTML();
            const isEmptySame = !currentHTML && (!descriptionHtml || (descriptionHtml === EMPTY_PARAGRAPH));

            if (isEmptySame || (descriptionHtml === currentHTML)) {
                return;
            }

            console.log('Saving description', descriptionHtml);

            const response = await dispatch(saveDescription({
                branchId,
                objectId,
                rootId,
                nodeId: objectNodeId,
                objectType,
                html: descriptionHtml as string,
                markdown,
                base64: uint8ArrayToBase64(uint8ArrayState),
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);
            }
        }, 1000);
    }, [currentHTML, dispatch, branchId, objectId, rootId, objectNodeId, objectType, handleServerError]);

    return {
        objectId,
        objectNodeId,
        branchId,
        handleChange,
        markdown,
        base64,
    };
}
