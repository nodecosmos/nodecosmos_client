import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
/* nodecosmos */
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { useSelector } from 'react-redux';
import {
    INITIAL_ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
    WORKFLOW_BUTTON_HEIGHT,
} from '../../../trees/trees.constants';
import {
    MARGIN_LEFT, WORKFLOW_START_MARGIN_TOP, NODE_BUTTON_HEIGHT, OUTPUT_EDGE_LENGTH, WORKFLOW_STEP_WIDTH,
} from '../../workflows.constants';
import {
    selectWorkflowDiagram,
} from '../../workflows.selectors';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import StartToolbar from './StartToolbar';
import WorkflowOutputButton from './ios/WorkflowOutputButton';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faPlay} />);

export default function StartStep({ workflowId }) {
    const theme = useTheme();
    const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));
    const inputsLength = workflowDiagram.initialInputIds.length || 0;
    const x = OUTPUT_EDGE_LENGTH;
    const y = OUTPUT_EDGE_LENGTH;
    const yEnd = y + (OUTPUT_EDGE_LENGTH) * inputsLength + WORKFLOW_START_MARGIN_TOP;

    const [hovered, setHovered] = useState(false);
    const { wfHeight } = useWorkflowContext();

    const fillColor = theme.palette.background[5];
    const hoverColor = theme.palette.background[7];

    return (
        <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <rect
                onMouseEnter={() => setHovered(true)}
                x={0}
                y={1}
                height={wfHeight}
                width={WORKFLOW_STEP_WIDTH - 1}
                fill={hovered ? hoverColor : fillColor}
                fillOpacity={0.3}
                stroke="transparent"
                strokeWidth={2}
            />
            <g>
                <circle
                    cx={x - 35}
                    cy={y + WORKFLOW_BUTTON_HEIGHT / 2}
                    r={5}
                    fill={theme.palette.workflow.default}
                />
                <path
                    strokeWidth={4}
                    d={`M ${x - 30} ${y + WORKFLOW_BUTTON_HEIGHT / 2} L ${x} ${y + WORKFLOW_BUTTON_HEIGHT / 2}`}
                    stroke={theme.palette.workflow.default}
                />
            </g>
            {
                workflowDiagram.initialInputIds.length > 0
        && (
            <path
                stroke={theme.palette.workflow.default}
                fill="transparent"
                strokeWidth={3}
                d={`M ${x + MARGIN_LEFT} ${y + NODE_BUTTON_HEIGHT} L ${x + MARGIN_LEFT} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
                    transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
                }}
            />
        )
            }
            <foreignObject
                width="700"
                height={WORKFLOW_BUTTON_HEIGHT + 3}
                x={x}
                y={y}
            >
                <div className="NodeButtonContainer">
                    <button
                        type="button"
                        className="NodeButton"
                        style={{
                            backgroundColor: theme.palette.workflow.default,
                            height: WORKFLOW_BUTTON_HEIGHT,
                        }}
                    >
                        <MemoizedTagRounded />
                        <div className="NodeButtonText">
              Start
                        </div>
                    </button>

                    <StartToolbar startStepHovered={hovered} workflowId={workflowId} />
                </div>
            </foreignObject>
            {
                workflowDiagram.initialInputIds.map((id) => (
                    <WorkflowOutputButton id={id} key={id} />
                ))
            }
        </g>
    );
}

StartStep.propTypes = {
    workflowId: PropTypes.string.isRequired,
};
