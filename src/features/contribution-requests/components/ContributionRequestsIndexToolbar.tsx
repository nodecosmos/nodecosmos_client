import ContributionRequestSearchInput from './ContributionRequestSearchInput';
import CreateContributionRequestModal from './CreateContributionRequestModal';
import ToolsContainer from '../../../common/components/tools/ToolsContainer';
import useModalOpen from '../../../common/hooks/useModalOpen';
import { UUID } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import useIsMobile from '../../app/hooks/useIsMobile';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import React, { useMemo } from 'react';

const BUTTON_SX = { width: 'fit-content' };

interface Props {
    nodeId: UUID;
    rootId: UUID;
}

export default function ContributionRequestsIndexToolbar({ nodeId, rootId }: Props) {
    const [modalOpen, openModal, closeModal] = useModalOpen();
    const isMobile = useIsMobile();

    const title = useMemo(() => {
        return isMobile ? 'New' : 'New Contribution Request';
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
                px={1.25}
            >
                <ToolsContainer>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={openModal}
                        color="button"
                        startIcon={<FontAwesomeIcon icon={faAdd} />}
                        sx={BUTTON_SX}
                    >
                        {title}
                    </Button>

                    <ContributionRequestSearchInput />

                </ToolsContainer>
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
