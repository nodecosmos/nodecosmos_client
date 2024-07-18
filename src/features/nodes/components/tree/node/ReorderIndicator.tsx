import { selectBranch } from '../../../../branch/branches.selectors';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useNodeColors from '../../../hooks/node/useNodeColors';
import useNodeContext from '../../../hooks/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../nodes.constants';
import {
    maybeSelectNode, selectExpandedNodes, selectSelected,
} from '../../../nodes.selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

const PATH_STYLE = {
    opacity: 0,
    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
    transition: `d ${transitionAnimationDuration}ms`,
};

const CIRCLE_STYLE = {
    opacity: 0,
    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
};

export default function ReorderIndicator() {
    const { originalId, branchId } = useBranchContext();
    const { id } = useNodeContext();
    const { treeNodes } = useTreeContext();
    const branch = useSelector(selectBranch(branchId));
    const { reorderedNodes } = branch;
    const { outlineColor, nestedTreeColor } = useNodeColors();
    const reorderData = reorderedNodes.find((data) => data.id === id);
    const originalNode = useSelector(maybeSelectNode(originalId, id));
    const expandedNodes = useSelector(selectExpandedNodes);
    const oldParent = useSelector(maybeSelectNode(branchId, reorderData?.oldParentId));
    const selected = useSelector(selectSelected);
    const color = selected?.id === id ? nestedTreeColor : outlineColor;

    let oldParentId = reorderData?.oldParentId;

    if (originalNode) {
        oldParentId = originalNode.parentId;
    }

    if (reorderData && oldParent && oldParentId && !expandedNodes.has(oldParentId)
        && !expandedNodes.has(oldParent?.parentId)
        && originalNode?.ancestorIds?.length) {
        // Find the first ancestor that is expanded
        const id = originalNode.ancestorIds.find((ancestorId) => expandedNodes.has(ancestorId));
        if (id) {
            oldParentId = id;
        }
    }
    const { x, y } = useMemo(() => {
        if (!oldParentId) return {
            x: 0,
            y: 0,
        };

        const { x, y } = treeNodes[oldParentId];

        return {
            x,
            y,
        };
    }, [oldParentId, treeNodes]);

    const pathD = useMemo(() => {
        if (!oldParentId) return '';

        const { x: xEnd, y: yEnd } = treeNodes[id];
        let midY = yEnd;
        let midX = x;

        if (xEnd < x) {
            midY = y;
            midX = xEnd;
        }

        return `M ${x} ${y} L ${midX} ${midY} L ${xEnd} ${yEnd}`;
    }, [id, oldParentId, treeNodes, x, y]);

    if (!reorderData) return null;

    return (
        <g>
            <circle
                className="InputLink"
                cx={x}
                cy={y}
                r={5}
                strokeWidth={1}
                stroke={color}
                fill={outlineColor}
                style={CIRCLE_STYLE}
            />
            <defs>
                <marker
                    id="head"
                    orient="auto"
                    markerWidth="5"
                    markerHeight="5"
                    refX="1"
                    refY="2.5"
                    fill={color}
                    stroke={color}
                >
                    <path
                        d="M0,0 V5 L2.5,2.5 Z"
                        fill={color}
                        style={PATH_STYLE} />
                </marker>
            </defs>
            <path
                markerEnd="url(#head)"
                className="InputLink"
                stroke={color}
                fill="none"
                strokeWidth={2}
                d={pathD}
                style={PATH_STYLE}
            />
        </g>
    );
}
