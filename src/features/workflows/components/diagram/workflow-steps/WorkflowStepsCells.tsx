import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useDiagramContext from '../../../hooks/diagram/useDiagramContext';
import { WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import { useTheme } from '@mui/material';
import React from 'react';

export default function WorkflowStepCells() {
    const { height, workflowSteps } = useDiagramContext();
    const theme: NodecosmosTheme = useTheme();

    return workflowSteps.map((wfStep) => {
        const { x } = wfStep.position;

        if (!x || !wfStep || !height) return null;

        return (
            <g key={wfStep.index}>
                <rect
                    x={x}
                    y={0}
                    height={height}
                    width={WORKFLOW_STEP_WIDTH}
                    fill="transparent"
                    strokeWidth={1}
                    stroke={theme.palette.borders[1]}
                />

            </g>
        );
    });
}
