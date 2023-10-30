import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { updateNode } from '../landingPageNodeSlice';
import {
    faBell,
    faBookmark, faHeart as faHeartOutline, faPenToSquare, faTrash,
} from '@fortawesome/pro-regular-svg-icons';
import {
    faBookmark as faBookmarkSolid, faHeart, faPlus, faBell as faBellSolid,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconButton,
    Checkbox,
    Box, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function LandingPageNodeToolbar(props) {
    const { id } = props;
    const { onNodeAdd, handleNodeDeletion } = useNodeTreeEvents({ id });

    const dispatch = useDispatch();
    const handleEdit = () => { dispatch(updateNode({ id, isEditing: true })); };

    const theme = useTheme();
    const {
        red, green, blue,
    } = theme.palette.toolbar;

    return (
        <Box
            sx={{
                '.Item': {
                    width: 31,
                    height: 1,
                    mx: 0.5,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'toolbar.hover' },
                },
                '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
                '.Item:nth-of-type(1)': { color: red },
                '.Item:nth-of-type(2)': { color: blue },
                '.Item:nth-of-type(3)': { color: green },
            }}
        >
            <IconButton className="Item" onClick={onNodeAdd} aria-label="Add Node">
                <FontAwesomeIcon icon={faPlus} />
            </IconButton>
            <IconButton className="Item" onClick={handleEdit} aria-label="Edit Node">
                <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
            <IconButton className="Item" onClick={() => handleNodeDeletion(id)} aria-label="Delete Node">
                <FontAwesomeIcon icon={faTrash} />
            </IconButton>
            <Checkbox
                className="Item"
                icon={<FontAwesomeIcon icon={faHeartOutline} />}
                checkedIcon={<FontAwesomeIcon icon={faHeart} />}
                inputProps={{ 'aria-label': 'Favorite' }}
            />
            <Checkbox
                className="Item"
                icon={<FontAwesomeIcon icon={faBookmark} />}
                checkedIcon={<FontAwesomeIcon icon={faBookmarkSolid} />}
                inputProps={{ 'aria-label': 'Bookmark' }}
            />
            <Checkbox
                className="Item"
                icon={<FontAwesomeIcon icon={faBell} />}
                checkedIcon={<FontAwesomeIcon icon={faBellSolid} />}
                inputProps={{ 'aria-label': 'Get Notified of Node Updates' }}
            />
        </Box>
    );
}

LandingPageNodeToolbar.propTypes = {
    id: PropTypes.string.isRequired,
};
