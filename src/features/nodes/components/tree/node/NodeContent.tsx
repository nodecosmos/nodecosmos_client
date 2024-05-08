import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import ReorderIndicator from './ReorderIndicator';
import NodeToolbar from './toolbar/NodeToolbar';
import useNodeActions from '../../../hooks/tree/node/useNodeActions';
import useNodeBranchContext from '../../../hooks/tree/node/useNodeBranchContext';
import useNodeContext from '../../../hooks/tree/node/useNodeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT, TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import React from 'react';

export default function NodeContent() {
    const {
        isAlreadyMounted,
        isEditing,
        isRoot,
        xEnd,
        y,
    } = useNodeContext();
    const { isReordered } = useNodeBranchContext();

    // we don't use this directly in input as input unmounts on blur
    // so command chain is broken
    const {
        clickNode, blurNode, saveNode,
    } = useNodeActions();

    if (!xEnd) return null;

    const initialAnimationDelay = isRoot || isAlreadyMounted ? 0 : ANIMATION_DELAY;
    const initialAnimationDuration = isRoot || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;

    return (
        <g>
            <g style={{
                opacity: 0,
                animation: `node-button-appear 
                            ${initialAnimationDuration}ms
                            ${initialAnimationDelay}ms 
                            forwards 
                            ease-in-out`,
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
                        <NodeToolbar />
                    </div>
                </foreignObject>

            </g>

            {isReordered && <ReorderIndicator />}
        </g>

    );
}
