import { Button } from '@mui/material';
import React from 'react';

interface InsertCommentPlaceholderProps {
    onClick: () => void;
    title?: string | null;
    children?: React.ReactNode;
}

const SX = {
    width: 1,
    height: 40,
    justifyContent: 'start',
    alignItems: 'center',
    color: 'texts.tertiary',
    backgroundColor: 'backgrounds.3',
    borderRadius: 0,
    '&:hover': { backgroundColor: 'backgrounds.4' },
};

export default function InsertCommentPlaceholder({
    onClick, children, title = 'Reply...',
}: InsertCommentPlaceholderProps) {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            disableRipple
            disableElevation
            sx={SX}
        >
            {title}
            {children}
        </Button>
    );
}
