import { NodecosmosTheme } from '../../../../../themes/type';
import { UUID } from '../../../../../types';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../../trees/trees.constants';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import { selectSelectedWorkflowObject } from '../../../selectors';
import { useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

interface InputProps {
    prevStepOutputId: UUID
}

export default function Input({ prevStepOutputId }: InputProps) {
    const theme: NodecosmosTheme = useTheme();
    const selectedWorkflowObject = useSelector(selectSelectedWorkflowObject);
    const selectedObjectId = selectedWorkflowObject?.id;
    const { prevStepOutputsById } = useWorkflowStepContext();
    const { id: nodeId, position: nodePosition } = useFlowStepNodeContext();

    const {
        selectedInputColor,
        defaultInputColor,
    } = theme.palette.workflow;

    const isSelected = selectedObjectId === nodeId;
    const color = isSelected ? selectedInputColor : defaultInputColor;

    const { position: prevOutputPosition } = prevStepOutputsById[prevStepOutputId] || {};

    // current inputs starts where previous output ends (xEnd, yEnd)
    const { xEnd: x, yEnd: y } = prevOutputPosition || {};

    // current inputs ends where current node starts (x, y)
    const { x: xEnd, y: yEnd } = nodePosition;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

    return (
        <g>
            <path
                className="InputBranch"
                stroke={color}
                fill="transparent"
                strokeWidth={1}
                d={`M ${x} ${y} L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
                    transition: `d ${transitionAnimationDuration / 2}ms`,
                }}
            />
            <circle
                className="InputBranch"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={1}
                stroke={selectedInputColor}
                fill={color}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}
