import React, { useState } from 'react';
import {
    Box, Button, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FlowModal from '../../../../flows/components/FlowModal';
import { WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../../workflows.selectors';
import WorkflowStepFlows from '../flows/WorkflowStepFlows';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { useWorkflowStepContextCreator } from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';

export default function WorkflowStep({ wfStep, wfStepIndex }) {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);
    const [openCreateFlowModal, setOpenCreateFlowModal] = useState(false);

    const { wfHeight } = useWorkflowContext();

    const { x } = useSelector(selectWorkflowDiagramPosition(wfStep.diagramId));

    const fillColor = wfStepIndex % 2 === 0 ? theme.palette.background[6] : theme.palette.background[5];
    const hoverColor = theme.palette.background[7];

    const {
        WorkflowStepContext,
        contextProviderValue,
    } = useWorkflowStepContextCreator({
        wfStep,
        wfStepIndex,
        hovered,
        setHovered,
    });

    if (!x || !wfStep) return null;

    return (
        <WorkflowStepContext.Provider value={contextProviderValue}>
            <g
                key={wfStep.diagramId}
                onMouseEnter={(e) => {
                    if (e.target.classList.contains('input-branch')) {
                        e.stopPropagation();
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
                    <Box
                        display="flex"
                        height={1}
                        alignItems="center"
                        pl={2}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {wfStepIndex + 1}
                        </Typography>
                        {hovered && (
                            <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                disableElevation
                                type="submit"
                                sx={{ ml: 2, borderRadius: 1 }}
                                onClick={() => setOpenCreateFlowModal(true)}
                            >
              Add Flow
                            </Button>
                        )}
                    </Box>
                    <FlowModal
                        workflowId={wfStep.workflowId}
                        open={openCreateFlowModal}
                        startIndex={wfStepIndex}
                        onClose={() => setOpenCreateFlowModal(false)}
                    />
                </foreignObject>

                <WorkflowStepFlows />
            </g>
        </WorkflowStepContext.Provider>
    );
}

WorkflowStep.propTypes = {
    wfStep: PropTypes.object.isRequired,
    wfStepIndex: PropTypes.number.isRequired,
};
