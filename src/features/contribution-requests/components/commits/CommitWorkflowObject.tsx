import { WorkflowObjectType } from './CommitWorkflowObjects';
import { NodecosmosTheme } from '../../../../themes/themes.types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { FlowStep } from '../../../flow-steps/flowSteps.types';
import { Flow } from '../../../flows/flows.types';
import { InputOutput } from '../../../input-outputs/inputOutputs.types';
import { selectNode } from '../../../nodes/nodes.selectors';
import { AppNode } from '../../../nodes/nodes.types';
import { NODE_BUTTON_HEIGHT } from '../../../workflows/constants';
import useNavigateToNode from '../../hooks/useNavigateToNode';
import { faCodeCommit } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button, Tooltip, useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    objectType: WorkflowObjectType;
    object: InputOutput | Flow | FlowStep | AppNode // - FlowStepNode;
}

function isFlowStep(object: Props['object']): object is FlowStep {
    return 'stepIndex' in object;
}

function isAppNode(object: Props['object']): object is AppNode {
    return 'isPublic' in object;
}

function TooltipTitle() {
    return (
        <div className="TooltipTitle"> Go to object&apos;s Node</div>
    );
}

export default function CommitWorkflowObject(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { objectType, object } = props;
    const { branchId } = useBranchContext();
    const nodeId = isAppNode(object) ? object.id : object.nodeId;
    const navigateToNode = useNavigateToNode(nodeId);
    const node = useSelector(selectNode(branchId, nodeId));
    const theme: NodecosmosTheme = useTheme();

    const style = useMemo(() => {
        const { backgrounds } = theme.palette.tree;
        const backgroundCount = backgrounds.length;
        const nestedTreeColor = backgrounds[(node.ancestorIds?.length || 0) % backgroundCount];

        return {
            border: '1px solid',
            borderColor: nestedTreeColor.fg,
            backgroundColor: nestedTreeColor.bg,
            height: NODE_BUTTON_HEIGHT,
            color: nestedTreeColor.fg,
        };
    }, [node.ancestorIds?.length, theme.palette.tree]);

    return (
        <Tooltip title={<TooltipTitle />}>
            <Button
                onClick={navigateToNode}
                type="button"
                variant="outlined"
                className="NodeButton"
                style={style}
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
