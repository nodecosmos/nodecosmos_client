import ConfirmationModal, { ConfirmType } from '../../../../common/components/ConfirmationModal';
import useModalOpen from '../../../../common/hooks/useModalOpen';
import { NodecosmosDispatch } from '../../../../store';
import { isEmail } from '../../../../utils/validation';
import { deleteInvitation } from '../../../invitations/invitations.thunks';
import { Invitation } from '../../../invitations/invitations.types';
import { faClose } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Link, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

function InvitationItem({ invitation }: { invitation: Invitation }) {
    const [delModOpen, openDelMod, closeDelMod] = useModalOpen();
    const { usernameOrEmail } = invitation;
    const dispatch: NodecosmosDispatch = useDispatch();
    const deleteInvitationCb = useCallback(async () => {
        const {
            branchId, nodeId, usernameOrEmail,
        } = invitation;

        await dispatch(deleteInvitation({
            branchId,
            nodeId,
            usernameOrEmail,
        }));
    }, [dispatch, invitation]);

    return (
        <Box key={usernameOrEmail} display="flex" alignItems="center" mt={2}>
            {
                isEmail(usernameOrEmail) ? (
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="texts.link">
                        {usernameOrEmail}
                    </Typography>
                ) : (
                    <Link
                        component={RouterLink}
                        to={`/${usernameOrEmail}`}>
                        <Typography variant="body2" color="texts.link" fontWeight="bold">
                            {usernameOrEmail}
                        </Typography>
                    </Link>
                )
            }

            <IconButton
                size="small"
                color="secondary"
                onClick={openDelMod}
                sx={{
                    color: 'error.main',
                    cursor: 'pointer',
                    ml: 1,
                }}
            >
                <FontAwesomeIcon size="sm" icon={faClose} />
            </IconButton>

            <ConfirmationModal
                text={`Are you sure you want to delete the invitation for ${usernameOrEmail}?`}
                confirmText="Delete"
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onClose={closeDelMod}
                onConfirm={deleteInvitationCb}
            />
        </Box>
    );
}

export default React.memo(InvitationItem);
