import React from 'react';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateIOModal from '../../../input-outputs/components/CreateIOModal';
import useModalOpen from '../../../../common/hooks/useModalOpen';

export default function StartToolbar({ workflowId, startStepHovered }) {
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
            <CreateIOModal
                open={modalOpen}
                onClose={closeModal}
                workflowId={workflowId}
                associatedObject={'workflow'}
            />
        </>
    );
}

StartToolbar.propTypes = {
    workflowId: PropTypes.string.isRequired,
    startStepHovered: PropTypes.bool.isRequired,
};
