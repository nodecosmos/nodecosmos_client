import { TREE_COLORS } from '../../../../themes/themes.types';
import { UUID } from '../../../../types';
import { setNodeScrollTo } from '../../nodes.actions';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Tooltip } from '@mui/material';
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
                    color="text.tertiary"
                    className={`TreeNestedColorHover-${index % TREE_COLORS}`}
                    onClick={onClick}
                    variant="body2">
                    {title}
                </Link>
            </Tooltip>
            <Tooltip title="scroll" placement="top">
                <button
                    onClick={handleCentering}
                    className={`ScrollButton mx-1 tools TreeNestedColorHover-${index % TREE_COLORS}`}
                >
                    <FontAwesomeIcon icon={faCircle} />
                </button>
            </Tooltip>
        </div>
    );
}
