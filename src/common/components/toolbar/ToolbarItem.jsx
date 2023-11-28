import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import {
    useMatch, useNavigate, useResolvedPath,
} from 'react-router-dom';

export default function ToolbarItem({
    title,
    icon,
    color,
    onClick,
    onClickValue,
    active,
    flipX,
    titleAsTooltip,
    to,
}) {
    const path = useResolvedPath(to);
    const isPathActive = useMatch(path.pathname);
    const isActive = to ? isPathActive : active;
    const navigate = useNavigate();
    const handleClick = () => {
        if (to) {
            navigate(to);
        }
        onClick && onClick(onClickValue);
    };

    return (
        <Tooltip title={titleAsTooltip && title} placement="top">
            <Box
                className={`ButtonWrapper ${isActive && 'active'}`}
                sx={{
                    '&:hover, &.active': {
                        button: {
                            color,
                        },
                    },
                    svg: {
                        transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
                    },
                }}
            >
                <Box component="button" type="button" onClick={handleClick}>
                    <FontAwesomeIcon icon={icon} />
                    {titleAsTooltip ? null : <span className="ToolbarContent">{title}</span>}
                </Box>
            </Box>
        </Tooltip>
    );
}

ToolbarItem.defaultProps = {
    onClick: null,
    onClickValue: null,
    active: false,
    flipX: false,
    titleAsTooltip: true,
    to: null,
};

ToolbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    titleAsTooltip: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    onClickValue: PropTypes.any,
    flipX: PropTypes.bool,
    to: PropTypes.string,
};
