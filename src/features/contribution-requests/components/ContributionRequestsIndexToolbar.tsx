import ContributionRequestSearchInput from './ContributionRequestSearchInput';
import CreateContributionRequestModal from './CreateContributionRequestModal';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import useModalOpen from '../../../common/hooks/useModalOpen';
import { UUID } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import useIsMobile from '../../app/hooks/useIsMobile';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
    nodeId: UUID;
    rootId: UUID;
}

export default function ContributionRequestsIndexToolbar({ nodeId, rootId }: Props) {
    const [modalOpen, openModal, closeModal] = useModalOpen();
    const isMobile = useIsMobile();

    const title = useMemo(() => {
        return isMobile ? 'Add CR' : 'Add Contribution Request';
    }, [isMobile]);

    return (
        <>
            <Box
                height={HEADER_HEIGHT}
                width={1}
                display="flex"
                alignItems="center"
                position="relative"
                boxShadow="2"
                borderBottom={1}
                borderColor="borders.1"
                zIndex={3}
                pl={1.25}
            >
                <DefaultButton
                    title={title}
                    startIcon={faAdd}
                    onClick={openModal}
                />

                <ContributionRequestSearchInput />
            </Box>
            <CreateContributionRequestModal
                rootId={rootId}
                nodeId={nodeId}
                open={modalOpen}
                onClose={closeModal}
            />
        </>
    );
}
