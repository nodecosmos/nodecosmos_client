import CreateNodeModal from './CreateNodeModal';
import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import React from 'react';

export default function NodeIndexHeader() {
    const [openCreateNodeDialog, setOpenCreateNodeDialog] = React.useState(false);

    return (
        <>
            <CreateNodeModal
                open={openCreateNodeDialog}
                onClose={() => setOpenCreateNodeDialog(false)}
            />
            <Box display="flex" alignItems="center">
                <DefaultButton
                    title="Add Node"
                    startIcon={<FontAwesomeIcon icon={faAdd} />}
                    onClick={() => setOpenCreateNodeDialog(true)}
                />
                <NodeIndexSearch />
            </Box>
        </>
    );
}
