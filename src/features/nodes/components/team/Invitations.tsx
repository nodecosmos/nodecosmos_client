import InvitationItem from './InvitationItem';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../store';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import InviteUserModal from '../../../invitations/components/InviteUserModal';
import { selectPendingInvitations } from '../../../invitations/invitations.selectors';
import { IndexInvitations } from '../../../invitations/invitations.thunks';
import { selectCurrentUser } from '../../../users/users.selectors';
import { maybeSelectNode } from '../../nodes.selectors';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Chip, Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Invitations() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, nodeId } = useBranchContext();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const currentUser = useSelector(selectCurrentUser);
    const [inviteModalOpen, openInviteModal, closeInviteModal] = useBooleanStateValue(false);
    const [fetched, setFetched] = React.useState(false);
    const canEditNode = useMemo(() => {
        if (!currentUser || !node) {
            return false;
        }

        return node.ownerId === currentUser.id || node.editorIds?.has(currentUser.id);
    }, [currentUser, node]);
    const pendingInvitations = useSelector(selectPendingInvitations(branchId, nodeId));

    useEffect(() => {
        if (!fetched && canEditNode) {
            dispatch(IndexInvitations({
                branchId,
                nodeId,
            })).then(() => {
                setFetched(true);
            });
        } else {
            setFetched(true);
        }
    }, [branchId, canEditNode, dispatch, fetched, node, nodeId]);

    if (!canEditNode) {
        return null;
    }

    return (
        <Box p={4} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary">
                Pending Invitations
                <Chip
                    component="span"
                    color="button"
                    label={pendingInvitations.length || '0'}
                    size="small"
                    sx={{ ml: 1 }} />
            </Typography>
            {pendingInvitations.map((invitation) => (
                <InvitationItem key={invitation.usernameOrEmail} invitation={invitation} />
            ))}

            <Button
                color="warning"
                sx={{ mt: 2 }}
                variant="outlined"
                type="button"
                onClick={openInviteModal}
                startIcon={<FontAwesomeIcon icon={faUserPlus} size="2xs" />}
            >
                <span className="Text">
                            Invite User
                </span>
            </Button>
            <InviteUserModal open={inviteModalOpen} onClose={closeInviteModal} />
        </Box>
    );
}
