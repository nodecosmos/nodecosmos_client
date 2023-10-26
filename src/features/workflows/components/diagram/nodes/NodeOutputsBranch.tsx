import React from 'react';
import { useTheme } from '@mui/material';
/* nodecosmos */
import {
    ANIMATION_DELAY, INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import {
    EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP, 
} from '../../../workflows.constants';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import { NodecosmosTheme } from '../../../../../themes/type';

export default function NodeOutputsBranch() {
    const { position } = useFlowStepNodeContext();
    const theme: NodecosmosTheme = useTheme();

    const {
        x, y, xEnd, yEnd,
    } = position;

    if (!x || !y || !xEnd || !yEnd) return null;

    const branchX = x + EDGE_LENGTH + MARGIN_LEFT;
    const branchY = y + MARGIN_TOP;

    return (
        <path
            stroke={theme.palette.workflow.default}
            fill="transparent"
            strokeWidth={3}
            d={`M ${branchX} ${branchY} L ${branchX} ${yEnd}`}
            style={{
                opacity: 0,
                animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
                transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
            }}
        />
    );
}
