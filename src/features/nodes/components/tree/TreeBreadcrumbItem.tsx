import { NodecosmosTheme } from '../../../../themes/type';
import { UUID } from '../../../../types';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconButton, Link, Tooltip, useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';

interface TreeBreadcrumbItemProps {
    id: UUID;
    title?: string;
    index: number;
    handleClick: (id: UUID) => void;
    handleCentering: (id: UUID) => void;
}

export default function TreeBreadcrumbItem(props: TreeBreadcrumbItemProps) {
    const {
        id, title, index, handleClick, handleCentering,
    } = props;

    const theme: NodecosmosTheme = useTheme();
    const nestedLevelColors = theme.palette.tree.backgrounds;

    const onClick = useCallback(() => {
        handleClick(id);
    }, [handleClick, id]);

    const onCentering = useCallback(() => {
        handleCentering(id);
    }, [handleCentering, id]);

    return (
        <div className="BreadcrumbItem">
            <Link onClick={onClick} variant="body2">
                {title}
            </Link>
            <Tooltip title="reveal" placement="top">
                <IconButton
                    size="small"
                    className="tools"
                    onClick={onCentering}
                    sx={{
                        '&:hover': {
                            color: nestedLevelColors[index % 3],
                        },
                    }}
                >
                    <FontAwesomeIcon icon={faCircle} />
                </IconButton>
            </Tooltip>
        </div>
    );
}
