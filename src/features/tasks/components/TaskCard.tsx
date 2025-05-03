import EditTitleField from '../../../common/components/EditTItleField';
import { UUID } from '../../../types';
import useTaskActions from '../hooks/useTaskActions';
import { selectTaskById } from '../tasks.selectors';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    id: UUID;
}

export default function TaskCard(props: Props) {
    const { id } = props;
    const task = useSelector(selectTaskById(id));
    const { handleTitleChange } = useTaskActions(id);

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
                className="bold" />
        </div>
    );
}
