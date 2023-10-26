import React, { useCallback, useState } from 'react';
import {
    Box, Button, Typography, useTheme,
} from '@mui/material';
import FlowModal from '../../../../flows/components/FlowModal';
import { WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import WorkflowStepFlows from '../flows/WorkflowStepFlows';
import { useWorkflowStepContextCreator } from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import { WorkflowStep as WorkflowStepType } from '../../../diagram/types';
import { NodecosmosTheme } from '../../../../../themes/type';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import useDiagramContext from '../../../hooks/diagram/useDiagramContext';

export default function WorkflowStep({ wfStep }: { wfStep: WorkflowStepType }) {
    const theme: NodecosmosTheme = useTheme();

    const [hovered, setHovered] = useState(false);
    const [flowModalOpen, openFlowModal, closeFlowModal] = useModalOpen();

    const { height } = useDiagramContext();
    const { x } = wfStep.position;
    const fillColor = wfStep.index % 2 === 0 ? theme.palette.background[6] : theme.palette.background[5];
    const hoverColor = theme.palette.background[7];
    const { WorkflowStepContext, contextProviderValue } = useWorkflowStepContextCreator({
        wfStep,
        wfStepIndex: wfStep.index,
        hovered,
    });

    const handleMouseEnter = useCallback((event: React.MouseEvent<SVGGElement, MouseEvent>) => {
        const targetElement = event.target as HTMLElement;

        if (targetElement.classList.contains('input-branch')) {
            event.stopPropagation();
        } else {
            setHovered(true);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    if (!x || !wfStep || !height) return null;

    return (
        <WorkflowStepContext.Provider value={contextProviderValue}>
            <g
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <path
                    strokeWidth={1}
                    d={`M ${x} ${0}
                        L ${x} ${height - 2}`}
                    stroke={theme.palette.borders[1]}
                    fill="transparent"
                />
                <rect
                    x={x}
                    y={0}
                    height={height}
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
