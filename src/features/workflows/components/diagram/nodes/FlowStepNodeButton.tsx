import FlowStepNodeBranch from './FlowStepNodeBranch';
import FlowStepNodeToolbar from './FlowStepNodeToolbar';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import { setAlert } from '../../../../app/appSlice';
import { useSelectObject } from '../../../../app/hooks/useSelectObject';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { select } from '../../../../nodes/nodes.actions';
import useFlowStepNodeContext from '../../../hooks/diagram/flow-step-node/useFlowStepNodeContext';
import useFlowStepNodeColors from '../../../hooks/diagram/useFlowStepNodeColors';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import {
    BUTTON_APPEAR_STYLE,
    EDGE_LENGTH,
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT,
    SHADOW_OFFSET,
    WORKFLOW_BUTTON_WIDTH,
    WORKFLOW_WIDTH_WITH_TOOLBAR,
    Y_TRANSITION_STYLE,
} from '../../../workflows.constants';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonBase } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
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
    const selectObject = useSelectObject();
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
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

    const style = useMemo(() => ({
        border: '1px solid',
        borderColor: outlineColor,
        backgroundColor,
        height: NODE_BUTTON_HEIGHT,
        maxWidth: WORKFLOW_BUTTON_WIDTH,
        color,
    }), [backgroundColor, color, outlineColor]);

    if (!x) return null;

    return (
        <g style={BUTTON_APPEAR_STYLE}>
            <FlowStepNodeBranch />
            <foreignObject
                width={WORKFLOW_WIDTH_WITH_TOOLBAR}
                height={NODE_BUTTON_HEIGHT + SHADOW_OFFSET}
                x={x + EDGE_LENGTH}
                y={y - MARGIN_TOP}
                style={Y_TRANSITION_STYLE}
            >
                <div className="NodeButtonContainer">
                    <ButtonBase
                        type="button"
                        className="NodeButton"
                        onKeyUp={preventDefault}
                        onClick={handleClick}
                        style={style}
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
