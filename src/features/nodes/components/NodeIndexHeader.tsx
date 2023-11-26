import CreateNodeModal from './CreateNodeModal';
import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import React from 'react';

export default function NodeIndexHeader() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();

    return (
        <>
            <CreateNodeModal
                open={createNodeDialogOpen}
                onClose={openCreateNodeDialog}
            />
            <Box display="flex" alignItems="center">
                <DefaultButton
                    title="Add Node"
                    startIcon={<FontAwesomeIcon icon={faAdd} />}
                    onClick={closeNodeDialog}
                />
                <NodeIndexSearch />
            </Box>
        </>
    );
}
