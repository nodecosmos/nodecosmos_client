import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import { UUID } from '../../../../../types';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { setNodeScrollTo } from '../../../nodes.actions';
import { MARGIN_LEFT } from '../../../nodes.constants';
import { useTheme } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

interface NodeAncestorProps {
    ancestorId: UUID;
}

function NodeAncestor({ ancestorId }: NodeAncestorProps) {
    const dispatch = useDispatch();
    const theme: NodecosmosTheme = useTheme();
    const { treeNodes } = useTreeContext();
    const node = treeNodes[ancestorId];
    const { y: currentNodeY } = useNodeContext();
    const handleCentering = useCallback(() => {
        dispatch(setNodeScrollTo(ancestorId));
    }, [dispatch, ancestorId]);
    const { size } = useTreeContext();
    const { isSelected } = useNodeContext();
    const [hovered, hover, leave] = useBooleanStateValue();
    const { backgrounds } = theme.palette.tree;
    const nestedTreeColor = useMemo(() => {
        if (!node) return;

        const backgroundCount = backgrounds.length;
        return backgrounds[node.nestedLevel % backgroundCount];
    }, [backgrounds, node]);

    if (!node || !nestedTreeColor) {
        return null;
    }

    return (
        <circle
            className="NodeAncestorCircle"
            onMouseEnter={hover}
            onMouseLeave={leave}
            onClick={handleCentering}
            cx={node.x + size.edgeLength + MARGIN_LEFT}
            cy={currentNodeY}
            r={hovered ? size.circleRadius + 1 : (isSelected ? size.circleRadius : size.circleRadius - 1)}
            stroke={isSelected ? nestedTreeColor.fg : theme.palette.tree.default}
            strokeWidth={1}
            fill={theme.palette.tree.default}
        />
    );
}

const Ancestor = React.memo(NodeAncestor);

export default function NodeAncestorChain() {
    const { showAncestorChain } = useTreeContext();
    const { ancestorIds } = useNodeContext();

    if (!showAncestorChain) {
        return null;
    }

    return ancestorIds.map((ancestorId) => (
        <Ancestor key={ancestorId} ancestorId={ancestorId} />
    ));
}
