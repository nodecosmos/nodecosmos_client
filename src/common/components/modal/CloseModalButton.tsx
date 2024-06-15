import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import React from 'react';

interface CloseModalButtonProps {
    onClose: () => void;
}

export default function CloseModalButton({ onClose }: CloseModalButtonProps) {
    return (
        <IconButton
            className="CloseModalButton"
            disableRipple
            color="button"
            onClick={onClose}
        >
            <FontAwesomeIcon icon={faClose} />
        </IconButton>
    );
}
