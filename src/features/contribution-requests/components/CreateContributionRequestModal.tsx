import DefaultFormButton from '../../../common/components/buttons/DefaultFormButton';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { ContributionRequestStatus } from '../contributionRequest.types';
import { createContributionRequest } from '../contributionRequests.thunks';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    InputAdornment,
    DialogContent, Typography, Alert as MuiAlert,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
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

export default function CreateContributionRequestModal(props: Props) {
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
            maxWidth="md"
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 5,
                sx: { borderRadius: 2.5 },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    border: 1,
                    borderColor: 'borders.4',
                },
            }}>
            <DialogTitle>
                New Contribution Request
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
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
                        Create a new contribution request to add changes to the node.
                    </Typography>
                </MuiAlert>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <FinalFormInputField
                                fullWidth
                                name="title"
                                placeholder="Contribution Request Title"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ svg: { color: 'tree.hashtag' } }}>
                                            <FontAwesomeIcon icon={faCodeCommit} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <DefaultFormButton loading={loading} />
                        </form>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
