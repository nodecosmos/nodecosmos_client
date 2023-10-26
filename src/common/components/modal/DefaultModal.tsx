import React from 'react';
import Dialog from '@mui/material/Dialog';

interface DefaultModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export default function DefaultModal({
    open, onClose, children, maxWidth = 'sm',
}: DefaultModalProps) {
    return (
        <Dialog
            fullWidth
            maxWidth={maxWidth}
            onClose={onClose}
            open={open}
            PaperProps={{
                elevation: 5,
                sx: {
                    borderRadius: 2.5,
                },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    border: 1,
                    borderColor: 'borders.4',
                },
            }}
        >
            {children}
        </Dialog>
    );
}
