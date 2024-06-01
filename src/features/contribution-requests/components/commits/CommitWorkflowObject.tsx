import { WorkflowObjectType } from './CommitWorkflowObjects';
import { FlowStep } from '../../../flow-steps/flowSteps.types';
import { Flow } from '../../../flows/flows.types';
import { InputOutput } from '../../../input-outputs/inputOutputs.types';
import { AppNode } from '../../../nodes/nodes.types';
import { NODE_BUTTON_HEIGHT } from '../../../workflows/constants';
import { faCodeCommit } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@mui/material';
import React from 'react';

interface Props {
    objectType: WorkflowObjectType;
    object: InputOutput | Flow | FlowStep | AppNode // - FlowStepNode;
}

function isFlowStep(object: Props['object']): object is FlowStep {
    return 'inputIdsByNodeId' in object;
}

export default function CommitWorkflowObject(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { objectType, object } = props;

    return (
        <Tooltip title="Go to Object">
            <Button
                type="button"
                variant="outlined"
                className="NodeButton"
                style={{ height: NODE_BUTTON_HEIGHT }}
            >
                <FontAwesomeIcon icon={faCodeCommit} />
                <div className="NodeButtonText">
                    {
                        isFlowStep(object) ? `Flow Step ${object.stepIndex}` : object.title
                    }
                </div>
            </Button>
        </Tooltip>
    );
}
