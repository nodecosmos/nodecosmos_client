import Alert from '../../common/components/Alert';
import ConfirmationModal, { ConfirmType } from '../../common/components/ConfirmationModal';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../common/hooks/useHandleServerErrorAlert';
import useModalOpen from '../../common/hooks/useModalOpen';
import { setAlert } from '../../features/app/appSlice';
import {
    confirmInvitation,
    findByToken, FindByTokenResponse, rejectInvitation,
} from '../../features/invitations/invitations.thunks';
import { REDIRECT_Q } from '../../features/users/components/LoginForm';
import UserProfileLink from '../../features/users/components/UserProfileLink';
import { selectCurrentUser } from '../../features/users/users.selectors';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosError } from '../../types';
import { faCheck, faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Link, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link as RouterLink, useNavigate, useSearchParams,
} from 'react-router-dom';

export default function Invite() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const handleServerError = useHandleServerErrorAlert();
    const [response, setResponse] = React.useState<FindByTokenResponse | null>(null);
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [rejModOpen, openRejMod, closeDelMod] = useModalOpen();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();

    const findByTokenCb = useCallback(async () => {
        if (!token) throw new Error('Missing token');

        const response = await dispatch(findByToken(token));
        if (response.meta.requestStatus === 'fulfilled') {
            const data = response.payload as FindByTokenResponse;
            setResponse(data);
        } else if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            handleServerError(error);
            console.error(error);

            return;
        }
    }, [dispatch, handleServerError, token]);

    const confirmInvitationCb = useCallback(async () => {
        if (!response) throw new Error('Missing response');

        if (loading) return;

        setLoading();

        const res = await dispatch(confirmInvitation({
            branchId: response.node.branchId,
            nodeId: response.node.id,
            usernameOrEmail: response.invitation.usernameOrEmail,
        }));

        if (res.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = res.payload as NodecosmosError;

            handleServerError(error);
            console.error(error);

            unsetLoading();

            return;
        }

        setTimeout(() => {
            navigate(`/nodes/${response.node.branchId}/${response.node.id}`);
            setTimeout(() => {
                dispatch(setAlert({
                    isOpen: true,
                    message: 'Collaboration Invitation accepted.',
                    severity: 'success',
                }));
            }, 250);
        }, 250);
    }, [dispatch, handleServerError, loading, navigate, response, setLoading, unsetLoading]);

    const rejectInvitationCb = useCallback(async () => {
        if (!response) throw new Error('Missing response');

        const res = await dispatch(rejectInvitation({
            branchId: response.node.branchId,
            nodeId: response.node.id,
            usernameOrEmail: response.invitation.usernameOrEmail,
        }));

        if (res.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = res.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);

            return;
        }

        navigate('/');

        setTimeout(() => {
            dispatch(setAlert({
                isOpen: true,
                message: 'Invitation rejected.',
                severity: 'success',
            }));
        }, 250);
    }, [response, dispatch, navigate, handleServerError]);

    useEffect(() => {
        if (!token) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Invalid invitation token.',
            }));
        } else if (!response) {
            findByTokenCb().catch(console.error);
        } else if (response.inviteForDifferentUser) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: `You are logged in as ${currentUser?.email}. The invitation is for 
                          ${response.invitation.usernameOrEmail}. Please log in as 
                          ${response.invitation.usernameOrEmail} to accept the invitation.`,
            }));
        } else if (response.hasUser && !currentUser) {
            navigate(`/auth/login?${REDIRECT_Q}=${btoa(window.location.href)}`);
            setTimeout(() => {
                dispatch(setAlert({
                    isOpen: true,
                    message: 'Please log in to accept the invitation.',
                    severity: 'success',
                }));
            }, 250);
        } else if (!response.hasUser) {
            navigate(`/auth/signup?${REDIRECT_Q}=${btoa(window.location.href)}
                      &token=${token}&email=${response.invitation.usernameOrEmail}`);
            setTimeout(() => {
                dispatch(setAlert({
                    isOpen: true,
                    message: 'Please sign up to accept the invitation.',
                    severity: 'success',
                }));
            }, 250);
        }
    }, [currentUser, dispatch, findByTokenCb, navigate, response, token]);

    return (
        <Container
            maxWidth="lg"
            sx={{
                overflow: 'hidden',
                position: 'relative',
                py: 4,
            }}>
            <Alert position="relative" mb={2} />
            {
                response && !response.inviteForDifferentUser && (
                    <Box
                        position="relative"
                        p={4}
                        borderRadius={2}
                        border={1}
                        sx={{ borderColor: 'borders.4' }}
                    >
                        <UserProfileLink id={response.inviter.id} />
                        <Typography mt={1} color="texts.secondary" fontWeight="bold">
                            Invited you to collaborate on
                            <Link
                                target="_blank"
                                color="texts.link"
                                component={RouterLink}
                                to={`/nodes/${response.node.branchId}/${response.node.id}`}>
                                {' '}
                                {response.node.title}
                                {' '}
                            </Link>
                            Node.
                        </Typography>
                        <Button
                            onClick={openRejMod}
                            color="error"
                            sx={{ mt: 2 }}
                            variant="outlined"
                            type="button"
                            startIcon={<FontAwesomeIcon icon={faClose} size="2xs" />}
                        >
                            <span className="Text">
                                Reject Invitation
                            </span>
                        </Button>
                        <Button
                            onClick={confirmInvitationCb}
                            color="success"
                            sx={{
                                ml: {
                                    xs: 0,
                                    sm: 2,
                                },
                                mt: 2,
                            }}
                            variant="outlined"
                            type="button"
                            startIcon={
                                loading ? <CircularProgress size={20} sx={{ color: 'texts.success' }} />
                                    : <FontAwesomeIcon icon={faCheck} size="2xs" />
                            }
                        >
                            <span className="Text">
                                Accept Invitation
                            </span>
                        </Button>

                        <ConfirmationModal
                            text={`This action will reject the invitation to collaborate on the ${response.node.title}
                                   node.`}
                            confirmText="I understand, Reject Invitation"
                            confirmType={ConfirmType.Deletion}
                            open={rejModOpen}
                            onClose={closeDelMod}
                            onConfirm={rejectInvitationCb}
                        />
                    </Box>
                )
            }
        </Container>
    );
}
