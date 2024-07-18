import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { HEADER_HEIGHT } from '../../../app/constants';
import useIsMobile from '../../../app/hooks/useIsMobile';
import CreateNodeModal from '../CreateNodeModal';
import { faAdd } from '@fortawesome/pro-regular-svg-icons';
import { Box } from '@mui/material';
import React from 'react';

export default function NodeIndexHeader() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();
    const isMobile = useIsMobile();

    if (isMobile) {
        return null;
    }

    return (
        <Box display="flex" alignItems="center" height={HEADER_HEIGHT}>
            <DefaultButton
                variant="outlined"
                color="primary"
                title="Add Node"
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
