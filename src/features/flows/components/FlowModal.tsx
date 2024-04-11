import DefaultFormButton from '../../../common/components/buttons/DefaultFormButton';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { NodecosmosDispatch } from '../../../store';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { selectOptFlow } from '../flows.selectors';
import { createFlow, updateFlowTitle } from '../flows.thunks';
import { FlowUpsertPayload } from '../flows.types';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    open: boolean;
    onClose: () => void;
    id?: string;
    startIndex?: number;
    verticalIndex?: number;
}

export default function FlowModal(props: Props) {
    const {
        open, onClose, id = null, startIndex = 0, verticalIndex = 0,
    } = props;
    const { branchId, nodeId } = useWorkflowContext();

    const [loading, setLoading] = React.useState(false);
    const currentFlow = useSelector(selectOptFlow(branchId, id));
    const title = currentFlow ? currentFlow.title : '';
    const dispatch: NodecosmosDispatch = useDispatch();
    const isNew = !id;

    const onSubmit = useCallback(async (formValues: {title: string}) => {
        setLoading(true);

        const payload: FlowUpsertPayload = {
            nodeId,
            branchId,
            startIndex,
            verticalIndex,
            ...formValues,
        };

        if (isNew) {
            await dispatch(createFlow(payload));
        } else {
            payload.id = id;
            await dispatch(updateFlowTitle(payload));
        }

        setTimeout(() => setLoading(false), 500);
        onClose();
    }, [branchId, dispatch, id, isNew, nodeId, onClose, startIndex, verticalIndex]);

    const dialogTitle = isNew ? 'Add Flow' : 'Edit Flow';

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={onClose}
            open={open}
            PaperProps={{ elevation: 8 }}
        >
            <DialogTitle>
                {dialogTitle}
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }} initialValues={{ title }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <FinalFormInputField
                                fullWidth
                                name="title"
                                placeholder="Flow Title"
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
