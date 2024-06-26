import { Button } from '@mui/material';
import React from 'react';

interface InsertCommentPlaceholderProps {
    onClick: () => void;
}

const SX = {
    width: 1,
    height: 40,
    justifyContent: 'start',
    color: 'text.tertiary',
    backgroundColor: 'background.3',
    borderRadius: 0,
    '&:hover': { backgroundColor: 'background.4' },
};

export default function InsertCommentPlaceholder({ onClick }: InsertCommentPlaceholderProps) {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            disableRipple
            sx={SX}>
            Reply...
        </Button>
    );
}
