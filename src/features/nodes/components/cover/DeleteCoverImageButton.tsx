import useHandleServerErrorAlert from '../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../store';
import { NodecosmosError } from '../../../../types';
import { usePaneContext } from '../../../app/hooks/pane/usePaneContext';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { updateState } from '../../nodes.actions';
import { deleteNodeImage } from '../../nodes.thunks';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

interface DeleteCoverImageButtonProps {
    show: boolean;
}

export default function DeleteCoverImageButton({ show }: DeleteCoverImageButtonProps) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { rootId, objectId } = usePaneContext();
    const { branchId } = useBranchContext();

    if (!branchId) {
        throw new Error('`branchId` is required in `metadata`');
    }

    const handleServerError = useHandleServerErrorAlert();

    const handleDeleteCoverImage = useCallback(() => {
        dispatch(deleteNodeImage({
            branchId,
            id: objectId,
            rootId,
        })).then((response) => {
            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);

                return;
            }
            dispatch(updateState({
                branchId,
                id: objectId,
                coverImageUrl: null,
            }));
        });
    }, [rootId, branchId, dispatch, handleServerError, objectId]);

    const style = useMemo(() => ({ opacity: show ? 0.8 : 0 }), [show]);

    return (
        <Tooltip title="Delete Cover Image">
            <IconButton
                color="button"
                className="DeleteCoverImageButton"
                onClick={handleDeleteCoverImage}
                style={style}
            >
                <FontAwesomeIcon icon={faClose} />
            </IconButton>
        </Tooltip>
    );
}
