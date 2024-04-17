import WorkflowNodeBranch from './WorkflowNodeBranch';
import WorkflowNodeButtonToolbar from './WorkflowNodeButtonToolbar';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { select } from '../../../../nodes/nodes.actions';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import {
    EDGE_LENGTH,
    MARGIN_TOP, NODE_BUTTON_HEIGHT, SHADOW_OFFSET, WORKFLOW_BUTTON_WIDTH, WorkflowDiagramContext,
} from '../../../constants';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useFlowStepNodeColors from '../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function WorkflowNodeButton() {
    const {
        branchId, context: workflowContext, nodeId, deactivateInputsAddition,
    } = useWorkflowContext();
    const {
        id, title, position, flowStepId,
    } = useFlowStepNodeContext();

    const { x, y } = position;
    const dispatch: NodecosmosDispatch = useDispatch();
    const preventDefault = usePreventDefault();
    const {
        backgroundColor,
        outlineColor,
        color,
    } = useFlowStepNodeColors();

    const initialAnimationDelay = ANIMATION_DELAY;
    const initialAnimationDuration = INITIAL_ANIMATION_DURATION;
    const { currentBranchId } = useBranchParams();

    const handleClick = useCallback(() => {
        deactivateInputsAddition();

        dispatch(selectObject({
            currentOriginalBranchId: branchId,
            currentBranchId,
            objectNodeId: nodeId,
            branchId,
            objectId: id,
            objectType: ObjectType.Node,
            metadata: {
                flowStepId,
                currentBranchId: branchId,
            },
        }));

        if (id && workflowContext === WorkflowDiagramContext.workflowPage) {
            dispatch(select({
                currentBranchId: branchId,
                branchId,
                id,
            }));
        }
    },
    [
        branchId,
        currentBranchId,
        deactivateInputsAddition,
        dispatch,
        flowStepId,
        id,
        nodeId,
        workflowContext,
    ]);

    if (!x) return null;

    return (
        <g style={{
            opacity: 0,
            animation: `workflow-node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
        }}
        >
            <WorkflowNodeBranch />
            <foreignObject
                width={WORKFLOW_BUTTON_WIDTH}
                height={NODE_BUTTON_HEIGHT + SHADOW_OFFSET}
                x={x + EDGE_LENGTH}
                y={y - MARGIN_TOP}
                style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
            >
                <div className="NodeButtonContainer">
                    <ButtonBase
                        type="button"
                        className="NodeButton"
                        onKeyUp={preventDefault}
                        onClick={handleClick}
                        style={{
                            border: '1px solid',
                            borderColor: outlineColor,
                            backgroundColor,
                            height: NODE_BUTTON_HEIGHT,
                            color,
                        }}
                    >
                        <FontAwesomeIcon icon={faHashtag} />
                        <div className="NodeButtonText">
                            {title}
                        </div>
                    </ButtonBase>
                    <WorkflowNodeButtonToolbar />
                </div>
            </foreignObject>
        </g>
    );
}
