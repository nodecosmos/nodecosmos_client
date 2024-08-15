import Alert from '../../../common/components/Alert';
import Field from '../../../common/components/final-form/FinalFormInputField';
import FinalFormRadioField from '../../../common/components/final-form/FinalFormRadioField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { REDIRECT_Q } from '../../users/components/LoginForm';
import { selectCurrentUser } from '../../users/users.selectors';
import { MAX_NODE_INPUT_SIZE } from '../nodes.constants';
import { create, NodeCreationPayload } from '../nodes.thunks';
import { Node } from '../nodes.types';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent, Typography, Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function CreateNodeModal(props: { open: boolean, onClose: () => void }) {
    const { open, onClose } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const handleServerError = useHandleServerErrorAlert();
    const currentUser = useSelector(selectCurrentUser);
    const onSubmit = useCallback(async (formValues: {title: string}) => {
        setLoading(true);

        const payload: NodeCreationPayload = {
            isPublic: true,
            isRoot: true,
            ...formValues,
            orderIndex: 0,
        };

        dispatch(create(payload)).then((response) => {
            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerError(error);
                console.error(error);
                setLoading(false);
                return;
            }
            const node = response.payload as Node;

            navigate(`/nodes/${node.rootId}/${node.id}`);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.error(error);
        });
    }, [dispatch, handleServerError, navigate]);

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            <div className="DialogHeader">
                <div>
                    <Typography variant="h6" color="text.secondary" align="center" width="auto">
                        <FontAwesomeIcon icon={faHashtag} />
                        New Node
                    </Typography>
                </div>
                {
                    !currentUser && (
                        <div className="center my-2">
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                my={2}
                                align="center"
                                fontWeight={400}
                            >
                                Start a new innovation, research, or knowledge sharing project.
                            </Typography>
                            <Button
                                component={RouterLink}
                                to={`/auth/login?${REDIRECT_Q}=${btoa(window.location.href)}`}
                                color="primary"
                            >
                                Log in
                            </Button>
                            <Button
                                className="ml-1"
                                component={RouterLink}
                                to={`/auth/signup?${REDIRECT_Q}=${btoa(window.location.href)}`}
                                variant="outlined"
                            >
                                Sign Up
                            </Button>
                        </div>
                    )
                }

                {
                    currentUser && (
                        <Typography variant="subtitle1" color="text.secondary" mt={2} align="center" width={1}>
                            Create a node to start a new innovation, research, or knowledge-sharing project,
                            or to test the platform.
                        </Typography>
                    )
                }

                <CloseModalButton onClose={onClose} />
            </div>
            {
                currentUser && (
                    <DialogContent>
                        <Alert position="sticky" mb={1} />
                        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                            {({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        fullWidth
                                        name="title"
                                        label="Title"
                                        InputProps={{ autoComplete: 'off' }}
                                        maxLength={MAX_NODE_INPUT_SIZE}
                                        required
                                    />
                                    <FinalFormRadioField
                                        disabled={[false, true]}
                                        name="isPublic"
                                        values={['public', 'private']}
                                        labels={['Public (Free)', 'Private (Coming Soon)']}
                                        defaultValue="public"
                                    />
                                    <Button
                                        className="SubmitButtonBig"
                                        size="small"
                                        color="button"
                                        type="submit"
                                        disabled={loading}
                                        variant="contained"
                                        disableElevation
                                        startIcon={
                                            loading
                                                ? <CircularProgress size={20} />
                                                : <FontAwesomeIcon icon={faCodeCommit} />
                                        }
                                    >
                                        <Typography variant="subtitle1">
                                            Create
                                        </Typography>
                                    </Button>

                                </form>
                            )}
                        </Form>
                    </DialogContent>
                )
            }
        </Dialog>
    );
}
