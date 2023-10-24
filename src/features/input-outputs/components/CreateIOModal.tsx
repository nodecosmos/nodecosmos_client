import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { InputAdornment, DialogContent } from '@mui/material';
import { useSelector } from 'react-redux';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import FinalFormAutocompleteField from '../../../common/components/final-form/FinalFormAutocompleteField';
import useIOSubmitHandler from '../hooks/useIOSubmitHandler';
import { selectUniqueIOByRootNodeId } from '../inputOutputs.selectors';
import { ASSOCIATED_OBJECT_TYPES } from '../inputOutputs.constants';
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import DefaultModalFormButton from '../../../common/components/buttons/DefaultModalFormButton';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { UUID } from '../../../types';
import { FlowStep, FlowStepPrimaryKey } from '../../flow-steps/types';

interface BaseIOModalProps {
    open: boolean;
    onClose: () => void;
}

interface WorkflowProps extends BaseIOModalProps {
    associatedObject: 'workflow';
}

interface FlowStepProps extends BaseIOModalProps {
    associatedObject: 'flowStep';
    flowStepPrimaryKey: FlowStepPrimaryKey;
    outputNodeId: UUID;
    outputIdsByNodeId: FlowStep['outputIdsByNodeId'];
}

export type CreateIOModalProps = WorkflowProps | FlowStepProps;

export default function CreateIOModal(props: CreateIOModalProps) {
    const {
        open, onClose, associatedObject,
    } = props;
    const { id: workflowId } = useWorkflowContext();

    const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
    const rootNodeId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
    const allWorkflowIOs = useSelector(selectUniqueIOByRootNodeId(rootNodeId));
    const allIOTitles = allWorkflowIOs.map((io) => io.title);
    const uniqueIOTitles = [...new Set(allIOTitles)];

    const title = associatedObject === ASSOCIATED_OBJECT_TYPES.workflow
        ? 'Create Initial Input' : 'Create Output';

    const [autocompleteValue, setAutocompleteValue] = React.useState(null);

    const { onSubmit, loading } = useIOSubmitHandler(props, autocompleteValue);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 8,
            }}
        >
            <DialogTitle>
                {title}
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                    {({ handleSubmit }) => (
                        <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                            <FinalFormAutocompleteField
                                freeSolo
                                options={uniqueIOTitles}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <FontAwesomeIcon icon={faCodeCommit} />
                                        <span className="label">
                                            {option}
                                        </span>
                                    </li>
                                )}
                                startAdornment={(
                                    <InputAdornment position="start" sx={{ svg: { p: 2, color: 'tree.hashtag' } }}>
                                        <FontAwesomeIcon icon={faCodeCommit} />
                                    </InputAdornment>
                                )}
                                name="title"
                                placeholder="IO Title"
                                setAutocompleteValue={setAutocompleteValue}
                            />

                            <DefaultModalFormButton loading={loading} />
                        </form>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
