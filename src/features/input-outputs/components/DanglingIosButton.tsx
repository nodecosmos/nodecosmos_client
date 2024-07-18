import DanglingIosModal from './DanglingIosModal';
import useModalOpen from '../../../common/hooks/useModalOpen';
import { UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import useWorkflowContext from '../../workflows/hooks/useWorkflowContext';
import { selectUniqueIoByRootId } from '../inputOutputs.selectors';
import { faWarning } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function DanglingIosButton() {
    const { isBranch } = useBranchContext();
    const {
        rootId, branchId, inputsAdditionActive, 
    } = useWorkflowContext();
    const allWorkflowIos = useSelector(selectUniqueIoByRootId(branchId, rootId as UUID));
    const danglingIos = useMemo(() => {
        return allWorkflowIos.filter((io) => !io.initialInput && io.flowStepId === null);
    }, [allWorkflowIos]);
    const [open, openModal, closeModal] = useModalOpen();

    if (isBranch || !danglingIos.length || danglingIos.length === 0 || inputsAdditionActive) {
        return null;
    }

    return (
        <>
            <Button
                type="submit"
                disableElevation
                variant="outlined"
                color="warning"
                startIcon={
                    <FontAwesomeIcon icon={faWarning} />
                }
                sx={{
                    height: 'auto',
                    mr: 1,
                }}
                onClick={openModal}
            >
                <span className="Text">
                Dangling Inputs/Outputs
                </span>
            </Button>
            <DanglingIosModal open={open} onClose={closeModal} danglingIos={danglingIos} />
        </>
    );
}
