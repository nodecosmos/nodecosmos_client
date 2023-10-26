import React, { useCallback, useState } from 'react';
import {
    Box, DialogContent, Typography, Dialog, DialogTitle, IconButton,
} from '@mui/material';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { faSave } from '@fortawesome/pro-light-svg-icons';
import { setAlert } from '../../app/appSlice';
import {
    createFlowStep, FlowStepCreationParams, updateFlowStepNodes,
} from '../flowSteps.thunks';
/* nodecosmos */
import Tree from '../../trees/components/Tree';
import { TREES_TYPES } from '../../trees/trees.constants';
import { selectNodesById } from '../../nodes/nodes.selectors';
import DefaultModalFormButton from '../../../common/components/buttons/DefaultModalFormButton';
import useWorkflowStepContext from '../../workflows/hooks/diagram/workflow-steps/useWorkflowStepContext';
import { FlowStepUpdatePayload } from '../types';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import useFlowContext from '../../workflows/hooks/diagram/flows/useFlowContext';
import useFlowStepContext from '../../workflows/hooks/diagram/flow-step/useFlowStepContext';
import { NodecosmosDispatch } from '../../../store';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function FlowStepModal({ open, onClose }: Props) {
    const { id: workflowId, nodeId } = useWorkflowContext();
    const { wfStepIndex: workflowStepIndex } = useWorkflowStepContext();
    const { id: flowId, startIndex: flowStartIndex } = useFlowContext();
    const {
        id, nodeIds, prevFlowStepId, nextFlowStepId,
    } = useFlowStepContext();
    const [loading, setLoading] = React.useState(false);
    const allNodes = useSelector(selectNodesById);
    const dispatch: NodecosmosDispatch = useDispatch();
    const [flowStepNodeIds, setFlowStepNodeIds] = useState(nodeIds);

    const onSubmit = useCallback(async () => {
        setLoading(true);

        const filteredNodeIds = flowStepNodeIds.filter((flowNodeId) => !!allNodes[flowNodeId]);

        const payload = {
            nodeId,
            workflowId,
            flowId,
            flowIndex: workflowStepIndex - flowStartIndex,
            nodeIds: filteredNodeIds,
        };

        try {
            const isNew = !!id;

            if (isNew) {
                const updatePayload = payload as FlowStepUpdatePayload;
                updatePayload.id = id;
                await dispatch(updateFlowStepNodes(payload as FlowStepUpdatePayload));
            } else {
                const insertPayload = payload as FlowStepCreationParams;
                insertPayload.prevFlowStepId = prevFlowStepId;
                insertPayload.nextFlowStepId = nextFlowStepId;

                await dispatch(createFlowStep(insertPayload));
            }

            setTimeout(() => setLoading(false), 500);
            onClose();
        } catch (error) {
            dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Failed to add node' }));
            console.error(error);
            setTimeout(() => setLoading(false), 500);
        }
    },
    [
        allNodes, dispatch, flowId, flowStartIndex, flowStepNodeIds, id, nodeId,
        onClose, workflowId, workflowStepIndex, prevFlowStepId, nextFlowStepId,
    ],
    );

    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 8,
                sx: {
                    p: 0,
                    height: '100%',
                },
            }}
        >
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}>
                        Add Flow Step Nodes
                    </Typography>
                </Box>
                <IconButton
                    disableRipple
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}>
                    <CloseOutlined sx={{ color: 'background.3' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ overflow: 'hidden', height: 1 }}>
                <Box mt={2} height="calc(100% - 75px)">
                    <Box height={1} sx={{ mx: -3, borderBottom: 1, borderColor: 'borders.4' }}>
                        <Tree
                            rootNodeId={nodeId}
                            type={TREES_TYPES.checkbox}
                            onChange={setFlowStepNodeIds}
                            value={flowStepNodeIds}
                        />
                    </Box>
                    <DefaultModalFormButton
                        loading={loading}
                        startIcon={faSave}
                        title="Save"
                        onSubmit={onSubmit}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
