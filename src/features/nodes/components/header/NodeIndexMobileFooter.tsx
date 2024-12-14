import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useIsMobile from '../../../app/hooks/useIsMobile';
import CreateNodeModal from '../CreateNodeModal';
import { faAdd } from '@fortawesome/pro-regular-svg-icons';
import { Box } from '@mui/material';
import React from 'react';

const SX = { backgroundColor: 'backgrounds.1' };

export default function NodeIndexMobileFooter() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();
    const isMobile = useIsMobile();

    if (!isMobile) {
        return null;
    }

    return (
        <Box
            p={2}
            position="absolute"
            bottom={0}
            display="flex"
            alignItems="center"
            height={75}
            sx={SX}
            zIndex={1}
            width={1}
        >
            <DefaultButton
                variant="outlined"
                color="primary"
                title="Create"
                startIcon={faAdd}
                onClick={openCreateNodeDialog}
            />
            <NodeIndexSearch />
            <CreateNodeModal
                open={createNodeDialogOpen}
                onClose={closeNodeDialog}
            />
        </Box>
    );
}
