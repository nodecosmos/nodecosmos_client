import Alert from '../../common/components/Alert';
import Loader from '../../common/components/Loader';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import InviteUserModal from '../../features/invitations/components/InviteUserModal';
import { selectPendingInvitations } from '../../features/invitations/invitations.selectors';
import { IndexInvitations } from '../../features/invitations/invitations.thunks';
import { maybeSelectNode } from '../../features/nodes/nodes.selectors';
import { getEditors } from '../../features/nodes/nodes.thunks';
import UserProfileLink from '../../features/users/components/UserProfileLink';
import { selectCurrentUser } from '../../features/users/users.selectors';
import { NodecosmosDispatch } from '../../store';
import { isEmail } from '../../utils/validation';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Chip, Container, Link, Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

export default function TeamShow() {
    const { branchId, nodeId } = useBranchContext();
    const node = useSelector(maybeSelectNode(branchId, nodeId));
    const editorIds = node?.editorIds;
    const [fetched, setFetched] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [inviteModalOpen, openInviteModal, closeInviteModal] = useBooleanStateValue(false);
    const canEditNode = useMemo(() => {
        if (!currentUser || !node) {
            return false;
        }

        return node.ownerId === currentUser.id || node.editorIds?.has(currentUser.id);
    }, [currentUser, node]);
    const pendingInvitations = useSelector(selectPendingInvitations(branchId, nodeId));

    useEffect(() => {
        if (!fetched && node) {
            dispatch(getEditors({
                branchId,
                id: nodeId,
            })).then(() => {
                if (canEditNode) {
                    dispatch(IndexInvitations({
                        branchId,
                        nodeId,
                    })).then(() => {
                        setFetched(true);
                    });
                } else {
                    setFetched(true);
                }
            });
        }
    }, [branchId, canEditNode, dispatch, fetched, node, nodeId]);

    if (!fetched) {
        return <Loader />;
    }

    if (!node || !node.owner) {
        return null;
    }

    return (
        <Box height={1} overflow="auto" width={1}>
            <Container
                maxWidth="lg"
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                <Alert position="relative" mb={2} />
                <Box mt={4} borderBottom={1} pb={4} borderColor="borders.3">
                    <Typography fontWeight="bold" color="text.secondary">
                        Author
                    </Typography>
                    <UserProfileLink id={node.owner.id} mt={2} />
                </Box>
                <Box mt={4} borderBottom={1} pb={4} borderColor="borders.3">
                    <Typography fontWeight="bold" color="text.secondary">
                        Editors
                        <Chip color="button" label={node.editorIds?.size || '0'} size="small" sx={{ ml: 1 }} />
                    </Typography>
                    {editorIds && Array.from(editorIds).map((id) => (
                        <UserProfileLink key={id} id={id} mt={4} />
                    ))}
                </Box>

                <Typography fontWeight="bold" color="text.secondary" mt={4}>
                    Pending Invitations
                    <Chip color="button" label={pendingInvitations.length || '0'} size="small" sx={{ ml: 1 }} />
                </Typography>
                {pendingInvitations.map((invitation) => (
                    isEmail(invitation.usernameOrEmail) ? (
                        <Typography fontWeight="bold" color="text.link" mt={2} key={invitation.usernameOrEmail}>
                            {invitation.usernameOrEmail}
                        </Typography>
                    ) : (
                        <Link
                            component={RouterLink}
                            to={`/${invitation.usernameOrEmail}`}
                            key={invitation.usernameOrEmail}>
                            <Typography variant="body2" color="text.link" fontWeight="bold" mt={2}>
                                {invitation.usernameOrEmail}
                            </Typography>
                        </Link>
                    )
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
            </Container>
        </Box>
    );
}
