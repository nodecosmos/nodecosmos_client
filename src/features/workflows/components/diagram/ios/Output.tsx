import OutputBranch from './OutputBranch';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType, UUID } from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import { selectIoAttribute } from '../../../../input-outputs/inputOutputs.selectors';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../nodes/nodes.constants';
import {
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT, OUTPUT_BUTTON_X_MARGIN, WorkflowDiagramContext,
} from '../../../constants';
import { Output as OutputType } from '../../../diagram/diagram.types';
import useNodeInputsChange from '../../../hooks/diagram/flow-step-node/useNodeInputsChange';
import useOutputColors from '../../../hooks/diagram/useOutputColors';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { Checkbox } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface OutputProps {
    output: OutputType;
}

export default function Output(props: OutputProps) {
    const {
        branchId,
        context: workflowContext,
        inputsAdditionActive,
        selectedInputs,
        setSelectedInputs,
        nodeId,
    } = useWorkflowContext();
    const { output } = props;
    const {
        id,
        position,
        nodeId: outputNodeId,
    } = output;
    const title = useSelector(selectIoAttribute(branchId, id, 'title'));
    const {
        x,
        xEnd,
        y,
    } = position;
    const dispatch: NodecosmosDispatch = useDispatch();
    const isChecked = selectedInputs.has(id);
    const { currentRootNodeId } = useBranchParams();
    const handleInputsChange = useNodeInputsChange();

    const handleClick = useCallback(async () => {
        if (inputsAdditionActive) {
            let selectedInputsArray = Array.from(selectedInputs);

            if (isChecked) {
                setSelectedInputs((prev: Set<UUID>) => {
                    const newSet = new Set(prev);
                    newSet.delete(id);

                    return newSet;
                });

                selectedInputsArray = selectedInputsArray.filter((inputId) => inputId !== id);
            } else {
                setSelectedInputs((prev) => new Set(prev).add(id));
                selectedInputsArray.push(id);
            }

            await handleInputsChange(selectedInputsArray);
        } else if (workflowContext === WorkflowDiagramContext.workflowPage) {
            dispatch(selectObject({
                currentBranchId: branchId,
                currentRootNodeId,
                objectNodeId: nodeId,
                branchId,
                objectId: id,
                objectType: ObjectType.Io,
            }));
        }
    },
    [
        branchId,
        currentRootNodeId,
        dispatch,
        handleInputsChange,
        id,
        inputsAdditionActive,
        isChecked,
        nodeId,
        selectedInputs,
        setSelectedInputs,
        workflowContext,
    ]);

    const {
        backgroundColor,
        outlineColor,
        color,
        checkboxColor,
    } = useOutputColors({
        id,
        nodeId: outputNodeId as UUID,
    });

    const preventDefault = usePreventDefault();

    if (!xEnd) return null;

    return (
        <g>
            <OutputBranch output={output} />
            <g style={{
                opacity: 0,
                animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms forwards`,
            }}
            >

                <foreignObject
                    width="700"
                    height={NODE_BUTTON_HEIGHT + 3}
                    x={x + OUTPUT_BUTTON_X_MARGIN}
                    y={y - MARGIN_TOP}
                    style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
                >
                    <button
                        type="button"
                        className="WorkflowOutputButton"
                        onClick={handleClick}
                        onKeyUp={preventDefault}
                        style={{
                            background: backgroundColor,
                            border: `1px solid ${isChecked ? checkboxColor : outlineColor}`,
                            color,
                        }}
                    >
                        {
                            inputsAdditionActive
                            && <Checkbox
                                style={{ color: checkboxColor }}
                                value={id}
                                checked={isChecked} />
                        }
                        <div className="IoButtonText">
                            {title as string}
                        </div>
                    </button>
                </foreignObject>
            </g>
        </g>
    );
}
