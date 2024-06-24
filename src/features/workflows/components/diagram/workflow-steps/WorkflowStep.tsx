import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import useModalOpenAuthorized from '../../../../../common/hooks/useModalOpenAuthorized';
import FlowModal from '../../../../flows/components/FlowModal';
import useDiagramContext from '../../../hooks/diagram/useDiagramContext';
import { useWorkflowStepContextCreator } from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import {
    FLOW_TOOLBAR_HEIGHT, FS_BUTTON_APPEAR_STYLE, WORKFLOW_STEP_WIDTH,
} from '../../../workflows.constants';
import WorkflowStepFlows from '../flows/WorkflowStepFlows';
import {
    Box, Button, Typography,
} from '@mui/material';
import React, { memo, useCallback } from 'react';

function WorkflowStep({ index }: { index: number }) {
    const { height, workflowSteps } = useDiagramContext();
    const wfStep = workflowSteps[index];

    const [hovered, hover, unhover] = useBooleanStateValue();
    const [flowModalOpen, openFlowModal, closeFlowModal] = useModalOpenAuthorized();

    const { x } = wfStep.position;
    const { WorkflowStepContext, contextProviderValue } = useWorkflowStepContextCreator({
        wfStep,
        wfStepIndex: wfStep.index,
        hovered,
    });

    const handleMouseEnter = useCallback((event: React.MouseEvent<SVGGElement, MouseEvent>) => {
        const targetElement = event.target as HTMLElement;

        if (targetElement.classList.contains('InputLink')) {
            event.stopPropagation();
            event.preventDefault();
        } else {
            hover();
        }
    }, [hover]);

    if (!x || !wfStep || !height) return null;

    return (
        <WorkflowStepContext.Provider value={contextProviderValue}>
            <g onMouseEnter={handleMouseEnter} onMouseLeave={unhover}>
                <rect
                    x={x}
                    y={0}
                    height={height}
                    width={WORKFLOW_STEP_WIDTH}
                    fill="transparent"
                    strokeWidth={1}
                    stroke="transparent"
                />
                <foreignObject
                    width={WORKFLOW_STEP_WIDTH}
                    height={FLOW_TOOLBAR_HEIGHT}
                    x={x}
                    y="0"
                >
                    <Box display="flex" height={1} alignItems="center" pl={2}>
                        <Typography variant="body2" color="text.secondary">
                            {wfStep.index + 1}
                        </Typography>
                        {hovered && (
                            <Button
                                className="ml-2 border-radius-1"
                                size="small"
                                variant="outlined"
                                color="secondary"
                                disableElevation
                                type="submit"
                                style={FS_BUTTON_APPEAR_STYLE}
                                onClick={openFlowModal}
                            >
                                Add Flow
                            </Button>
                        )}
                    </Box>
                    <FlowModal
                        open={flowModalOpen}
                        onClose={closeFlowModal}
                        verticalIndex={wfStep.flows.length}
                        startIndex={wfStep.index} />
                </foreignObject>

                <WorkflowStepFlows />
            </g>
        </WorkflowStepContext.Provider>
    );
}

export default memo(WorkflowStep);
