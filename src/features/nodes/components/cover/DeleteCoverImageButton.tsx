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
import React, { useCallback } from 'react';
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

    return (
        <Tooltip title="Delete Cover Image">
            <IconButton
                color="button"
                onClick={handleDeleteCoverImage}
                sx={{
                    zIndex: 1,
                    backgroundColor: 'background.1',
                    opacity: show ? 0.8 : 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    borderRadius: '50%',
                    top: 8,
                    right: 24,
                    width: 30,
                    height: 30,
                    p: 0,
                    svg: {
                        color: 'button.contrastText',
                        fontSize: 18,
                    },
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                }}
            >
                <FontAwesomeIcon icon={faClose} />
            </IconButton>
        </Tooltip>
    );
}
