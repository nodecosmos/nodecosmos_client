import { selectBranch } from '../../../../branch/branches.selectors';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useNodeColors from '../../../hooks/tree/node/useNodeColors';
import useNodeContext from '../../../hooks/tree/node/useNodeContext';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION } from '../../../nodes.constants';
import {
    maybeSelectNode, selectExpandedNodes, selectSelected,
} from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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

    if (!reorderData) return null;

    let oldParentId = reorderData.oldParentId;

    if (originalNode) {
        oldParentId = originalNode.parentId;
    }

    if (!treeNodes[oldParentId]) return null;

    if (oldParent && !expandedNodes.has(oldParentId)
        && !expandedNodes.has(oldParent?.parentId)
        && originalNode?.ancestorIds?.length) {
        // Find the first ancestor that is expanded
        const id = originalNode.ancestorIds.find((ancestorId) => expandedNodes.has(ancestorId));
        if (id) {
            oldParentId = id;
        }
    }

    if (!treeNodes[oldParentId]) return null;

    const { x, y } = treeNodes[oldParentId];
    const { x: xEnd, y: yEnd } = treeNodes[id];
    let midY = yEnd;
    let midX = x;

    if (xEnd < x) {
        midY = y;
        midX = xEnd;
    }

    const transitionAnimationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

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
                style={{
                    opacity: 0,
                    animation: `node-circle-appear ${INITIAL_ANIMATION_DURATION / 2}ms forwards`,
                    transition: `cx ${transitionAnimationDuration}ms, cy ${transitionAnimationDuration}ms`,
                }}
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
                        style={{
                            opacity: 0,
                            animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
                            transition: `d ${transitionAnimationDuration}ms`,
                        }} />
                </marker>
            </defs>
            <path
                markerEnd="url(#head)"
                className="InputLink"
                stroke={color}
                fill="transparent"
                strokeWidth={2}
                d={`M ${x} ${y}
                    L ${midX} ${midY}
                    L ${xEnd} ${yEnd}`}
                style={{
                    opacity: 0,
                    animation: `appear ${INITIAL_ANIMATION_DURATION * 5}ms forwards`,
                    transition: `d ${transitionAnimationDuration / 2}ms`,
                }}
            />
        </g>
    );
}
