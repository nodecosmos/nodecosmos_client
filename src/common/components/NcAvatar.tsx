import { Avatar } from '@mui/material';
import React, { MouseEvent } from 'react';

interface NcAvatarProps {
    name: string;
    src?: string | null;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    size?: 25 | 30 | 35 | 40 | 45 | 50 | 200;
    fontSize?: 14 | 15 | 18 | 69;
}

function NcAvatar(props: NcAvatarProps) {
    const {
        name,
        src,
        onClick,
        size = 40,
        fontSize = 20,
    } = props;

    return (
        <Avatar
            className={`NcAvatar size-${size} fontSize-${fontSize}`}
            src={src ?? undefined}
            onClick={onClick}
        >
            {name?.charAt(0)?.toUpperCase()}
        </Avatar>
    );
}

export default React.memo(NcAvatar);
