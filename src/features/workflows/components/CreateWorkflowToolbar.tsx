import CreateWorkflowModal from './CreateWorkflowModal';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import useModalOpen from '../../../common/hooks/useModalOpen';
import { UUID } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { Box } from '@mui/material';
import React from 'react';

interface Props {
    nodeId: UUID;
    branchId: UUID;
}

export default function CreateWorkflowToolbar(props: Props) {
    const { nodeId, branchId } = props;
    const [modalOpen, openModal, closeModal] = useModalOpen();

    return (
        <Box
            height={HEADER_HEIGHT}
            width={1}
            pl={1.25}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            borderBottom={1}
            borderColor="borders.1"
            zIndex={3}
        >
            <DefaultButton
                title="Add Workflow"
                startIcon={faAdd}
                onClick={openModal}
            />
            <CreateWorkflowModal
                open={modalOpen}
                onClose={closeModal}
                nodeId={nodeId}
                branchId={branchId}
            />
        </Box>
    );
}
