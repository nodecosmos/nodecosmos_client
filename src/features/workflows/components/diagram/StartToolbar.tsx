import useModalOpenAuthorized from '../../../../common/hooks/useModalOpenAuthorized';
import CreateIoModal, { IoObjectType } from '../../../input-outputs/components/CreateIoModal';
import { WORKFLOW_BUTTON_HEIGHT } from '../../workflows.constants';
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
    const [modalOpen, openModal, closeModal] = useModalOpenAuthorized();

    return (
        <>
            {startStepHovered && (
                <Box height={WORKFLOW_BUTTON_HEIGHT} ml={1}>
                    <Tooltip title="Add Initial Input" placement="top">
                        <IconButton
                            className="Item toolbar-red fs-18 border-radius-1"
                            aria-label="Add Initial Inputs"
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
