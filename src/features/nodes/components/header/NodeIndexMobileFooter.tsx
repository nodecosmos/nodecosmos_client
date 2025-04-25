import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import useIsMobile from '../../../app/hooks/useIsMobile';
import { selectCurrentUser } from '../../../users/users.selectors';
import CreateNodeModal from '../CreateNodeModal';
import { faAdd } from '@fortawesome/pro-regular-svg-icons';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SX = { backgroundColor: 'backgrounds.1' };

export default function NodeIndexMobileFooter() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();
    const isMobile = useIsMobile();
    const currentUser = useSelector(selectCurrentUser);

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
            {currentUser && (
                <Button
                    component={NavLink}
                    variant="text"
                    color="buttonContrast"
                    className="ml-1 bold"
                    to={`/${currentUser.username}/nodes`}
                >
                    My Nodes
                </Button>
            )}

            <NodeIndexSearch />
            <CreateNodeModal
                open={createNodeDialogOpen}
                onClose={closeNodeDialog}
            />
        </Box>
    );
}
