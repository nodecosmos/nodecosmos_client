import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
/* nodecosmos */
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
    WORKFLOW_BUTTON_HEIGHT,
} from '../../../trees/trees.constants';
import {
    MARGIN_LEFT, WORKFLOW_START_MARGIN_TOP, NODE_BUTTON_HEIGHT, OUTPUT_EDGE_LENGTH, WORKFLOW_STEP_WIDTH,
} from '../../workflows.constants';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { NodecosmosTheme } from '../../../../themes/type';
import { Output as OutputType } from '../../diagram/types';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import StartToolbar from './StartToolbar';
import Output from './ios/Output';

export default function StartStep() {
    const theme: NodecosmosTheme = useTheme();
    const { id: workflowId, diagram } = useWorkflowContext();
    const inputsLength = diagram.initialInputs.length || 0;

    const x = OUTPUT_EDGE_LENGTH;
    const y = OUTPUT_EDGE_LENGTH;
    const yEnd = y + (OUTPUT_EDGE_LENGTH) * inputsLength + WORKFLOW_START_MARGIN_TOP;

    const [hovered, hover, leave] = useBooleanStateValue();
    const { wfHeight } = useWorkflowContext();

    const fillColor = theme.palette.background[5];
    const hoverColor = theme.palette.background[7];

    return (
        <g onMouseEnter={hover} onMouseLeave={leave}>
            <rect
                onMouseEnter={hover}
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
                diagram.initialInputs.length > 0
        && (
            <path
                stroke={theme.palette.workflow.default}
                fill="transparent"
                strokeWidth={3}
                d={`M ${x + MARGIN_LEFT} ${y + NODE_BUTTON_HEIGHT} L ${x + MARGIN_LEFT} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
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
                        <FontAwesomeIcon icon={faPlay} />
                        <div className="NodeButtonText">
              Start
                        </div>
                    </button>

                    <StartToolbar startStepHovered={hovered} workflowId={workflowId} />
                </div>
            </foreignObject>
            {
                diagram.initialInputs.map((output: OutputType) => (
                    <Output key={output.id} output={output} />
                ))
            }
        </g>
    );
}
