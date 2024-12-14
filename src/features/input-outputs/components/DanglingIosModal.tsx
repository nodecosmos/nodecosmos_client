import DanglingIoItem from './DanglingIoItem';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import DefaultModal from '../../../common/components/modal/DefaultModal';
import { InputOutput } from '../inputOutputs.types';
import {
    Alert as MuiAlert, DialogContent, Typography,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
    danglingIos: InputOutput[];
    open: boolean;
    onClose: () => void;
}

function DanglingIosModal(props: Props) {
    const {
        open, onClose, danglingIos,
    } = props;

    return (
        <DefaultModal open={open} onClose={onClose}>
            <DialogTitle>
                Dangling Inputs/Outputs
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent sx={{ minHeight: 550 }}>
                <MuiAlert
                    severity="warning"
                    variant="outlined"
                    sx={{
                        borderRadius: 1,
                        width: 'calc(100% - 1px)',
                        border: 0,
                        mb: 2,
                        backgroundColor: 'backgrounds.1',
                    }}
                >
                    <Typography variant="body2" color="texts.warning">
                        Dangling Inputs/Outputs are one that are not connected to any step or initial
                        workflow input. They can be safely deleted if their reuse is not planned.
                    </Typography>
                </MuiAlert>
                {danglingIos.map((io) => (
                    <DanglingIoItem key={io.id} io={io} />
                ))}
            </DialogContent>
        </DefaultModal>
    );
}

export default React.memo(DanglingIosModal);
