import React from 'react';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import { faPlus, faChartNetwork } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { selectSelectedWorkflowObject } from '../../../workflows.selectors';
import CreateIOModal from '../../../../input-outputs/components/CreateIOModal';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import AssociateInputsModal from './AssociateInputsModal';

export default function WorkflowNodeButtonToolbar() {
    const { id } = useFlowStepNodeContext();
    const { flowStepPrimaryKey, outputIdsByNodeId } = useFlowStepContext();

    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject);
    const isSelected = selectedWorkflowDiagramObject?.id === id;

    const [outputsModalOpen, openOutputModal, closeOutputModal] = useModalOpen();
    const [inputsModalOpen, openInputsModal, closeInputsModal] = useModalOpen();

    if (!isSelected) return null;

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
                        onClick={openInputsModal}
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

            <AssociateInputsModal open={inputsModalOpen} onClose={closeInputsModal} />

            <CreateIOModal
                open={outputsModalOpen}
                onClose={closeOutputModal}
                associatedObject="flowStep"
                flowStepPrimaryKey={flowStepPrimaryKey}
                outputNodeId={id}
                outputIdsByNodeId={outputIdsByNodeId}
            />
        </>
    );
}
