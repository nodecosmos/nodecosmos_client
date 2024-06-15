import Alert from '../../../common/components/Alert';
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { MAX_NODE_INPUT_SIZE } from '../nodes.constants';
import { create, NodeCreationPayload } from '../nodes.thunks';
import { Node } from '../nodes.types';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent, Typography, Box, Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
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
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            <div className="DialogHeader">
                <div>
                    <Typography variant="h6" color="text.primary" align="center" width="auto">
                        <FontAwesomeIcon icon={faHashtag} />
                        New Node
                    </Typography>
                </div>
                <Typography variant="subtitle1" color="text.secondary" mt={2} align="center" width={1}>
                    Create a node to start a new innovation, research, or knowledge sharing project.
                </Typography>

                <CloseModalButton onClose={onClose} />
            </div>
            <DialogContent>
                <Alert position="sticky" mb={1} />
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" alignItems="center">
                                <Field
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    InputProps={{ autoComplete: 'off' }}
                                    maxLength={MAX_NODE_INPUT_SIZE}
                                    required
                                />
                            </Box>

                            <Button
                                size="small"
                                color="button"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    width: 1,
                                    height: '50px',
                                    '.MuiButton-startIcon': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        svg: { height: 20 },
                                    },
                                }}
                                variant="contained"
                                disableElevation
                                startIcon={
                                    loading
                                        ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
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
        </Dialog>
    );
}
