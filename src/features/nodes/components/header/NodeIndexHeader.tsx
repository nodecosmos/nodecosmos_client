import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import CreateNodeModal from '../CreateNodeModal';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { Box } from '@mui/material';
import React from 'react';

export default function NodeIndexHeader() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();

    return (
        <>
            <CreateNodeModal
                open={createNodeDialogOpen}
                onClose={closeNodeDialog}
            />
            <Box display="flex" alignItems="center">
                <DefaultButton
                    title="Add Node"
                    startIcon={faAdd}
                    onClick={openCreateNodeDialog}
                />
                <NodeIndexSearch />
            </Box>
        </>
    );
}
