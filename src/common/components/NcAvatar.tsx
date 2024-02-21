import { Avatar } from '@mui/material';
import React, { MouseEvent } from 'react';

interface NcAvatarProps {
    name: string;
    src?: string | null;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    backgroundColor?: string;
    scale?: number;
    width?: number;
    height?: number;
    fontSize?: number;
    borderRadius?: number | string;
}

export default function NcAvatar(props: NcAvatarProps) {
    const {
        name,
        src,
        onClick,
        borderRadius,
        backgroundColor = 'background.8',
        scale = 1,
        width = 40,
        height = 40,
        fontSize = 20,
    } = props;

    return (
        <Avatar
            src={src ?? undefined}
            onClick={onClick}
            sx={{
                transform: `scale(${scale})`,
                width,
                height,
                fontSize,
                backgroundColor,
                color: 'text.primary',
                cursor: 'pointer',
                borderRadius,
            }}
        >
            {name?.charAt(0)?.toUpperCase()}
        </Avatar>
    );
}
