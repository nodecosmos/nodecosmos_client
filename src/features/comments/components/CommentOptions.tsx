import SidebarListItem from '../../nodes/components/sidebar/SidebarListItem';
import { useCommentCommands } from '../hooks/useCommentContext';
import {
    faEllipsis, faEdit, faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import React, {
    MouseEvent, useCallback, useState,
} from 'react';

export default function CommentOptions() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const open = Boolean(anchorEl);
    const handleClose = useCallback(() => { setAnchorEl(null); }, []);
    const { openEditor, deleteComment } = useCommentCommands();

    const handleOpenEditor = useCallback(() => {
        openEditor();
        handleClose();
    }, [openEditor, handleClose]);

    const handleDeleteComment = useCallback(() => {
        deleteComment();
        handleClose();
    }, [deleteComment, handleClose]);

    return (
        <>
            <IconButton
                onClick={handleClick}
                color="button"
                disableRipple
                sx={{
                    width: 30,
                    height: 30,
                    border: 0,
                    borderColor: 'borders.4',
                    svg: {
                        color: 'button.contrastText',
                        fontSize: 16,
                    },
                }}
            >
                <FontAwesomeIcon icon={faEllipsis} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 4,
                        sx: {
                            p: 0,
                            m: 0.25,
                            width: 200,
                            '.MuiList-root': { p: 0 },
                            '.MuiSlider-markLabel': {
                                fontSize: 12,
                                textTransform: 'capitalize',
                            },
                        },
                    },
                }}
            >
                <SidebarListItem
                    component="button"
                    onClick={handleOpenEditor}
                    icon={(<FontAwesomeIcon icon={faEdit} />)}
                    title="Edit"
                />
                <SidebarListItem
                    component="button"
                    onClick={handleDeleteComment}
                    icon={(<FontAwesomeIcon icon={faTrash} />)}
                    title="Delete"
                />
            </Menu>
        </>
    );
}
