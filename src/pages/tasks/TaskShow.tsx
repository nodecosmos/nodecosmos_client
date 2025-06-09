import Alert from '../../common/components/Alert';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import Board from '../../features/tasks/components/Board';
import TaskToolbar from '../../features/tasks/components/TaskToolbar';
import { indexNodeTasks } from '../../features/tasks/tasks.thunks';
import { NodecosmosDispatch } from '../../store';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function TaskShow() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, nodeId } = useBranchContext();

    useEffect(() => {
        dispatch(indexNodeTasks({
            branchId,
            nodeId,
        }));
    }, [dispatch, branchId, nodeId]);

    return (
        <Box width={1} height={1}>
            <TaskToolbar />
            <Alert position="relative" />
            <Board />
        </Box>
    );
}
