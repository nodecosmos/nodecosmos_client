import useModalOpenAuthorized from '../../../../../common/hooks/useModalOpenAuthorized';
import { UUID } from '../../../../../types';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import CreateIoModal, { IoObjectType } from '../../../../input-outputs/components/CreateIoModal';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useWorkflowBranch from '../../../hooks/useWorkflowBranch';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import {
    faPlus, faChartNetwork, faArrowUpRightFromSquare,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';

export default function FlowStepNodeToolbar() {
    const { activateInputsAddition } = useWorkflowContext();
    const { id, isSelected } = useFlowStepNodeContext();
    const {
        flowStepPrimaryKey, outputIdsByNodeId, inputIdsByNodeId: currentFlowStepInputIds, id: flowStepId,
    } = useFlowStepContext();
    const { setSelectedInputs } = useWorkflowContext();
    const { isFlowStepInputDeleted } = useWorkflowBranch();
    const {
        isBranch, branchId, originalId,
    } = useBranchContext();
    const [outputsModalOpen, openOutputModal, closeOutputModal] = useModalOpenAuthorized();

    const handleOpenInputsAddition = useCallback(() => {
        const inputs = (currentFlowStepInputIds?.[id] || []).filter(
            (inputId) => !isFlowStepInputDeleted(flowStepId, id, inputId),
        );

        setSelectedInputs(new Set<UUID>(inputs));

        activateInputsAddition();
    }, [activateInputsAddition, currentFlowStepInputIds, flowStepId, id, isFlowStepInputDeleted, setSelectedInputs]);

    const openNodeHref = useMemo(() => {
        return `/nodes/${branchId}/${id}?isBranchQ=${isBranch}&originalIdQ=${originalId}`;
    }, [branchId, isBranch, id, originalId]);

    if (!isSelected || !flowStepPrimaryKey) return null;

    return (
        <>
            <Box className="NodeToolbar" display="flex">
                <Tooltip title="Inputs" placement="top">
                    <IconButton
                        className="Item fs-18"
                        aria-label="Inputs"
                        color="secondary"
                        onClick={handleOpenInputsAddition}
                    >
                        <FontAwesomeIcon icon={faChartNetwork} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add Outputs" placement="top">
                    <IconButton
                        className="Item red fs-18"
                        aria-label="Add Outputs"
                        onClick={openOutputModal}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Open Node In New Tab" placement="top">
                    <IconButton
                        className="Item purple"
                        target="_blank"
                        href={openNodeHref}
                        aria-label="Open Node's workflow in New Tab"
                    >
                        <FontAwesomeIcon size="xs" icon={faArrowUpRightFromSquare} />
                    </IconButton>
                </Tooltip>
            </Box>

            <CreateIoModal
                open={outputsModalOpen}
                onClose={closeOutputModal}
                associatedObject={IoObjectType.flowStep}
                flowStepPrimaryKey={flowStepPrimaryKey}
                flowStepNodeId={id}
                outputIdsByNodeId={outputIdsByNodeId}
            />
        </>
    );
}
