import Field from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import { NodecosmosDispatch } from '../../../store';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { maybeSelectFlow } from '../flows.selectors';
import { createFlow } from '../flows.thunks';
import { FlowUpsertPayload } from '../flows.types';
import { faCodeCommit, faSave } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DialogContent, Typography, Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
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
    const {
        rootId, branchId, nodeId,
    } = useWorkflowContext();
    const [loading, setLoading] = React.useState(false);
    const currentFlow = useSelector(maybeSelectFlow(branchId, id));
    const title = currentFlow ? currentFlow.title : '';
    const dispatch: NodecosmosDispatch = useDispatch();
    const onSubmit = useCallback(async (formValues: {title: string}) => {
        setLoading(true);

        const payload: FlowUpsertPayload = {
            rootId,
            nodeId,
            branchId,
            startIndex,
            verticalIndex,
            ...formValues,
        };

        await dispatch(createFlow(payload));

        setTimeout(() => setLoading(false), 500);
        onClose();
    }, [branchId, dispatch, nodeId, onClose, rootId, startIndex, verticalIndex]);

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            PaperProps={{ elevation: 8 }}
        >
            <div className="DialogHeader">
                <div>
                    <Typography variant="h6" color="text.primary" align="center" width="auto">
                        <FontAwesomeIcon icon={faCodeCommit} />
                        New Flow
                    </Typography>
                </div>
                <Typography variant="subtitle1" color="text.secondary" mt={2} align="center" width={1}>
                    Create a flow to define a isolated process within your workflow.
                </Typography>

                <CloseModalButton onClose={onClose} />
            </div>
            <DialogContent>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }} initialValues={{ title }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <Field
                                fullWidth
                                name="title"
                                label="Flow Title"
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
                                        : <FontAwesomeIcon icon={faSave} />
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
