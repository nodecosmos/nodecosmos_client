import useBranchContext from '../../../branch/hooks/useBranchContext';
import CrTooltip from '../sidebar/CrTooltip';
import {
    Alert as MuiAlert, Tooltip, Typography,
} from '@mui/material';
import React from 'react';

export default function CrInfo() {
    const {
        title, isBranch, isContributionRequest,
    } = useBranchContext();

    if (isContributionRequest || !isBranch) {
        return null;
    }

    return (
        <Tooltip title={<CrTooltip />} placement="top">
            <MuiAlert
                severity="info"
                variant="outlined"
                sx={{
                    borderRadius: 1,
                    width: 'calc(100% - 1px)',
                    border: 0,
                    p: 1,
                }}
            >
                <Typography variant="body2" color="text.info">
                    Contribution Request <b>{title}</b>.
                </Typography>
            </MuiAlert>
        </Tooltip>

    );
}
