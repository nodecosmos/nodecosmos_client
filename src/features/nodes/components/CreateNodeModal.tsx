import Alert from '../../../common/components/Alert';
import DefaultFormButton from '../../../common/components/buttons/DefaultFormButton';
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { create, NodeCreationPayload } from '../nodes.thunks';
import { Node } from '../nodes.types';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent, Typography, Alert as MuiAlert, Box,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateNodeModal(props: { open: boolean, onClose: () => void }) {
    const { open, onClose } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const handleServerError = useHandleServerErrorAlert();

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
            maxWidth="md"
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 0,
                sx: { borderRadius: 2.5 },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    border: 1,
                    borderColor: 'borders.4',
                },
            }}
        >
            <DialogTitle>
                New Node
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Alert position="sticky" mb={1} />
                <MuiAlert
                    severity="info"
                    variant="outlined"
                    sx={{
                        borderRadius: 1,
                        width: 'calc(100% - 1px)',
                        border: 0,
                        mb: 2,
                        backgroundColor: 'background.1',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.info">
                        Create a new node to start a new innovation, research, or any other type of project.
                    </Typography>
                </MuiAlert>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                    '.fa-hashtag': {
                                        color: 'text.tertiary',
                                        ml: 1,
                                        mr: 2,
                                    },
                                }}>
                                <FontAwesomeIcon icon={faHashtag} />
                                <Field
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    InputProps={{
                                        autoComplete: 'off',
                                        endAdornment: loading ? <CircularProgress
                                            size={30}
                                            sx={{
                                                color: 'text.secondary',
                                                mr: 2,
                                            }} /> : null,
                                    }}
                                    required
                                />
                            </Box>

                            <DefaultFormButton loading={loading} color="primary" variant="outlined" />
                        </form>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
