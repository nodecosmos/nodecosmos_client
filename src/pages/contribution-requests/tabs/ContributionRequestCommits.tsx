import { selectBranch } from '../../../features/branch/branches.selectors';
import { Branch } from '../../../features/branch/branches.types';
import useBranchContext from '../../../features/branch/hooks/useBranchContext';
import CommitNodes from '../../../features/contribution-requests/components/commits/CommitNodes';
import CommitWorkflowObjectsWrapper
, { WorkflowObjectType } from '../../../features/contribution-requests/components/commits/CommitWorkflowObjects';
import { indexWorkflowBranchData } from '../../../features/workflows/worfklow.thunks';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { Box } from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ContributionRequestCommits() {
    const dispatch: NodecosmosDispatch = useDispatch();

    const {
        branchId, nodeId, originalId,
    } = useBranchContext();

    const branch = useSelector(selectBranch(branchId));

    const {
        createdNodes, restoredNodes, editedTitleNodes, deletedNodes, editedDescriptionNodes,
        reorderedNodes: reorderedNodesData, createdInitialInputs, deletedInitialInputs,
        restoredFlows, createdFlows, deletedFlows, editedTitleFlows, editedDescriptionFlows,
        restoredFlowSteps, createdFlowSteps, deletedFlowSteps, editedDescriptionFlowSteps,
        createdFlowStepInputsByNode, createdFlowStepOutputsByNode,
        createdIos, deletedIos, editedTitleIos, editedDescriptionIos,
    } = useMemo(() => {
        return branch ?? {} as Branch;
    }, [branch]);

    const createdWfInitialInputs = useMemo(() => {
        return createdInitialInputs ? new Set(createdInitialInputs) : null;
    }, [createdInitialInputs]);

    const deletedWfInitialInputs = useMemo(() => {
        return deletedInitialInputs ? new Set(deletedInitialInputs) : null;
    }, [deletedInitialInputs]);

    const reorderedNodes = useMemo(() => {
        return new Set(reorderedNodesData?.map((data) => data.id));
    }, [reorderedNodesData]);

    const createdFlowStepInputs: Set<UUID> = useMemo(() => {
        if (!createdFlowStepInputsByNode) {
            return new Set<UUID>();
        }

        return Object.values(createdFlowStepInputsByNode).reduce((acc: Set<UUID>, byNode: Record<UUID, Set<UUID>>) => {
            Object.values(byNode).forEach((ids) => {
                ids.forEach((id) => {
                    acc.add(id);
                });
            });

            return acc;
        }, new Set<UUID>());
    }, [createdFlowStepInputsByNode]);

    const createdFlowStepOutputs: Set<UUID> = useMemo(() => {
        if (!createdFlowStepOutputsByNode) {
            return new Set<UUID>();
        }

        return Object.values(createdFlowStepOutputsByNode).reduce((acc: Set<UUID>, byNode: Record<UUID, Set<UUID>>) => {
            Object.values(byNode).forEach((ids) => {
                ids.forEach((id) => {
                    acc.add(id);
                });
            });

            return acc;
        }, new Set<UUID>());
    }, [createdFlowStepOutputsByNode]);

    const filterOutCreated = useCallback((createdIds: Set<UUID>, editedIds: Set<UUID>) => {
        return new Set(
            Array.from(editedIds || []).filter((id) => {
                return !createdIds.has(id);
            }),
        );
    }, []);

    useEffect(() => {
        dispatch(indexWorkflowBranchData({
            branchId,
            nodeId,
            rootId: originalId,
        }));
    }, [dispatch, branchId, nodeId, originalId]);

    return (
        <Box sx={{
            height: 1,
            overflow: 'auto',
            '.NodeButton': {
                ml: 1,
                mt: 2,
                borderRadius: 1,
                px: 2,
                py: 2,
            },
            '.NodeButtonText': { ml: 2 },
            '.MuiChip-root': { ml: 1 },
            '.Date': {
                ml: 1,
                fontWeight: 'bold',
                fontSize: 14,
            },
        }}>
            <CommitNodes ids={createdNodes} title="Created Nodes" showBlank />
            <CommitNodes ids={restoredNodes} title="Restored Nodes" />
            <CommitNodes ids={filterOutCreated(createdNodes, editedTitleNodes)} title="Edited Title Nodes" />
            <CommitNodes
                ids={filterOutCreated(createdNodes, editedDescriptionNodes)}
                title="Edited Description Nodes" />
            <CommitNodes ids={deletedNodes} title="Deleted Nodes" showBlank />
            <CommitNodes ids={reorderedNodes} title="Reordered Nodes" />
            <CommitWorkflowObjectsWrapper
                title="Created Workflow Initial Inputs"
                ids={createdWfInitialInputs}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Deleted Workflow Initial Inputs"
                ids={deletedWfInitialInputs}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Restored Flows"
                ids={restoredFlows}
                objectType={WorkflowObjectType.Flow} />
            <CommitWorkflowObjectsWrapper
                title="Created Flows"
                ids={createdFlows}
                objectType={WorkflowObjectType.Flow} />
            <CommitWorkflowObjectsWrapper
                title="Deleted Flows"
                ids={deletedFlows}
                objectType={WorkflowObjectType.Flow} />
            <CommitWorkflowObjectsWrapper
                title="Edited Title Flows"
                ids={filterOutCreated(createdFlows, editedTitleFlows)}
                objectType={WorkflowObjectType.Flow} />
            <CommitWorkflowObjectsWrapper
                title="Edited Description Flows"
                ids={filterOutCreated(createdFlows, editedDescriptionFlows)}
                objectType={WorkflowObjectType.Flow} />
            <CommitWorkflowObjectsWrapper
                title="Restored Flow Steps"
                ids={restoredFlowSteps}
                objectType={WorkflowObjectType.FlowStep} />
            <CommitWorkflowObjectsWrapper
                title="Created Flow Steps"
                ids={createdFlowSteps}
                objectType={WorkflowObjectType.FlowStep} />
            <CommitWorkflowObjectsWrapper
                title="Deleted Flow Steps"
                ids={deletedFlowSteps}
                objectType={WorkflowObjectType.FlowStep} />
            <CommitWorkflowObjectsWrapper
                title="Edited Description Flow Steps"
                ids={filterOutCreated(createdFlowSteps, editedDescriptionFlowSteps)}
                objectType={WorkflowObjectType.FlowStep} />
            <CommitWorkflowObjectsWrapper
                title="Created Flow Step Inputs"
                ids={createdFlowStepInputs}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Created Flow Step Outputs"
                ids={createdFlowStepOutputs}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Created Input Outputs"
                ids={createdIos}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Deleted Input Outputs"
                ids={deletedIos}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Edited Title Input Outputs"
                ids={filterOutCreated(createdIos, editedTitleIos)}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Edited Description Input Outputs"
                ids={editedDescriptionIos}
                objectType={WorkflowObjectType.InputOutput} />
        </Box>
    );
}
