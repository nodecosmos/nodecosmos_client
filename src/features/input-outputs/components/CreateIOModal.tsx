import DefaultModalFormButton from '../../../common/components/buttons/DefaultModalFormButton';
import FinalFormAutocompleteField from '../../../common/components/final-form/FinalFormAutocompleteField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import DefaultModal from '../../../common/components/modal/DefaultModal';
import { UUID } from '../../../types';
import { FlowStep, FlowStepPrimaryKey } from '../../flow-steps/types';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { selectWorkflowAttribute } from '../../workflows/workflow.selectors';
import useIOSubmitHandler from '../hooks/useIOSubmitHandler';
import { selectUniqueIOByRootNodeId } from '../inputOutputs.selectors';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useSelector } from 'react-redux';

export enum associatedObjectTypes {
    workflow = 'workflow',
    flowStep = 'flowStep',
}

interface BaseIOProps {
    open: boolean;
    onClose: () => void;
    associatedObject: associatedObjectTypes;
}

interface FlowStepProps extends BaseIOProps {
    flowStepPrimaryKey: FlowStepPrimaryKey;
    outputNodeId: UUID;
    outputIdsByNodeId: FlowStep['outputIdsByNodeId'];
}

export type CreateIOModalProps = BaseIOProps & FlowStepProps;

export default function CreateIOModal(props: BaseIOProps & FlowStepProps) {
    const {
        open, onClose, associatedObject,
    } = props;
    const { id: workflowId } = useWorkflowContext();

    const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
    const rootNodeId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
    const allWorkflowIOs = useSelector(selectUniqueIOByRootNodeId(rootNodeId));
    const allIOTitles = allWorkflowIOs.map((io) => io.title);
    const uniqueIOTitles = [...new Set(allIOTitles)];

    const title = associatedObject === associatedObjectTypes.workflow
        ? 'Create Initial Input' : 'Create Output';

    const [autocompleteValue, setAutocompleteValue] = React.useState(null);

    const { onSubmit, loading } = useIOSubmitHandler(props, autocompleteValue);

    const renderOption = useCallback((props: React.HTMLAttributes<HTMLLIElement>, option: string) => (
        <li {...props}>
            <FontAwesomeIcon icon={faCodeCommit} />
            <span className="label">
                {option}
            </span>
        </li>
    ), []);

    return (
        <DefaultModal open={open} onClose={onClose}>
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
                                renderOption={renderOption}
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
        </DefaultModal>
    );
}
