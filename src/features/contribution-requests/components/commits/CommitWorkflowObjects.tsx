import CommitWorkflowObject from './CommitWorkflowObject';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectFlowStepsByIds } from '../../../flow-steps/flowSteps.selectors';
import { selectFlowsByIds } from '../../../flows/flows.selectors';
import { selectIosByIds } from '../../../input-outputs/inputOutputs.selectors';
import { selectNodesByIds } from '../../../nodes/nodes.selectors';
import {
    Box, Chip, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export enum WorkflowObjectType {
    InputOutput = 'InputOutput',
    Flow = 'Flow',
    FlowStep = 'FlowStep',
    FlowStepNode = 'FlowStepNode',
}

interface ObjectProps {
    title: string;
    ids: Set<string> | null;
}

interface Props extends ObjectProps {
    objectType: WorkflowObjectType;
}

export default function CommitWorkflowObjectsWrapper(props: Props) {
    const {
        title, ids, objectType,
    } = props;

    switch (objectType) {
    case WorkflowObjectType.InputOutput:
        return <CommitWorkflowInputOutputs title={title} ids={ids} />;
    case WorkflowObjectType.Flow:
        return <CommitWorkflowFlows title={title} ids={ids} />;
    case WorkflowObjectType.FlowStep:
        return <CommitWorkflowFlowSteps title={title} ids={ids} />;
    case WorkflowObjectType.FlowStepNode:
        return <CommitWorkflowFlowStepNodes title={title} ids={ids} />;
    default:
        throw new Error(`Invalid object type: ${objectType}`);
    }
}

function CommitWorkflowInputOutputs(props: ObjectProps) {
    const { title, ids } = props;
    const { branchId } = useBranchContext();
    const ios = useSelector(selectIosByIds(branchId, ids || new Set()));

    if (!ios.length) {
        return null;
    }

    return (
        <Box p={4} pl={3} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary" ml={1}>
                {title}
                <Chip
                    component="span"
                    color="button"
                    label={ios.length}
                    size="small" />
            </Typography>
            <Box>
                {
                    ios.map((io) => (
                        <CommitWorkflowObject key={io.id} objectType={WorkflowObjectType.InputOutput} object={io} />
                    ))
                }
            </Box>
        </Box>
    );
}

function CommitWorkflowFlows(props: ObjectProps) {
    const { title, ids } = props;
    const { branchId } = useBranchContext();
    const flows = useSelector(selectFlowsByIds(branchId, ids || new Set()));

    if (!flows.length) {
        return null;
    }

    return (
        <Box p={4} pl={3} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary" ml={1}>
                {title}
                <Chip
                    component="span"
                    color="button"
                    label={flows.length}
                    size="small" />
            </Typography>
            <Box>
                {
                    flows.map((flow) => (
                        <CommitWorkflowObject key={flow.id} objectType={WorkflowObjectType.Flow} object={flow} />
                    ))
                }
            </Box>
        </Box>
    );
}

function CommitWorkflowFlowSteps(props: ObjectProps) {
    const { title, ids } = props;
    const { branchId } = useBranchContext();
    const flowSteps = useSelector(selectFlowStepsByIds(branchId, ids || new Set()));

    if (!flowSteps.length) {
        return null;
    }

    return (
        <Box p={4} pl={3} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary" ml={1}>
                {title}
                <Chip
                    component="span"
                    color="button"
                    label={flowSteps.length}
                    size="small" />
            </Typography>
            <Box>
                {
                    flowSteps.map((flowStep) => (
                        <CommitWorkflowObject
                            key={flowStep.id}
                            objectType={WorkflowObjectType.FlowStep}
                            object={flowStep} />
                    ))
                }
            </Box>
        </Box>
    );
}

function CommitWorkflowFlowStepNodes(props: ObjectProps) {
    const { title, ids } = props;
    const { branchId } = useBranchContext();
    const flowStepNodes = useSelector(selectNodesByIds(branchId, ids || new Set()));

    if (!flowStepNodes.length) {
        return null;
    }

    return (
        <Box p={4} pl={3} borderBottom={1} borderColor="borders.3">
            <Typography fontWeight="bold" color="text.secondary" ml={1}>
                {title}
                <Chip
                    component="span"
                    color="button"
                    label={flowStepNodes.length}
                    size="small" />
            </Typography>
            <Box>
                {
                    flowStepNodes.map((flowStepNode) => (
                        <CommitWorkflowObject
                            key={flowStepNode.id}
                            objectType={WorkflowObjectType.FlowStepNode}
                            object={flowStepNode} />
                    ))
                }
            </Box>
        </Box>
    );
}
