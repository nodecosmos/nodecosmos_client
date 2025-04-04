import NodeIndexSearch from './NodeIndexSearch';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import { HEADER_HEIGHT } from '../../../app/constants';
import useIsMobile from '../../../app/hooks/useIsMobile';
import CreateNodeModal from '../CreateNodeModal';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function NodeIndexHeader() {
    const [createNodeDialogOpen, openCreateNodeDialog, closeNodeDialog] = useBooleanStateValue();
    const isMobile = useIsMobile();
    const [searchParams] = useSearchParams();

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
                className="ml-1"
                variant="outlined"
                color="primary"
                title="Create"
                startIcon={faPlus}
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
