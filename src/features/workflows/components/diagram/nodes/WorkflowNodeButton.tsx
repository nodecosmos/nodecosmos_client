import WorkflowNodeBranch from './WorkflowNodeBranch';
import WorkflowNodeButtonToolbar from './WorkflowNodeButtonToolbar';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import { NodecosmosDispatch } from '../../../../../store';
import { select } from '../../../../nodes/actions';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import {
    EDGE_LENGTH,
    MARGIN_TOP, NODE_BUTTON_HEIGHT, SHADOW_OFFSET, WorkflowDiagramContext,
} from '../../../constants';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useWorkflowNodeButtonBg from '../../../hooks/diagram/useWorkflowNodeButtonBg';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
/* nodecosmos */

export default function WorkflowNodeButton() {
    const { context: workflowContext } = useWorkflowContext();
    const {
        id, title, position,
    } = useFlowStepNodeContext();

    const { x, y } = position;

    const dispatch: NodecosmosDispatch = useDispatch();
    const preventDefault = usePreventDefault();
    const {
        backgroundColor,
        outlineColor,
        color,
    } = useWorkflowNodeButtonBg({ id });

    const initialAnimationDelay = ANIMATION_DELAY;
    const initialAnimationDuration = INITIAL_ANIMATION_DURATION;

    const handleClick = useCallback(() => {
        dispatch(setSelectedWorkflowDiagramObject({
            id,
            type: 'node',
        }));

        if (id && workflowContext === WorkflowDiagramContext.workflowPage) {
            // TODO
            dispatch(select({
                branchId: id,
                id, 
            }));
        }
    }, [dispatch, id, workflowContext]);

    if (!x) return null;

    return (
        <g style={{
            opacity: 0,
            animation: `workflow-node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
        }}
        >
            <WorkflowNodeBranch />
            <foreignObject
                width="700"
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
