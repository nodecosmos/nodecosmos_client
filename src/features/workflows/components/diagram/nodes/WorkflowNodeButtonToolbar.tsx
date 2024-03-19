import useModalOpen from '../../../../../common/hooks/useModalOpen';
import { UUID } from '../../../../../types';
import CreateIOModal, { associatedObjectTypes } from '../../../../input-outputs/components/CreateIOModal';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { faPlus, faChartNetwork } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import React, { useCallback } from 'react';

export default function WorkflowNodeButtonToolbar() {
    const { activateInputsAddition } = useWorkflowContext();
    const { id, isSelected } = useFlowStepNodeContext();
    const {
        flowStepPrimaryKey, outputIdsByNodeId, inputIdsByNodeId: currentFlowStepInputIds,
    } = useFlowStepContext();
    const { setSelectedInputs } = useWorkflowContext();

    const [outputsModalOpen, openOutputModal, closeOutputModal] = useModalOpen();

    const handleOpenInputsAddition = useCallback(() => {
        setSelectedInputs(new Set<UUID>(currentFlowStepInputIds[id] || []));

        activateInputsAddition();
    }, [activateInputsAddition, currentFlowStepInputIds, id, setSelectedInputs]);

    if (!isSelected || !flowStepPrimaryKey) return null;

    return (
        <>
            <Box
                display="flex"
                sx={{
                    ml: 1,
                    '.Item': {
                        width: 32,
                        height: 32,
                        mx: 0.5,
                        borderRadius: 1,
                        '&:hover': { backgroundColor: 'toolbar.hover' },
                    },
                    '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 18 },
                }}
            >

                <Tooltip title="Inputs" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Inputs"
                        sx={{ color: 'secondary.main' }}
                        onClick={handleOpenInputsAddition}
                    >
                        <FontAwesomeIcon icon={faChartNetwork} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add Outputs" placement="top">
                    <IconButton
                        className="Item"
                        aria-label="Add Outputs"
                        sx={{ color: 'toolbar.red' }}
                        onClick={openOutputModal}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </Tooltip>
            </Box>

            <CreateIOModal
                open={outputsModalOpen}
                onClose={closeOutputModal}
                associatedObject={associatedObjectTypes.flowStep}
                flowStepPrimaryKey={flowStepPrimaryKey}
                outputNodeId={id}
                outputIdsByNodeId={outputIdsByNodeId}
            />
        </>
    );
}
