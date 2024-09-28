import Output from './ios/Output';
import StartToolbar from './StartToolbar';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { NodecosmosTheme } from '../../../../themes/themes.types';
import { Output as OutputType } from '../../diagram/diagram.types';
import useDiagramContext from '../../hooks/diagram/useDiagramContext';
import {
    MARGIN_LEFT,
    WORKFLOW_START_MARGIN_TOP,
    NODE_HEIGHT,
    OUTPUT_EDGE_LENGTH,
    WORKFLOW_STEP_WIDTH,
    WORKFLOW_BUTTON_HEIGHT, PATH_STYLE,
} from '../../workflows.constants';
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@mui/material';
import React from 'react';

export default function StartStep() {
    const theme: NodecosmosTheme = useTheme();
    const diagram = useDiagramContext();
    const inputsLength = diagram.initialInputs.length || 0;
    const x = OUTPUT_EDGE_LENGTH;
    const y = OUTPUT_EDGE_LENGTH;
    const yEnd = y + (OUTPUT_EDGE_LENGTH) * inputsLength + WORKFLOW_START_MARGIN_TOP;

    const [hovered, hover, leave] = useBooleanStateValue();

    if (!diagram.height) return null;

    return (
        <g onMouseEnter={hover} onMouseLeave={leave}>
            <rect
                onMouseEnter={hover}
                x={0}
                y={1}
                height={diagram.height}
                width={WORKFLOW_STEP_WIDTH - 1}
                fillOpacity={0.3}
                fill="transparent"
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
                (diagram.initialInputs.length > 0)
                && (
                    <path
                        stroke={theme.palette.workflow.default}
                        fill="transparent"
                        strokeWidth={3}
                        d={`M ${x + MARGIN_LEFT} ${y + NODE_HEIGHT} L ${x + MARGIN_LEFT} ${yEnd}`}
                        style={PATH_STYLE}
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
                        className="NodeButton background-workflow-default"
                    >
                        <FontAwesomeIcon icon={faPlay} />
                        <div className="NodeButtonText">
                            Start
                        </div>
                    </button>

                    <StartToolbar startStepHovered={hovered} />
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
