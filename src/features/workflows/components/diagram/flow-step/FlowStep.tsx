import FlowStepToolbar from './FlowStepToolbar';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosTheme } from '../../../../../themes/type';
import { ObjectType } from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { FLOW_TOOLBAR_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../constants';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import FlowStepNode from '../nodes/FlowStepNode';
import { Box, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function FlowStep() {
    const { branchId } = useWorkflowContext();
    const { currentRootId } = useBranchParams();
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        flowStepNodes, x, y, yEnd, nodeId, id, isSelected,
    } = useFlowStepContext();
    const theme: NodecosmosTheme = useTheme();
    const [hovered, hover, unhover] = useBooleanStateValue();
    const { backgroundColor, outlineColor } = useFlowStepColors();

    const handleFlowStepClick = useCallback((event: React.MouseEvent<SVGGElement | HTMLElement>) => {
        if (
            !(event.target instanceof SVGRectElement)
            && (
                // we want to click as much as possible but that means
                // we need to exclude elements that are clickable within the flow step rect, but also within
                // modals that are rendered within the flow step
                event.target instanceof HTMLButtonElement
                || event.target instanceof HTMLInputElement
                || event.target instanceof HTMLParagraphElement
                || event.target instanceof HTMLLIElement
                || event.target instanceof HTMLUListElement
                || event.target instanceof HTMLHeadingElement
                || event.target instanceof HTMLSpanElement
                || event.target instanceof HTMLFieldSetElement
                || event.target instanceof SVGElement
                || (event.target instanceof HTMLLIElement && (
                    event.target.classList.contains('MuiDialogContent-root')
                    || event.target.classList.contains('MuiDialog-container'))
                )
            )
        ) return;

        unhover();

        dispatch(selectObject({
            currentBranchId: branchId,
            currentRootId,
            objectNodeId: nodeId,
            branchId,
            objectId: id,
            objectType: ObjectType.FlowStep,
        }));
    }, [branchId, currentRootId, dispatch, id, nodeId, unhover]);

    return (
        <g
            onClick={handleFlowStepClick}
            style={{ cursor: 'pointer' }}
            onMouseEnter={hover}
            onMouseLeave={unhover}
        >
            <rect
                x={x + 1}
                y={y + 1}
                width={WORKFLOW_STEP_WIDTH - 1}
                height={yEnd - y}
                fill={backgroundColor}
                strokeWidth={isSelected ? 2 : 1}
                stroke={hovered || isSelected ? theme.palette.toolbar.default : 'transparent'}
            />
            <foreignObject
                x={x}
                y={y}
                width={WORKFLOW_STEP_WIDTH + 1}
                height={FLOW_TOOLBAR_HEIGHT}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    height="calc(100% - 0px)"
                    borderTop={1}
                    borderBottom={1}
                    borderColor={outlineColor}
                    color="text.tertiary"
                    zIndex={1}
                    position="relative"
                >
                    <FlowStepToolbar />
                </Box>
            </foreignObject>
            <g>
                {
                    flowStepNodes && flowStepNodes.map((flowStepNode) => (
                        <FlowStepNode key={flowStepNode.id} flowStepNode={flowStepNode} />
                    ))
                }
            </g>
        </g>
    );
}
