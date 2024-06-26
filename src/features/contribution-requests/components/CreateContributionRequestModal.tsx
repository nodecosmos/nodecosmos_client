
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { MAX_NODE_INPUT_SIZE } from '../../nodes/nodes.constants';
import { ContributionRequest, ContributionRequestStatus } from '../contributionRequest.types';
import { createContributionRequest } from '../contributionRequests.thunks';
import { faCodeCommit, faCodePullRequest } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent,
    Box, Button, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* mui */
/* nodecosmos */

interface Props {
    open: boolean;
    onClose: () => void;
    nodeId: UUID;
    rootId: UUID;
}

const DIALOG_PAPER_PROPS = {
    elevation: 8,
    sx: { borderRadius: 2.5 },
};

function CreateContributionRequestModal(props: Props) {
    const {
        open, onClose, nodeId, rootId,
    } = props;
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const navigate = useNavigate();

    const onSubmit = useCallback(async (formValues: {title: string}) => {
        setLoading(true);

        const payload = {
            rootId,
            nodeId,
            status: ContributionRequestStatus.WorkInProgress,
            ...formValues,
        };

        const response = await dispatch(createContributionRequest(payload));
        setTimeout(() => setLoading(false), 500);

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);

            return;
        }

        const cr = response.payload as ContributionRequest;
        navigate(`/nodes/${rootId}/${nodeId}/contribution_requests/${cr.id}`);

        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'success',
            message: 'Contribution Request successfully created!',
        })), 10);
    }, [dispatch, handleServerError, navigate, nodeId, rootId]);

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            PaperProps={DIALOG_PAPER_PROPS}>
            <div className="DialogHeader">
                <div>
                    <Typography variant="h6" color="text.primary" align="center" width="auto">
                        <FontAwesomeIcon icon={faCodePullRequest} />
                        Contribution Request
                    </Typography>
                </div>
                <Typography variant="subtitle1" color="text.secondary" mt={1} align="center" width={1}>
                    Create contribution request to propose set of changes to the node
                </Typography>
                <CloseModalButton onClose={onClose} />
            </div>
            <DialogContent>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form className="h-100" onSubmit={handleSubmit}>
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
        </Dialog>
    );
}

export default React.memo(CreateContributionRequestModal);
