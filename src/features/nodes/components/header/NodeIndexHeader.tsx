import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { HEADER_HEIGHT } from '../../../app/constants';
import useIsMobile from '../../../app/hooks/useIsMobile';
import { selectCurrentUser } from '../../../users/users.selectors';
import CreateNodeModal from '../CreateNodeModal';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';

export default function NodeIndexHeader() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();
    const isMobile = useIsMobile();
    const [searchParams] = useSearchParams();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (searchParams.get('create')) {
            openCreateNodeDialog();
        }
    }, [openCreateNodeDialog, searchParams]);

    if (isMobile) {
        return null;
    }

    return (
        <Box display="flex" alignItems="center" height={HEADER_HEIGHT}>
            <DefaultButton
                className="bold"
                variant="outlined"
                color="primary"
                title="Add Node"
                startIcon={faPlus}
                onClick={openCreateNodeDialog}
            />
            <CreateNodeModal
                open={createNodeDialogOpen}
                onClose={closeNodeDialog}
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
        </Box>
    );
}
