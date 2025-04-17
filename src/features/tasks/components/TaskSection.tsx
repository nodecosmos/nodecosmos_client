import TaskList from './TaskList';
import EditTitleField from '../../../common/components/EditTItleField';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError, UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectSectionTasks } from '../tasks.selectors';
import { updateTaskSectionTitle } from '../tasks.thunks';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { faEllipsis, faAdd } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Draggable, DraggableProvided, DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    id: UUID;
    title: string;
    index: number;
}

export default function TaskSection(props: Props) {
    const {
        index, id, title,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const { branchId, nodeId } = useBranchContext();
    const handleServerError = useHandleServerErrorAlert();
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
    const tasks = useSelector(selectSectionTasks(id));

    return (
        <Draggable draggableId={id} index={index}>
            {(provided: DraggableProvided, _snapshot: DraggableStateSnapshot) => (
                <div
                    ref={provided.innerRef}
                    className="w-320 min-w-300 p-1 h-100 display-flex flex-column"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div className="px-1 h-32 display-flex align-center justify-space-between">
                        <div className="display-flex align-center justify-space-between">
                            <EditTitleField
                                className="max-w-200 text-ellipsis overflow-hidden bold"
                                title={title}
                                color="texts.secondary"
                                variant="body2"
                                onChange={handleTitleChange}
                                placeholderComp={(
                                    <Typography
                                        component="div"
                                        variant="subtitle1"
                                        className="text-tertiary bold"
                                    >
                                        <FontAwesomeIcon icon={faPen} size="xs" />
                                        <span className="ml-1">Edit Title</span>
                                    </Typography>
                                )}
                            />
                            <div className="mx-1">
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className="text-tertiary bold"
                                >
                                    {tasks.length}
                                </Typography>
                            </div>
                        </div>
                        <div className="display-flex align-center justify-space-between">
                            <IconButton
                                size="small"
                                className="default-list-color h-32"
                                disableRipple
                            >
                                <FontAwesomeIcon icon={faAdd} />
                            </IconButton>
                            <IconButton
                                size="small"
                                className="default-list-color h-32"
                                disableRipple
                            >
                                <FontAwesomeIcon icon={faEllipsis} />
                            </IconButton>
                        </div>
                    </div>

                    <div className="background-5 flex-1 overflow-auto mt-1">
                        <TaskList sectionId={title} />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
