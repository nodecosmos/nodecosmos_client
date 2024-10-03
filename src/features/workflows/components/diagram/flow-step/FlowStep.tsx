import Toolbar from './Toolbar';
import Loader from '../../../../../common/components/Loader';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../../../store';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import { ObjectType, UUID } from '../../../../../types';
import { executeWithConditionalLoader } from '../../../../../utils/loader';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { selectDescription } from '../../../../descriptions/descriptions.selectors';
import { getDescription } from '../../../../descriptions/descriptions.thunks';
import useFlowStepActions from '../../../../flow-steps/hooks/useFlowStepActions';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import {
    EDGE_LENGTH,
    FLOW_TOOLBAR_HEIGHT,
    HEIGHT_TRANSITION_STYLE,
    NODE_HEIGHT,
    SHADOW_OFFSET,
    WORKFLOW_STEP_WIDTH,
    WORKFLOW_WIDTH_WITH_TOOLBAR, Y_TRANSITION_STYLE,
} from '../../../workflows.constants';
import FlowStepNode from '../nodes/FlowStepNode';
import { useTheme } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

type FetchedByBranchId = Record<UUID, Set<UUID>>;

export default function FlowStep() {
    const { branchId } = useBranchContext();
    const {
        flowStepNodes, x, y, yEnd, id, nodeId, rootId, isSelected,
    } = useFlowStepContext();
    const theme: NodecosmosTheme = useTheme();
    const [hovered, hover, unhover] = useBooleanStateValue();
    const { backgroundColor, outlineColor } = useFlowStepColors();
    const { handleFlowStepClick } = useFlowStepActions({ unhover });
    const description = useSelector(selectDescription(branchId, id));

    const fetchedById = useRef<FetchedByBranchId>({});
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();

    const fetchDescription = useCallback(async () => {
        if (!description?.html && !fetchedById.current[branchId]?.has(id)) {
            try {
                const action = getDescription({
                    rootId,
                    nodeId,
                    objectId: id,
                    objectType: ObjectType.FlowStep,
                    branchId,
                });

                // @ts-expect-error It complains about the type of the action, but it's correct
                await executeWithConditionalLoader(dispatch, [action], setLoading, unsetLoading);
            } finally {
                fetchedById.current[branchId] ||= new Set();
                fetchedById.current[branchId].add(id);
            }
        }
    }, [description?.html, branchId, id, rootId, nodeId, dispatch, setLoading, unsetLoading]);
    const innerDescHTML = useMemo(() => ({ __html: description?.html as TrustedHTML }), [description]);
    const element = document.createElement('div');
    element.className = 'DescriptionHTML size-850 fs-18';
    element.style.width = `${WORKFLOW_STEP_WIDTH - 1}px`;
    element.innerHTML = description?.html;
    // Temporarily add the element to the DOM
    document.body.appendChild(element);

    // Get the offsetHeight
    const offsetHeight = (isSelected && element.offsetHeight) || 0;

    // Remove the element from the DOM
    document.body.removeChild(element);

    useEffect(() => {
        fetchDescription();
    }, [fetchDescription]);

    return (
        <g
            className="cursor-pointer"
            onClick={handleFlowStepClick}
            onMouseEnter={hover}
            onMouseLeave={unhover}
        >
            <rect
                x={x}
                y={y}
                width={WORKFLOW_STEP_WIDTH}
                height={yEnd - y + offsetHeight + NODE_HEIGHT * 2}
                fill={!!description?.html && isSelected ? theme.palette.background[6] : backgroundColor}
                strokeWidth={1}
                stroke={hovered || isSelected ? theme.palette.workflow.selectedFsBorder : outlineColor}
                style={HEIGHT_TRANSITION_STYLE}
            />
            <foreignObject
                x={x + 0.5}
                y={y + 0.5}
                width={WORKFLOW_STEP_WIDTH - 1}
                height={FLOW_TOOLBAR_HEIGHT - 1}
            >
                <Toolbar />
            </foreignObject>
            <g>
                {
                    flowStepNodes && flowStepNodes.map((flowStepNode) => (
                        <FlowStepNode key={flowStepNode.id} flowStepNode={flowStepNode} />
                    ))
                }
                <foreignObject
                    width={WORKFLOW_WIDTH_WITH_TOOLBAR}
                    height={NODE_HEIGHT + SHADOW_OFFSET + offsetHeight}
                    x={x + EDGE_LENGTH}
                    y={yEnd - y + NODE_HEIGHT * 2}
                    style={Y_TRANSITION_STYLE}
                >
                    {
                        isSelected && !loading && (
                            <div className="DescriptionHTML fs-18" dangerouslySetInnerHTML={innerDescHTML} />
                        )
                    }

                    {
                        isSelected && loading && (
                            <Loader />
                        )
                    }
                </foreignObject>
            </g>

        </g>
    );
}
