import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { maybeSelectDescription } from '../descriptions.selectors';
import { getDescriptionBase64, saveDescription } from '../descriptions.thunks';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const EMPTY_PARAGRAPH = '<p></p>';

type HandleChangeById = Record<UUID, number>;

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
    const handleChangeTimeout = React.useRef<HandleChangeById| null>(null);
    const [fetched, setFetched, unsetFetched] = useBooleanStateValue();
    const handleServerError = useHandleServerErrorAlert();
    const description = useSelector(maybeSelectDescription(branchId, objectId));
    const currentHTML = useMemo(() => (
        (description && description.html) || null
    ), [description]);
    const markdown = useMemo(() => (
        (description && description.markdown) || null
    ), [description]);
    const base64 = useMemo(() => (
        (description && description.base64) || null
    ), [description]);

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading();
            dispatch(getDescriptionBase64({
                rootId,
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
        };
    },
    [
        rootId,
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
        html: string,
        markdown: string,
        uint8ArrayState: Uint8Array | null,
    ) => {
        if (uint8ArrayState === null) {
            throw new Error('uint8ArrayState is null');
        }

        if (handleChangeTimeout.current && handleChangeTimeout.current[objectId]) {
            clearTimeout(handleChangeTimeout.current[objectId]);
            delete handleChangeTimeout.current[objectId];
        }

        handleChangeTimeout.current ||= {};
        handleChangeTimeout.current[objectId] = setTimeout(async () => {
            handleChangeTimeout.current = null;

            const response = await dispatch(saveDescription({
                branchId,
                objectId,
                rootId,
                nodeId: objectNodeId,
                objectType,
                html,
                markdown,
                base64: uint8ArrayToBase64(uint8ArrayState),
            }));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);
            }
        }, 500);
    }, [objectId, dispatch, branchId, rootId, objectNodeId, objectType, handleServerError]);

    return useMemo(() => ({
        objectId,
        objectNodeId,
        branchId,
        handleChange,
        markdown,
        base64,
        currentHTML,
    }), [objectId, objectNodeId, branchId, handleChange, markdown, base64, currentHTML]);
}
