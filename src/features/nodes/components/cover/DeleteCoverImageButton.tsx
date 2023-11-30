import useHandleServerErrorAlert from '../../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../../store';
import { NodecosmosError } from '../../../../types';
import { updateState } from '../../actions';
import { selectSelected } from '../../nodes.selectors';
import { deleteNodeImage } from '../../nodes.thunks';
import { PKWithTreeBranch } from '../../nodes.types';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface DeleteCoverImageButtonProps {
    show: boolean;
}

export default function DeleteCoverImageButton({ show }: DeleteCoverImageButtonProps) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        treeBranchId, branchId, id,
    } = useSelector(selectSelected) as PKWithTreeBranch;
    const handleServerError = useHandleServerErrorAlert();

    const handleDeleteCoverImage = useCallback(() => {
        dispatch(deleteNodeImage({
            branchId,
            id,
        })).then((response) => {
            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);

                return;
            }
            dispatch(updateState({
                treeBranchId,
                id,
                coverImageURL: null,
            }));
        });
    }, [branchId, dispatch, handleServerError, id, treeBranchId]);

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
                    top: 16,
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
