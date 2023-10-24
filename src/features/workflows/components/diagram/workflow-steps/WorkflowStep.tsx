import React, { useState } from 'react';
import {
    Box, Button, Typography, useTheme,
} from '@mui/material';
import FlowModal from '../../../../flows/components/FlowModal';
import { WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import WorkflowStepFlows from '../flows/WorkflowStepFlows';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { useWorkflowStepContextCreator } from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import { WorkflowStep as WorkflowStepType } from '../../../types';
import { NodecosmosTheme } from '../../../../../themes/type';
import useModalOpen from '../../../../../common/hooks/useModalOpen';

export default function WorkflowStep({ wfStep }: { wfStep: WorkflowStepType }) {
    const theme: NodecosmosTheme = useTheme();

    const [hovered, setHovered] = useState(false);
    const [flowModalOpen, openFlowModal, closeFlowModal] = useModalOpen();

    const { wfHeight } = useWorkflowContext();
    const { x } = wfStep.position;
    const fillColor = wfStep.index % 2 === 0 ? theme.palette.background[6] : theme.palette.background[5];
    const hoverColor = theme.palette.background[7];
    const {
        WorkflowStepContext,
        contextProviderValue,
    } = useWorkflowStepContextCreator({
        wfStep,
        wfStepIndex: wfStep.index,
        hovered,
    });

    if (!x || !wfStep) return null;

    return (
        <WorkflowStepContext.Provider value={contextProviderValue}>
            <g
                key={wfStep.index}
                onMouseEnter={(event) => {
                    const targetElement = event.target as HTMLElement;

                    if (targetElement.classList.contains('input-branch')) {
                        event.stopPropagation();
                    } else {
                        setHovered(true);
                    }
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
            >
                <path
                    strokeWidth={1}
                    d={`M ${x} ${0}
                        L ${x} ${wfHeight - 2}`}
                    stroke={theme.palette.borders[1]}
                    fill="transparent"
                />
                <rect
                    x={x}
                    y={0}
                    height={wfHeight}
                    width={WORKFLOW_STEP_WIDTH}
                    fill={hovered ? hoverColor : fillColor}
                    fillOpacity={0.3}
                    stroke="transparent"
                    strokeWidth={2}
                />
                <foreignObject
                    width={WORKFLOW_STEP_WIDTH}
                    height={WORKFLOW_STEP_HEIGHT}
                    x={x}
                    y="0"
                >
                    <Box display="flex" height={1} alignItems="center" pl={2}>
                        <Typography variant="body2" color="text.secondary">{wfStep.index}</Typography>
                        {hovered && (
                            <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                disableElevation
                                type="submit"
                                sx={{ ml: 2, borderRadius: 1 }}
                                onClick={openFlowModal}
                            >
                                Add Flow
                            </Button>
                        )}
                    </Box>
                    <FlowModal
                        open={flowModalOpen}
                        onClose={closeFlowModal}
                        startIndex={wfStep.index} />
                </foreignObject>

                <WorkflowStepFlows />
            </g>
        </WorkflowStepContext.Provider>
    );
}
