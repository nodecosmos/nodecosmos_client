import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import { UUID } from '../../../../../types';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { setNodeScrollTo } from '../../../nodes.actions';
import { MARGIN_LEFT } from '../../../nodes.constants';
import { useTheme } from '@mui/material';
import React, { useCallback } from 'react';
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
    const { backgrounds } = theme.palette.tree;
    const backgroundCount = backgrounds.length;
    const nestedTreeColor = backgrounds[node.nestedLevel % backgroundCount];
    const [hovered, hover, leave] = useBooleanStateValue();

    return (
        <>
            <circle
                className="NodeAncestorCircle"
                onMouseEnter={hover}
                onMouseLeave={leave}
                onClick={handleCentering}
                cx={node.x + size.edgeLength + MARGIN_LEFT}
                cy={currentNodeY}
                r={hovered ? size.ancestorRadius + 1 : (isSelected ? size.ancestorRadius : size.ancestorRadius - 1)}
                stroke={isSelected ? nestedTreeColor.fg : theme.palette.tree.default}
                strokeWidth={1}
                fill={theme.palette.tree.default}
            />
        </>
    );
}

export default function NodeAncestorChain() {
    const { showAncestorChain } = useTreeContext();
    const { ancestorIds } = useNodeContext();

    if (!showAncestorChain) {
        return null;
    }

    return ancestorIds.map((ancestorId) => (
        <NodeAncestor key={ancestorId} ancestorId={ancestorId} />
    ));
}
