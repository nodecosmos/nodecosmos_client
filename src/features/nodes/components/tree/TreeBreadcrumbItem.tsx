import { NodecosmosTheme } from '../../../../themes/themes.types';
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
    const nestedTreeColor = nestedLevelColors[index % nestedLevelColors.length];

    const onClick = useCallback(() => {
        handleClick(id);
    }, [handleClick, id]);

    const handleCentering = useCallback(() => {
        dispatch(setNodeScrollTo(id));
    }, [dispatch, id]);

    return (
        <div className="BreadcrumbItem">
            <Tooltip title="select">
                <Link
                    onClick={onClick}
                    variant="body2"
                    sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        ml: 1,
                        fontWeight: 500,
                        fontSize: 14,
                        color: 'text.tertiary',
                        '&:hover': {
                            backgroundColor: nestedTreeColor.bg,
                            color: `${nestedTreeColor.fg} !important`,
                        },
                    }}>
                    {title}
                </Link>
            </Tooltip>
            <Tooltip title="scroll" placement="top">
                <IconButton
                    size="small"
                    className="tools"
                    onClick={handleCentering}
                    sx={{
                        mx: 1,
                        svg: {
                            color: 'borders.2',
                            fontSize: 8,
                        },
                        '&:hover': { svg: { color: nestedTreeColor.fg } },
                    }}
                >
                    <FontAwesomeIcon icon={faCircle} />
                </IconButton>
            </Tooltip>
        </div>
    );
}
