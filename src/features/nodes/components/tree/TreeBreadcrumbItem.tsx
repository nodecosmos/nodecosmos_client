import { NodecosmosTheme } from '../../../../themes/type';
import { UUID } from '../../../../types';
import { setNodeScrollTo } from '../../nodes.actions';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconButton, Link, Tooltip, useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface TreeBreadcrumbItemProps {
    id: UUID;
    title?: string;
    index: number;
    handleClick: (id: UUID) => void;
}

export default function TreeBreadcrumbItem(props: TreeBreadcrumbItemProps) {
    const dispatch = useDispatch();
    const {
        id, title, index, handleClick,
    } = props;

    const theme: NodecosmosTheme = useTheme();
    const nestedLevelColors = theme.palette.tree.backgrounds;

    const onClick = useCallback(() => {
        handleClick(id);
    }, [handleClick, id]);

    const handleCentering = useCallback(() => {
        dispatch(setNodeScrollTo(id));
    }, [dispatch, id]);

    return (
        <div className="BreadcrumbItem">
            <Link onClick={onClick} variant="body2">
                {title}
            </Link>
            <Tooltip title="reveal" placement="top">
                <IconButton
                    size="small"
                    className="tools"
                    onClick={handleCentering}
                    sx={{ '&:hover': { color: nestedLevelColors[index % 3] } }}
                >
                    <FontAwesomeIcon icon={faCircle} />
                </IconButton>
            </Tooltip>
        </div>
    );
}
