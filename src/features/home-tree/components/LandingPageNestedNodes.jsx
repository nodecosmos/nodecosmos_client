import LandingPageNestedNodesBranch from './LandingPageNestedNodesBranch';
import LandingPageNode from './LandingPageNode';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

export default function LandingPageNestedNodes(props) {
    const { currentNodeId, nestedLevel } = props;
    const nodeIds = useSelector((state) => state.landingPageNodes[currentNodeId].node_ids);
    const lastChildId = nodeIds[nodeIds.length - 1] && nodeIds[nodeIds.length - 1].$oid;

    return (
        <>
            <LandingPageNestedNodesBranch id={currentNodeId} lastChildId={lastChildId} />
            {
                nodeIds.map((nestedNodeIdObject, index) => (
                    <LandingPageNode
                        key={nestedNodeIdObject.$oid}
                        id={nestedNodeIdObject.$oid}
                        upperSiblingId={nodeIds[index - 1] && nodeIds[index - 1].$oid}
                        nestedLevel={nestedLevel}
                    >
                        <LandingPageNestedNodes currentNodeId={nestedNodeIdObject.$oid} nestedLevel={nestedLevel + 1} />
                    </LandingPageNode>
                ))

            }
        </>
    );
}

LandingPageNestedNodes.defaultProps = { nestedLevel: 1 };

LandingPageNestedNodes.propTypes = {
    currentNodeId: PropTypes.string.isRequired,
    nestedLevel: PropTypes.number,
};
