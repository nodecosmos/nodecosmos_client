import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import { setAlert } from '../../app/appSlice';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { deleteTaskSection, updateTaskSectionTitle } from '../tasks.thunks';
import {
    MouseEvent, useCallback, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';

export default function useTaskSectionActions(id: UUID) {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, nodeId } = useBranchContext();
    const handleServerError = useHandleServerErrorAlert();
    const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(null);
    const handleActionsClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setActionsAnchorEl(event.currentTarget);
    }, []);
    const handleActionsClose = useCallback(() => { setActionsAnchorEl(null); }, []);
    const [titleEditing, setTitleEditing] = useState(false);
    const handleEditTitleClick = useCallback(() => {
        setTitleEditing(true);
        handleActionsClose();
    }, [handleActionsClose]);
    const handleEditTitleClose = useCallback(() => {
        setTitleEditing(false);
    }, []);

    const handleTitleChange = useCallback(async (newTitle: string) => {
        const response = await dispatch(updateTaskSectionTitle({
            branchId,
            nodeId,
            id,
            title: newTitle,
        }));

        if (response.meta.requestStatus === 'rejected') {
            if (response.payload === undefined) {
                console.error('Error updating task section title: no payload');
            }

            const error: NodecosmosError = response.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);
        }
    }, [branchId, dispatch, handleServerError, id, nodeId]);

    const handleDelete = useCallback(async () => {
        const response = await dispatch(deleteTaskSection({
            branchId,
            nodeId,
            id,
        }));

        if (response.meta.requestStatus === 'rejected') {
            if (response.payload === undefined) {
                console.error('Error deleting task section: no payload');
            }

            const error: NodecosmosError = response.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);
        }

        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            message: 'Task section deleted',
            severity: 'warning',
        })), 250);
        handleActionsClose();
    }, [branchId, dispatch, handleActionsClose, handleServerError, id, nodeId]);

    return useMemo(() => ({
        handleTitleChange,
        handleDelete,
        actionsAnchorEl,
        titleEditing,
        handleActionsClick,
        handleActionsClose,
        handleEditTitleClick,
        handleEditTitleClose,
    }),
    [
        actionsAnchorEl,
        handleActionsClick, handleActionsClose, handleDelete,
        handleEditTitleClick, handleEditTitleClose, handleTitleChange,
        titleEditing,
    ]);
}
