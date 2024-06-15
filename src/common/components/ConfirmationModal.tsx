import Alert from './Alert';
import CloseModalButton from './modal/CloseModalButton';
import SimpleAlert from './SimpleAlert';
import useBooleanStateValue from '../hooks/useBooleanStateValue';
import { faCheck, faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button, DialogActions, DialogContent, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useCallback, useMemo } from 'react';

export enum ConfirmType {
    // noinspection JSUnusedGlobalSymbols
    Creation = 'success',
    Warning = 'warning',
    Deletion = 'error',
    Merge = 'merge',
}

interface Props {
    text: string;
    confirmText: string;
    confirmType: ConfirmType;
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    warning?: string;
    info?: string;
}

const PROPS = {
    elevation: 5,
    sx: { borderRadius: 2.5 },
};

export default function ConfirmationModal(props: Props) {
    const {
        text, confirmText, open, confirmType, onClose, onConfirm, warning, info,
    } = props;
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const handleConfirm = useCallback(async () => {
        setLoading();
        try {
            await onConfirm();
            unsetLoading();
            onClose();
        } catch (e) {
            unsetLoading();
        }
    }, [onClose, onConfirm, setLoading, unsetLoading]);
    const icon = confirmType === ConfirmType.Deletion ? faClose : faCheck;
    const progressStyle = useMemo(() => ({ color: `${confirmType}.contrastText` }), [confirmType]);
    const titleMb = warning || info ? 2 : 0;

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            PaperProps={PROPS}>
            <DialogTitle fontWeight="bold">
                Are you sure?
                <CloseModalButton onClose={onClose} />
            </DialogTitle>
            <DialogContent>
                <Alert position="relative" mb={2} />
                <Typography color="text.secondary" fontWeight={500} mb={titleMb}>
                    {text}
                </Typography>
                {warning && <SimpleAlert severity="warning" message={warning} />}
                {info && <SimpleAlert severity="info" message={info} />}
            </DialogContent>
            <DialogActions>
                <Button disableElevation variant="contained" onClick={onClose} color="button">Cancel</Button>
                <Button
                    disableElevation
                    variant="outlined"
                    onClick={handleConfirm}
                    color={confirmType}
                    startIcon={
                        loading
                            ? <CircularProgress size={20} style={progressStyle} />
                            : <FontAwesomeIcon icon={icon} />
                    }
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
