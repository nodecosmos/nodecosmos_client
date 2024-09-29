import { NodecosmosTheme } from '../../../../../themes/themes.types';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import {
    EDGE_LENGTH, EDGE_MARGIN_LEFT, MARGIN_TOP, PATH_STYLE,
} from '../../../workflows.constants';
import { useTheme } from '@mui/material';
import React from 'react';
/* nodecosmos */

export default function NodeOutputsBranch() {
    const { position } = useFlowStepNodeContext();
    const theme: NodecosmosTheme = useTheme();

    const {
        x, y, xEnd, yEnd,
    } = position;

    if (!x || !y || !xEnd || !yEnd) return null;

    const branchX = x + EDGE_LENGTH + EDGE_MARGIN_LEFT;
    const branchY = y + MARGIN_TOP;

    if (branchY > yEnd) {
        return null;
    }

    return (
        <path
            stroke={theme.palette.workflow.default}
            fill="transparent"
            strokeWidth={3}
            d={`M ${branchX} ${branchY} L ${branchX} ${yEnd}`}
            style={PATH_STYLE}
        />
    );
}
