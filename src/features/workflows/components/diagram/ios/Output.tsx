import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectIOAttribute } from '../../../../input-outputs/inputOutputs.selectors';
import {
    ANIMATION_DELAY,
    INITIAL_ANIMATION_DURATION,
    TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import useWorkflowOutputButtonBg from '../../../hooks/diagram/useWorkflowOutputButtonBg';
import {
    MARGIN_TOP,
    NODE_BUTTON_HEIGHT, OUTPUT_BUTTON_X_MARGIN,
    WORKFLOW_DIAGRAM_CONTEXT,
    WORKFLOW_DIAGRAM_OBJECTS,
} from '../../../workflows.constants';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { Output as OutputType } from '../../../diagram/types';
import usePreventDefault from '../../../../../common/hooks/usePreventDefault';
import { UUID } from '../../../../../types';
import OutputBranch from './OutputBranch';

interface OutputProps {
    output: OutputType;
}

export default function Output(props: OutputProps) {
    const { id: workflowId, context: workflowContext } = useWorkflowContext();
    const { output } = props;
    const {
        id,
        nodeId,
        position,
    } = output;
    const title = useSelector(selectIOAttribute(id, 'title'));
    const {
        x,
        xEnd,
        y,
    } = position;

    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        if (workflowContext === WORKFLOW_DIAGRAM_CONTEXT.workflowPage) {
            dispatch(setSelectedWorkflowDiagramObject({
                id,
                diagramId: id,
                workflowId,
                type: WORKFLOW_DIAGRAM_OBJECTS.output,
            }));
        }
    }, [dispatch, id, workflowContext, workflowId]);

    const {
        backgroundColor,
        outlineColor,
        color,
    } = useWorkflowOutputButtonBg({ id, nodeId: nodeId as UUID });

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
                            border: `1px solid ${outlineColor}`,
                            color,
                        }}
                    >
                        <div className="IOButtonText">
                            {title}
                        </div>
                    </button>
                </foreignObject>
            </g>
        </g>
    );
}
