import React from 'react';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
    INITIAL_ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import { OUTPUT_VERTICAL_EDGE_LENGTH } from '../../../workflows.constants';
import { selectSelectedWorkflowDiagramObject, selectWorkflowDiagramPosition } from '../../../workflows.selectors';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeInputBranch({
    id,
    nodeDiagramId,
    index: _index,
}) {
    const theme = useTheme();
    const { diagramId: selectedDiagramId } = useSelector(selectSelectedWorkflowDiagramObject);

    const { x, y: yStart } = useSelector(selectWorkflowDiagramPosition(id)); // output of prev step
    const { x: xEnd, y: yEnd } = useSelector(selectWorkflowDiagramPosition(nodeDiagramId));
    const { selectedInputColor, defaultInputColor } = theme.palette.workflow;

    const xStart = x + OUTPUT_VERTICAL_EDGE_LENGTH;
    const isSelected = selectedDiagramId === nodeDiagramId;
    const color = isSelected ? selectedInputColor : defaultInputColor;

    if (!x) return null;

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

    return (
        <g>
            <path
                className="input-branch"
                stroke={color}
                fill="transparent"
                strokeWidth={1}
                d={`M ${xStart} ${yStart} L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
                    transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
                }}
            />
            <circle
                cx={xStart}
                cy={yStart}
                r={5}
                strokeWidth={1}
                stroke={theme.palette.secondary.main}
                fill={defaultInputColor}
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
            />
        </g>
    );
}

NodeInputBranch.propTypes = {
    id: PropTypes.string.isRequired,
    nodeDiagramId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};
