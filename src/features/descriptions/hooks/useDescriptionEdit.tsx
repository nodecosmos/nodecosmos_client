import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import { uint8ArrayToBase64 } from '../../../utils/serializer';
import { usePaneContext } from '../../app/hooks/pane/usePaneContext';
import { selectDescription } from '../descriptions.selectors';
import { getDescriptionBase64, saveDescription } from '../descriptions.thunks';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const EMPTY_PARAGRAPH = '<p></p>';

type HandleChangeById = Record<UUID, number>;

export default function useDe1scriptionEdit() {
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
    const {
        html: currentHTML, markdown, base64,
    } = useSelector(selectDescription(branchId, objectId)) || {};
    // using initial values so we send the base64 only on initial editor load
    const [initialBase64, setInitialBase64] = React.useState(base64 ?? '');
    const [initialHTML, setInitialHTML] = React.useState(currentHTML ?? '');

    useEffect(() => {
        if (fetched && !loading) {
            setInitialBase64(base64 ?? '');
            setInitialHTML(currentHTML ?? '');
        }
    }, [base64, currentHTML, fetched, initialBase64, loading]);

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
            const isEmptySame = !currentHTML && (!html || (html === EMPTY_PARAGRAPH));

            if (isEmptySame || (html === currentHTML)) {
                return;
            }

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
    }, [currentHTML, dispatch, branchId, objectId, rootId, objectNodeId, objectType, handleServerError]);

    return useMemo(() => ({
        objectId,
        objectNodeId,
        branchId,
        handleChange,
        markdown,
        base64: initialBase64,
        currentHTML: initialHTML,
    }), [objectId, objectNodeId, branchId, handleChange, markdown, initialBase64, initialHTML]);
}
