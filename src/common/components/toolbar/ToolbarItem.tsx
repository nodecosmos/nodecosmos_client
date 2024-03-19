import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import {
    useMatch, useNavigate, useResolvedPath,
} from 'react-router-dom';

interface Props<Val> {
    title: string;
    color: string;
    icon: IconProp;
    titleAsTooltip?: boolean;
    active?: boolean;
    onClick?: (value?: Val) => void;
    onClickValue?: Val;
    flipX?: boolean;
    to?: string;
    // hack to allow for multiple active paths
    additionalActivePaths?: [string | null, string | null, string | null];
    iconColor?: string;
}

export default function ToolbarItem<Val>(props: Props<Val>) {
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
        additionalActivePaths = [],
        iconColor,
    } = props;
    const path = useResolvedPath(to);
    const additionalPath1 = useResolvedPath(additionalActivePaths[0] || 'undefined');
    const additionalPath2 = useResolvedPath(additionalActivePaths[1] || 'undefined');
    const additionalPath3 = useResolvedPath(additionalActivePaths[2] || 'undefined');

    const mainPathActive = useMatch(path.pathname);
    const isPath1Active = useMatch(additionalPath1.pathname);
    const isPath2Active = useMatch(additionalPath2.pathname);
    const isPath3Active = useMatch(additionalPath3.pathname);
    const isPathActive = mainPathActive || isPath1Active || isPath2Active || isPath3Active;
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
                sx={{
                    svg: { color: iconColor ? iconColor : 'inherit' },
                    '&:hover, &.active': {
                        button: { color },
                        svg: { color: iconColor ? iconColor : 'inherit' },
                    },
                }}>
                <button onClick={handleClick}>
                    <FontAwesomeIcon icon={icon} style={{ transform: flipX ? 'scaleX(-1)' : 'scaleX(1)' }} />
                    {titleAsTooltip ? null : <span className="ButtonContent">{title}</span>}
                </button>
            </Box>
        </Tooltip>
    );
}
