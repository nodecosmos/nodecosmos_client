
import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { MAX_NODE_INPUT_SIZE } from '../../nodes/nodes.constants';
import { ContributionRequestStatus } from '../contributionRequest.types';
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

    const onSubmit = useCallback((formValues: {title: string}) => {
        setLoading(true);

        const payload = {
            rootId,
            nodeId,
            status: ContributionRequestStatus.WorkInProgress,
            ...formValues,
        };

        dispatch(createContributionRequest(payload)).then(() => {
            onClose();
            setTimeout(() => setLoading(false), 500);
        });
    }, [dispatch, nodeId, onClose, rootId]);

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
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
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

export default React.memo(CreateContributionRequestModal);
