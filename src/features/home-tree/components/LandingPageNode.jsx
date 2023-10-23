import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodePositionCalculator from '../hooks/useNodePositionCalculator';
import useNodeUnmountService from '../hooks/useNodeUnmountService';
import LandingPageNodeButton from './LandingPageNodeButton';
import NodeLink from './LandingPageNodeLink';

export default function LandingPageNode(props) {
    const {
        id,
        upperSiblingId,
        nestedLevel,
        isRoot,
        children,
    } = props;

    const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);

    useNodePositionCalculator({ id, upperSiblingId, isRoot });

    useNodeUnmountService({ id });

    return (
        <g>
            <NodeLink
                id={id}
                upperSiblingId={upperSiblingId}
                isRoot={isRoot}
                nestedLevel={nestedLevel}
            />
            <LandingPageNodeButton
                id={id}
                isRoot={isRoot}
                nestedLevel={nestedLevel}
            />
            {nodeExpanded && children}
        </g>
    );
}

LandingPageNode.defaultProps = {
    isRoot: false,
    children: null,
    upperSiblingId: null,
};

LandingPageNode.propTypes = {
    isRoot: PropTypes.bool,
    children: PropTypes.object,
    id: PropTypes.string.isRequired,
    upperSiblingId: PropTypes.string,
    nestedLevel: PropTypes.number.isRequired,
};
