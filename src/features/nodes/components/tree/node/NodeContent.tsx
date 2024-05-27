import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import ReorderIndicator from './ReorderIndicator';
import NodeToolbar from './toolbar/NodeToolbar';
import useNodeActions from '../../../hooks/node/useNodeActions';
import useNodeBranchContext from '../../../hooks/node/useNodeBranchContext';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import React, { useMemo } from 'react';

const TRANSITION_STYLE = { transition: `y ${TRANSITION_ANIMATION_DURATION}ms` };

export default function NodeContent() {
    const {
        isAlreadyMounted,
        isEditing,
        isRoot,
        xEnd,
        y,
    } = useNodeContext();
    const { isReordered } = useNodeBranchContext();
    const { height, marginTop } = useTreeContext().size;
    // we don't use this directly in input as input unmounts on blur
    // so command chain is broken
    const {
        clickNode, blurNode, saveNode,
    } = useNodeActions();

    const gStyle = useMemo(() => {
        const initialAnimationDelay = isRoot || isAlreadyMounted ? 0 : ANIMATION_DELAY;
        const initialAnimationDuration = isRoot || isAlreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;

        return {
            opacity: 0,
            animation: `node-button-appear 
                            ${initialAnimationDuration}ms
                            ${initialAnimationDelay}ms 
                            forwards`,
        };
    }, [isAlreadyMounted, isRoot]);

    if (!xEnd) return null;

    return (
        <g>
            <g style={gStyle}>
                <foreignObject
                    width="700"
                    height={height + 8}
                    x={xEnd}
                    y={y - marginTop}
                    style={TRANSITION_STYLE}
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
