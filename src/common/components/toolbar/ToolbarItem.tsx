import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import {
    useMatch, useNavigate, useResolvedPath,
} from 'react-router-dom';

interface Props {
    title: string;
    color: string;
    icon: IconProp;
    titleAsTooltip?: boolean;
    active?: boolean;
    onClick?: (value?: string | number) => void;
    onClickValue?: string | number;
    flipX?: boolean;
    to?: string;
}

export default function ToolbarItem(props: Props) {
    const {
        title,
        icon,
        color,
        onClick,
        onClickValue,
        active,
        flipX,
        titleAsTooltip = true,
        to = '',
    } = props;
    const path = useResolvedPath(to);
    const isPathActive = useMatch(path.pathname);
    const isActive = to ? isPathActive : active;
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        if (to) {
            navigate(to);
        }
        onClick && onClick(onClickValue);
    }, [navigate, onClick, onClickValue, to]);

    return (
        <Tooltip title={titleAsTooltip && title} placement="top">
            <Box
                className={`ButtonWrapper ${isActive && 'active'}`}
                sx={{ '&:hover, &.active': { button: { color } } }}>
                <button onClick={handleClick}>
                    <FontAwesomeIcon icon={icon} style={{ transform: flipX ? 'scaleX(-1)' : 'scaleX(1)' }} />
                    {titleAsTooltip ? null : <span className="ToolbarContent">{title}</span>}
                </button>
            </Box>
        </Tooltip>
    );
}
