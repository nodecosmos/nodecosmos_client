import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import NodeIndexSearch from './NodeIndexSearch';
import CreateNodeModal from './CreateNodeModal';

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
