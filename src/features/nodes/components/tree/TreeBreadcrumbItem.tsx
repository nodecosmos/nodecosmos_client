import { TREE_COLORS_LEN } from '../../../../themes/themes.types';
import { UUID } from '../../../../types';
import { setNodeScrollTo } from '../../nodes.actions';
import { faCircle } from '@fortawesome/pro-regular-svg-icons';
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
                    color="texts.tertiary"
                    className={`tree-nested-color-hover-${index % TREE_COLORS_LEN}`}
                    onClick={onClick}
                    variant="body2">
                    {title}
                </Link>
            </Tooltip>
            <Tooltip title="scroll" placement="top">
                <button
                    onClick={handleCentering}
                    className={`ScrollButton ml-1 tree-nested-color-${index % TREE_COLORS_LEN}`}
                >
                    <FontAwesomeIcon icon={faCircle} />
                </button>
            </Tooltip>
        </div>
    );
}
