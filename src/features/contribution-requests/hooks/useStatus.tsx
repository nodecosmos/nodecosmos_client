import { NodecosmosTheme } from '../../../themes/themes.types';
import { ContributionRequestStatus } from '../contributionRequest.types';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';

interface Status {
    color: string;
    label: string;
}
const STATUS_LABEL = {
    [ContributionRequestStatus.WorkInProgress]: 'Work in progress',
    [ContributionRequestStatus.Published]: 'Published',
    [ContributionRequestStatus.Merged]: 'Merged',
    [ContributionRequestStatus.Closed]: 'Closed',
};

export function useStatus(status: ContributionRequestStatus): Status {
    const theme: NodecosmosTheme = useTheme();

    const statusColors = useMemo(() => ({
        [ContributionRequestStatus.WorkInProgress]: theme.palette.background.labels.orange,
        [ContributionRequestStatus.Published]: theme.palette.background.labels.green,
        [ContributionRequestStatus.Merged]: theme.palette.background.labels.purple,
        [ContributionRequestStatus.Closed]: theme.palette.background.labels.blue,
    }), [theme.palette.background.labels]);

    return useMemo(() => ({
        color: statusColors[status],
        label: STATUS_LABEL[status],
    }), [status, statusColors]);
}
