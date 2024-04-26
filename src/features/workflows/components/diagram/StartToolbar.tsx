import useModalOpen from '../../../../common/hooks/useModalOpen';
import CreateIoModal, { IoObjectType } from '../../../input-outputs/components/CreateIoModal';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import React from 'react';

interface StartToolbarProps {
    startStepHovered: boolean;
}

export default function StartToolbar({ startStepHovered }: StartToolbarProps) {
    const [modalOpen, openModal, closeModal] = useModalOpen();

    return (
        <>
            {startStepHovered && (
                <Box
                    display="flex"
                    sx={{
                        ml: 1,
                        '.Item': {
                            width: 31,
                            height: 1,
                            mx: 0.5,
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'toolbar.hover' },
                        },
                        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
                    }}
                >
                    <Tooltip title="Add Initial Input" placement="top">
                        <IconButton
                            className="Item"
                            aria-label="Add Initial Inputs"
                            sx={{ color: 'toolbar.red' }}
                            onClick={openModal}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
            <CreateIoModal
                associatedObject={IoObjectType.startStep}
                open={modalOpen}
                onClose={closeModal}
            />
        </>
    );
}
