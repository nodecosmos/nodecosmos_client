import React from 'react';
import { Box } from '@mui/material';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT,
    TRANSITION_ANIMATION_DURATION,
} from '../../trees.constants';
import useNodeContext, { useNodePosition } from '../../hooks/node/useNodeContext';
import useNodeCommands from '../../hooks/node/useNodeCommands';
import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import NodeToolbar from './NodeToolbar';

const MemoizedNodeButton = React.memo(NodeButton);

// we have different components for text
// because 'input' is not valid child element of 'button'
export default function NodeContent() {
    const {
        isAlreadyMounted,
        treeNodeId,
        isExpanded,
        isEditing,
        isRoot,
        isSelected,
    } = useNodeContext();

    const {
        xEnd,
        y,
    } = useNodePosition();

    // we don't use this directly in input as input unmounts on blur
    // so command chain is broken
    const {
        clickNode, blurNode, changeTitle, 
    } = useNodeCommands();

    if (!xEnd) return null;

    const initialAnimationDelay = isRoot || isAlreadyMounted ? 0 : ANIMATION_DELAY;
    const initialAnimationDuration = isRoot || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;

    return (
        <g style={{
            opacity: 0,
            animation: `node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
        }}
        >
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
                            onChange={(event) => changeTitle(event.target.value)}
                            onBlur={blurNode}
                        />
                    ) : <MemoizedNodeButton />}
                    <div>
                        {isExpanded && isSelected && <Box sx={{ ml: 2 }}><NodeToolbar treeNodeId={treeNodeId} /></Box>}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
}
