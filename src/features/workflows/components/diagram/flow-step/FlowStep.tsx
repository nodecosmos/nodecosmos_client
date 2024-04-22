import FlowToolbar from './FlowToolbar';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosTheme } from '../../../../../themes/type';
import { ObjectType } from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { TRANSITION_ANIMATION_DURATION } from '../../../../home-tree/constants';
import { FLOW_TOOLBAR_HEIGHT, WORKFLOW_STEP_WIDTH } from '../../../constants';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import FlowStepNode from '../nodes/FlowStepNode';
import { Box, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function FlowStep() {
    const { branchId } = useWorkflowContext();
    const { currentBranchId } = useBranchParams();
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        flowStepNodes, x, y, yEnd, nodeId, id, isSelected,
    } = useFlowStepContext();
    const theme: NodecosmosTheme = useTheme();
    const [hovered, hover, unhover] = useBooleanStateValue();
    const { backgroundColor: flowBg, outlineColor: flowOutlineColor } = useFlowColors();
    const { backgroundColor, outlineColor } = useFlowStepColors();
    const { inputsAdditionActive } = useWorkflowContext();

    const handleFlowStepClick = useCallback((event: React.MouseEvent<SVGGElement | HTMLElement>) => {
        if (inputsAdditionActive) return;

        const isRect = event.target instanceof SVGRectElement;
        /**
         * @description We want to have clickable area as big as Flow Step, but we need to exclude elements
         * that are clickable within Flow Step, and modals that are rendered within Flow Step.
         */
        if (!isRect) {
            if (
                event.target instanceof HTMLButtonElement
                || event.target instanceof HTMLInputElement
                || event.target instanceof HTMLParagraphElement
                || event.target instanceof HTMLLIElement
                || event.target instanceof HTMLUListElement
                || event.target instanceof HTMLHeadingElement
                || event.target instanceof HTMLSpanElement
                || event.target instanceof HTMLFieldSetElement
                || event.target instanceof SVGElement
            ) return;

            // html elements that are rendered within modals
            if (event.target instanceof HTMLElement) {
                if (
                    event.target.classList.contains('MuiDialogContent-root')
                    || event.target.classList.contains('MuiDialog-container')
                    || event.target.classList.contains('MuiInputBase-root')
                ) return;
            }
        }

        unhover();

        dispatch(selectObject({
            currentOriginalBranchId: branchId,
            currentBranchId,
            objectNodeId: nodeId,
            branchId,
            objectId: id,
            objectType: ObjectType.FlowStep,
        }));
    }, [inputsAdditionActive, branchId, currentBranchId, dispatch, id, nodeId, unhover]);

    return (
        <g
            onClick={handleFlowStepClick}
            style={{ cursor: 'pointer' }}
            onMouseEnter={hover}
            onMouseLeave={unhover}
        >
            {/*Flow Step Rect*/}
            <rect
                x={x}
                y={y}
                width={WORKFLOW_STEP_WIDTH}
                height={yEnd - y}
                fill={backgroundColor}
                strokeWidth={1}
                stroke={hovered || isSelected ? theme.palette.toolbar.default : outlineColor}
                style={{ transition: `height ${TRANSITION_ANIMATION_DURATION}ms` }}
            />
            {/*Flow Step Toolbar*/}
            <foreignObject
                x={x}
                y={y}
                width={WORKFLOW_STEP_WIDTH}
                height={FLOW_TOOLBAR_HEIGHT}
            >
                <Box
                    mx="1px"
                    display="flex"
                    alignItems="center"
                    height={1}
                    borderBottom={yEnd == y + FLOW_TOOLBAR_HEIGHT ? 0 : 1} // remove border conflict
                    borderColor={flowOutlineColor}
                    color="text.tertiary"
                    zIndex={1}
                    position="relative"
                    sx={{ backgroundColor: flowBg }}
                >
                    <FlowToolbar />
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
