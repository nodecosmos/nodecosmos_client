import NodeButton from './NodeButton';
import NodeCommentsBadge from './NodeCommentsBadge';
import NodeInput from './NodeInput';
import ReorderIndicator from './ReorderIndicator';
import NodeToolbar from './toolbar/NodeToolbar';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useNodeClick from '../../../hooks/node/actions/useNodeClick';
import useNodeSave from '../../../hooks/node/actions/useNodeSave';
import useNodeBranchContext from '../../../hooks/node/useNodeBranchContext';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../nodes.constants';
import React from 'react';

const TRANSITION_STYLE = { transition: `y ${TRANSITION_ANIMATION_DURATION}ms` };

const G_STYLE = {
    opacity: 0,
    animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
};

function NodeContent() {
    const {
        isAlreadyMounted,
        isEditing,
        isRoot,
        xEnd,
        y,
    } = useNodeContext();
    const { isBranch } = useBranchContext();
    const ctx = useNodeBranchContext();
    const { height, marginTop } = useTreeContext().size;
    // we don't use this directly in input as input unmounts on blur
    // so command chain is broken

    const clickNode = useNodeClick();
    const [saveNode, blurNode] = useNodeSave();

    const animated = !isRoot && !isAlreadyMounted;

    if (!xEnd) return null;

    return (
        <g>
            <g style={animated ? G_STYLE : undefined}>
                <foreignObject
                    width="700"
                    height={height + 3}
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
                        ) : <NodeButton onClick={clickNode} />}

                        {isBranch && <NodeCommentsBadge />}

                        <NodeToolbar />
                    </div>
                </foreignObject>

            </g>

            {ctx?.isReordered && <ReorderIndicator />}
        </g>

    );
}

export default React.memo(NodeContent);
