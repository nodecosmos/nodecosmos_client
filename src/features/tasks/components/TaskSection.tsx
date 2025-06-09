import TaskList from './TaskList';
import ConfirmationModal, { ConfirmType } from '../../../common/components/ConfirmationModal';
import EditTitleField from '../../../common/components/EditTItleField';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { UUID } from '../../../types';
import SidebarListItem from '../../nodes/components/sidebar/SidebarListItem';
import useTaskSectionActions from '../hooks/useTaskSectionActions';
import useTaskSectionContext from '../hooks/useTaskSectionContext';
import {
    faEdit,
    faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { faEllipsis, faAdd } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Draggable, DraggableProvided, DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import React, { useMemo } from 'react';

interface Props {
    id: UUID;
    title: string;
    index: number;
}

const MENU_SLOT_PROPS = {
    paper: {
        elevation: 4,
        sx: {
            p: 0,
            m: 0.25,
            width: 350,
            '.MuiList-root': { p: 0 },
            '.MuiListItemButton-root': { minHeight: 62 },
            '.MuiSlider-markLabel': {
                fontSize: 12,
                textTransform: 'capitalize',
            },
        },
    },
};

function TaskSection(props: Props) {
    const {
        index, id, title,
    } = props;
    const {
        handleTitleChange,
        handleDelete,
        handleEditTitleClose,
        actionsAnchorEl,
        titleEditing,
        handleActionsClose,
        handleActionsClick,
        handleEditTitleClick,
    } = useTaskSectionActions(id);
    const { tasksBySection } = useTaskSectionContext();
    const tasks = useMemo(() => tasksBySection[id] || [], [tasksBySection, id]);
    const [delModOpen, openDelMod, closeDelMod] = useBooleanStateValue();

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
                                onClose={handleEditTitleClose}
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
                                editing={titleEditing}
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
                            <Tooltip title="Add Task" placement="top">
                                <IconButton
                                    size="small"
                                    className="default-list-color h-32"
                                    disableRipple
                                >
                                    <FontAwesomeIcon icon={faAdd} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="More Actions" placement="top">
                                <IconButton
                                    size="small"
                                    className="default-list-color h-32"
                                    disableRipple
                                    onClick={handleActionsClick}
                                >
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={actionsAnchorEl}
                                open={Boolean(actionsAnchorEl)}
                                onClose={handleActionsClose}
                                slotProps={MENU_SLOT_PROPS}
                            >
                                <SidebarListItem
                                    component="button"
                                    icon={<FontAwesomeIcon icon={faEdit} />}
                                    onClick={handleEditTitleClick}
                                    title="Rename Section"
                                />
                                <SidebarListItem
                                    component="button"
                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                    onClick={openDelMod}
                                    title="Delete Section"
                                />
                            </Menu>
                        </div>
                    </div>

                    <div className="background-5 flex-1 overflow-auto mt-1">
                        <TaskList sectionId={id} />
                    </div>

                    <ConfirmationModal
                        text={`Are you sure you want to delete the section "${title}"?`}
                        confirmText="Delete"
                        confirmType={ConfirmType.Deletion}
                        open={delModOpen}
                        onClose={closeDelMod}
                        onConfirm={handleDelete}
                    />
                </div>
            )}
        </Draggable>
    );
}

export default React.memo(TaskSection);
