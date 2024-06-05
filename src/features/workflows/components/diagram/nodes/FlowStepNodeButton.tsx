import FlowStepNodeBranch from './FlowStepNodeBranch';
import FlowStepNodeToolbar from './FlowStepNodeToolbar';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import useAppContext from '../../../../app/hooks/useAppContext';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { select } from '../../../../nodes/nodes.actions';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import {
    EDGE_LENGTH,
    MARGIN_TOP, NODE_BUTTON_HEIGHT, SHADOW_OFFSET, WORKFLOW_BUTTON_WIDTH, WORKFLOW_WIDTH_WITH_TOOLBAR,
} from '../../../constants';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useFlowStepNodeColors from '../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function FlowStepNodeButton() {
    const { insidePane, deactivateInputsAddition } = useWorkflowContext();
    const {
        id, title, position, flowStepId, inputIds,
    } = useFlowStepNodeContext();
    const { originalId, branchId } = useBranchContext();
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
    const { selectObject } = useAppContext();
    const handleClick = useCallback(() => {
        deactivateInputsAddition();

        if (insidePane) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'Cannot select workflow object in the pane for now. Please use node\'s workflow page.',
                duration: 5000,
            }));

            return;
        }

        selectObject({
            originalId,
            branchId,
            objectNodeId: id,
            objectId: id,
            objectType: ObjectType.Node,
            metadata: {
                flowStepId,
                inputIds,
            },
        });

        if (id && !insidePane) {
            dispatch(select({
                branchId,
                id,
            }));
        }
    },
    [
        branchId,
        originalId,
        deactivateInputsAddition,
        dispatch,
        flowStepId,
        inputIds,
        id,
        insidePane,
        selectObject,
    ]);

    if (!x) return null;

    return (
        <g style={{
            opacity: 0,
            animation: `workflow-node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
        }}
        >
            <FlowStepNodeBranch />
            <foreignObject
                width={WORKFLOW_WIDTH_WITH_TOOLBAR}
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
                            maxWidth: WORKFLOW_BUTTON_WIDTH,
                            color,
                        }}
                    >
                        <FontAwesomeIcon icon={faHashtag} />
                        <div className="NodeButtonText">
                            {title}
                        </div>
                    </ButtonBase>
                    <FlowStepNodeToolbar />
                </div>
            </foreignObject>
        </g>
    );
}
