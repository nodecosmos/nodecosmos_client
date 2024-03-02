import DefaultFormButton from '../../../common/components/buttons/DefaultFormButton';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { createWorkflow } from '../worfklow.thunks';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
    nodeId: UUID;
}

export default function CreateWorkflowModal(props: Props) {
    const {
        open, onClose, nodeId,
    } = props;

    const { id: branchId } = useParams<{ id: string }>();
    const [loading, setLoading] = React.useState(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const rootNodeId = useSelector(selectNodeAttribute(branchId as UUID, nodeId, 'rootId'));

    const onSubmit = useCallback(async (formValues: { title: string }) => {
        setLoading(true);

        if (!rootNodeId) throw new Error('Root node id is not defined');

        const payload = {
            nodeId,
            rootNodeId,
            ...formValues,
        };

        await dispatch(createWorkflow(payload));

        setTimeout(() => setLoading(false), 500);
        onClose();
    }, [dispatch, nodeId, onClose, rootNodeId]);

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
            }}
        >
            <DialogTitle>
                New Workflow
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <FinalFormInputField
                                fullWidth
                                name="title"
                                placeholder="Workflow Title"
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

CreateWorkflowModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    nodeId: PropTypes.string.isRequired,
};
