import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase } from '@mui/material';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { setSelectedNode } from '../../../../nodes/nodeActions';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import useWorkflowNodeButtonBg from '../../../hooks/diagram/useWorkflowNodeButtonBg';
import {
    EDGE_LENGTH,
    MARGIN_TOP, NODE_BUTTON_HEIGHT, SHADOW_OFFSET, WORKFLOW_DIAGRAM_CONTEXT,
} from '../../../workflows.constants';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import WorkflowNodeBranch from './WorkflowNodeBranch';
import WorkflowNodeButtonToolbar from './WorkflowNodeButtonToolbar';

export default function WorkflowNodeButton() {
    const { context: workflowContext } = useWorkflowContext();
    const {
        id, title, position,
    } = useFlowStepNodeContext();

    const { x, y } = position;

    const dispatch = useDispatch();

    const initialAnimationDelay = ANIMATION_DELAY;
    const initialAnimationDuration = INITIAL_ANIMATION_DURATION;

    const handleClick = () => {
        dispatch(setSelectedWorkflowDiagramObject({
            id,
            type: 'node',
        }));

        if (workflowContext === WORKFLOW_DIAGRAM_CONTEXT.workflowPage) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(setSelectedNode(id));
        }
    };

    const {
        backgroundColor,
        outlineColor,
        color,
    } = useWorkflowNodeButtonBg({ id });

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
                        onKeyUp={(event) => event.preventDefault()}
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
