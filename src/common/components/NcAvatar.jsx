import { Avatar } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';
/* mui */

export default function NcAvatar({
    name, src, onClick, backgroundColor, scale, width, height, fontSize,
}) {
    return (
        <Avatar
            src={src}
            onClick={onClick}
            sx={{
                transform: `scale(${scale})`,
                width,
                height,
                fontSize,
                backgroundColor,
                color: 'text.primary',
                cursor: 'pointer',
            }}
        >
            {name?.charAt(0)?.toUpperCase()}
        </Avatar>
    );
}

NcAvatar.defaultProps = {
    onClick: null,
    backgroundColor: 'background.8',
    scale: 1,
    width: 40,
    height: 40,
    fontSize: 20,
    src: null,
};

NcAvatar.propTypes = {
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func,
    scale: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    fontSize: PropTypes.number,
    src: PropTypes.string,
};
