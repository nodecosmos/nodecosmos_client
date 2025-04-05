import Loader from '../../../common/components/Loader';
import ToolsContainer from '../../../common/components/tools/ToolsContainer';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { selectNodeTaskSections } from '../tasks.selectors';
import { createTaskSection } from '../tasks.thunks';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BUTTON_SX = { width: 'fit-content' };

export default function TaskToolbar() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const { nodeId, branchId } = useBranchContext();
    const taskSections = useSelector(selectNodeTaskSections(nodeId));
    const handleServerError = useHandleServerErrorAlert();
    const createNewTaskSection = useCallback(async () => {
        if (loading) return;
        setLoading();

        const response = await dispatch(createTaskSection({
            branchId,
            nodeId,
            orderIndex: (taskSections && taskSections.length) || 0,
            title: '',
        }));

        if (response.meta.requestStatus === 'rejected') {
            if (response.payload === undefined) {
                console.error('Error creating task section: no payload');
            }

            const error: NodecosmosError = response.payload as NodecosmosError;

            setTimeout(() => handleServerError(error), 250);
            console.error(error);
        }

        unsetLoading();
    }, [branchId, dispatch, handleServerError, loading, nodeId, setLoading, taskSections, unsetLoading]);

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
                        onClick={createNewTaskSection}
                        variant="contained"
                        disableElevation
                        color="button"
                        startIcon={
                            loading ? <Loader size={20} /> : <FontAwesomeIcon icon={faAdd} />
                        }
                        sx={BUTTON_SX}
                    >
                        New Task Section
                    </Button>

                </ToolsContainer>
            </Box>
        </>
    );
}
