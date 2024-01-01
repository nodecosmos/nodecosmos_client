import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import NodeToolbar from './NodeToolbar';
import useNodeCommands from '../../../hooks/tree/node/useNodeCommands';
import useNodeContext from '../../../hooks/tree/node/useNodeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT, TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import { Box } from '@mui/material';
import React from 'react';

export default function NodeContent() {
    const {
        isAlreadyMounted,
        isExpanded,
        isEditing,
        isRoot,
        isSelected,
        xEnd,
        y,
    } = useNodeContext();

    // we don't use this directly in input as input unmounts on blur
    // so command chain is broken
    const {
        clickNode, blurNode, saveNode,
    } = useNodeCommands();

    if (!xEnd) return null;

    const initialAnimationDelay = isRoot || isAlreadyMounted ? 0 : ANIMATION_DELAY;
    const initialAnimationDuration = isRoot || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;

    return (
        <g style={{
            opacity: 0,
            animation: `node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms 
                        forwards ease-in-out`,
        }}>
            <foreignObject
                width="700"
                height={NODE_BUTTON_HEIGHT + 8}
                x={xEnd}
                y={y - MARGIN_TOP}
                style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
            >
                <div className="NodeButtonContainer">
                    {isEditing ? (
                        <NodeInput
                            onClick={clickNode}
                            onChange={saveNode}
                            onBlur={blurNode}
                        />
                    ) : <NodeButton />}
                    <div>
                        {isExpanded && isSelected && <Box sx={{ ml: 2 }}><NodeToolbar /></Box>}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
}
