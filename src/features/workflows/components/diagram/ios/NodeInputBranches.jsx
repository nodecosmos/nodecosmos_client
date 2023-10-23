import React from 'react';
import PropTypes from 'prop-types';
import NodeInputBranch from './NodeInputBranch';

export default function NodeInputBranches({
    flowStep, node, inputIdx, currentIdx,
}) {
    return (
        flowStep.inputsByNodeId[node.id]?.map((input) => {
            // each input.id should have unique index
            if (!inputIdx.current[input.id]) {
                inputIdx.current[input.id] = currentIdx.current;
                currentIdx.current += 1;
            }

            return (
                <g key={input.id}>
                    <NodeInputBranch
                        nodeDiagramId={input.nodeDiagramId}
                        nodeId={node.id}
                        id={input.id}
                        index={inputIdx.current[input.id]}
                    />
                </g>
            );
        })
    );
}

NodeInputBranches.propTypes = {
    flowStep: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    inputIdx: PropTypes.object.isRequired,
    currentIdx: PropTypes.object.isRequired,
};
