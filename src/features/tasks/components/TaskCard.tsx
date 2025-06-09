import EditTitleField from '../../../common/components/EditTItleField';
import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import useTaskActions from '../hooks/useTaskActions';
import { selectTaskById } from '../tasks.selectors';
import { updateTaskState } from '../tasksSlice';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    id: UUID;
}

export default function TaskCard(props: Props) {
    const { id } = props;
    const task = useSelector(selectTaskById(id));
    const { handleTitleChange } = useTaskActions(id);
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleClose = useCallback(() => {
        dispatch(updateTaskState({
            id,
            isNew: false,
        }));
    }, [dispatch, id]);

    return (
        <div>
            <EditTitleField
                placeholderComp={(
                    <Typography
                        component="div"
                        variant="subtitle1"
                        className="text-tertiary bold"
                    >
                        <FontAwesomeIcon icon={faPen} size="xs" />
                        <span className="ml-1">Add Title</span>
                    </Typography>
                )}
                title={task.title}
                onChange={handleTitleChange}
                editing={task.isNew}
                onClose={handleClose}
                className="bold" />
        </div>
    );
}
