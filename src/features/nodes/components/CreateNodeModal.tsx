import nodecosmos from '../../../api/nodecosmos-server';
import Alert from '../../../common/components/Alert';
import Field from '../../../common/components/final-form/FinalFormInputField';
import FinalFormRadioField from '../../../common/components/final-form/FinalFormRadioField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { STRIPE_ENABLED } from '../../app/constants';
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
import {
    Link as RouterLink, useNavigate, useSearchParams,
} from 'react-router-dom';

const DIALOG_PAPER_PROPS = {
    elevation: 8,
    sx: { borderRadius: 2.5 },
};

interface FormValues {
    title: string;
    isPublic: 'true' | 'false';
}

const CREATE_NODE_PARAM = 'create';
const IS_TRIAL_PARAM = 'trial';

export default function CreateNodeModal(props: { open: boolean, onClose: () => void }) {
    const { open, onClose: handlePropsClose } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const handleServerError = useHandleServerErrorAlert(true);
    const currentUser = useSelector(selectCurrentUser);
    const [searchParams] = useSearchParams();
    const createParam = searchParams.get(CREATE_NODE_PARAM);
    const [isModalOpen, setIsModalOpen] = React.useState(open || !!createParam);
    const isTrialParam = searchParams.get(IS_TRIAL_PARAM);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
        handlePropsClose();
    }, [handlePropsClose]);

    const onSubmit = useCallback(async (formValues: FormValues) => {
        setLoading(true);
        const isPublic = formValues.isPublic === 'true';

        if (!isPublic && STRIPE_ENABLED) {
            try {
                const response = await nodecosmos.post('/subscriptions/build_url', {
                    isRoot: true,
                    isPublic: false,
                    title: formValues.title,
                    orderIndex: 0,
                });

                window.location.href = response.data.url;

                setLoading(false);
                return;
            } catch (error: NodecosmosError | any) {
                handleServerError({
                    status: error?.response?.status,
                    message: error?.response?.data?.message || 'Something went wrong. Please try again later.',
                    viewMessage: true,
                });
                setLoading(false);
                return;
            }
        }

        const payload: NodeCreationPayload = {
            isRoot: true,
            ...formValues,
            isPublic: formValues.isPublic === 'true',
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

            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'success',
                message: 'Node created successfully!',
            })), 10);

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
            open={open || isModalOpen}
            PaperProps={DIALOG_PAPER_PROPS}
        >
            <div className="DialogHeader">
                <div>
                    <Typography variant="h6" color="texts.secondary" align="center" width="auto">
                        <FontAwesomeIcon icon={faHashtag} />
                        New Node
                    </Typography>
                </div>
                {
                    !currentUser && (
                        <div className="center my-2">
                            <Typography
                                variant="body2"
                                color="texts.secondary"
                                my={2}
                                align="center"
                            >
                                Create a new root node
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
                        <Typography
                            variant="subtitle1"
                            color="texts.secondary"
                            mt={2}
                            align="center"
                            width={1}
                            fontWeight={700}>
                            Create a new root node
                        </Typography>
                    )
                }

                <CloseModalButton onClose={onClose} />
            </div>
            {
                currentUser && (
                    <DialogContent>
                        <Alert position="sticky" mb={2} modal />
                        <Form<FormValues>
                            onSubmit={onSubmit}
                            subscription={{
                                submitting: true,
                                values: true,
                            }}
                            initialValues={{ isPublic: isTrialParam ? 'false' : 'true' }}
                        >
                            {({ handleSubmit, values }) => (
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
                                        name="isPublic"
                                        values={['true', 'false']}
                                        labels={[
                                            'Public / Open Source Root (Free)',
                                            'Private / Organization Root',
                                        ]}
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
                                            {
                                                values.isPublic === 'true'
                                                    ? 'Create Public Node' : (
                                                        STRIPE_ENABLED
                                                            ? 'Start 7-Day Free Trial'
                                                            : 'Create Private Node'
                                                    )
                                            }
                                        </Typography>
                                    </Button>
                                    {
                                        values.isPublic === 'false' && STRIPE_ENABLED && (
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                color="texts.tertiary"
                                                mt={1}
                                                align="center"
                                            >
                                                Credit card required—no charge if you cancel during your trial.
                                            </Typography>
                                        )
                                    }
                                </form>
                            )}
                        </Form>
                    </DialogContent>
                )
            }
        </Dialog>
    );
}
