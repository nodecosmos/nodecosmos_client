import DefaultFormButton from '../../../common/components/buttons/DefaultFormButton';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { Strict, UUID } from '../../../types';
import { setAlert } from '../../app/appSlice';
import Tree from '../../nodes/components/tree/Tree';
import { selectBranchNodes } from '../../nodes/nodes.selectors';
import { AppNode, TreeType } from '../../nodes/nodes.types';
import useFlowStepContext from '../../workflows/hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../workflows/hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { createFlowStep, updateFlowStepNodes } from '../flowSteps.thunks';
import { FlowStepCreationParams, FlowStepUpdatePayload } from '../flowSteps.types';
import { faSave } from '@fortawesome/pro-light-svg-icons';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import {
    Box, Dialog, DialogContent, DialogTitle, IconButton, Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* nodecosmos */
interface Props {
    open: boolean;
    onClose: () => void;
}

export default function FlowStepModal({ open, onClose }: Props) {
    const {
        branchId, nodeId, rootId,
    } = useWorkflowContext();
    const { id: flowId } = useFlowContext();
    const {
        id, nodeIds, flowIndex,
    } = useFlowStepContext();

    const [loading, setLoading] = React.useState(false);
    const [flowStepNodeIds, setFlowStepNodeIds] = useState(nodeIds);

    const handleServerError = useHandleServerErrorAlert();
    const dispatch: NodecosmosDispatch = useDispatch();
    const allNodes = useSelector(selectBranchNodes(branchId)) as Record<UUID, AppNode>;

    const onSubmit = useCallback(async () => {
        setLoading(true);

        const filteredNodeIds = flowStepNodeIds.filter((flowNodeId) => !!allNodes[flowNodeId]);

        try {
            const isNew = !!id;

            let response;
            if (isNew) {
                const updatePayload: Strict<FlowStepUpdatePayload> = {
                    nodeId,
                    branchId,
                    flowId,
                    rootId,
                    flowIndex,
                    id,
                    nodeIds: filteredNodeIds,
                };
                response = await dispatch(updateFlowStepNodes(updatePayload));
            } else {
                const insertPayload: Strict<FlowStepCreationParams> = {
                    nodeId,
                    branchId,
                    flowId,
                    rootId,
                    flowIndex,
                    nodeIds: filteredNodeIds,
                };

                response = await dispatch(createFlowStep(insertPayload));
            }

            setTimeout(() => setLoading(false), 500);
            onClose();

            if (createFlowStep.rejected.match(response) || updateFlowStepNodes.rejected.match(response)) {
                handleServerError(response.error);
            }
        } catch (error) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to add nodes',
            }));
            console.error(error);
            setTimeout(() => setLoading(false), 500);
        }
    },
    [
        flowStepNodeIds, allNodes, id, onClose, nodeId, branchId, flowId, flowIndex,
        rootId, dispatch, handleServerError,
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
            <DialogContent sx={{
                overflow: 'hidden',
                height: 1,
            }}>
                <Box mt={2} height="calc(100% - 75px)">
                    <Box
                        height={1}
                        sx={{
                            mx: -3,
                            borderBottom: 1,
                            borderColor: 'borders.4',
                        }}>
                        <Tree
                            rootId={nodeId}
                            treeBranchId={nodeId}
                            type={TreeType.Checkbox}
                            onChange={setFlowStepNodeIds}
                            value={flowStepNodeIds}
                        />
                    </Box>
                    <DefaultFormButton
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
