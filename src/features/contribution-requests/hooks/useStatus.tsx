import { NodecosmosTheme } from '../../../themes/themes.types';
import { ContributionRequestStatus } from '../contributionRequest.types';
import { useTheme } from '@mui/material';

interface Status {
    color: string;
    label: string;
}

export function useStatus(status: ContributionRequestStatus): Status {
    const theme: NodecosmosTheme = useTheme();

    const statusColors = {
        [ContributionRequestStatus.WorkInProgress]: theme.palette.background.labels.orange,
        [ContributionRequestStatus.Published]: theme.palette.background.labels.green,
        [ContributionRequestStatus.Merged]: theme.palette.background.labels.purple,
        [ContributionRequestStatus.Closed]: theme.palette.background.labels.blue,
    };

    const statusLabels = {
        [ContributionRequestStatus.WorkInProgress]: 'Work in progress',
        [ContributionRequestStatus.Published]: 'Published',
        [ContributionRequestStatus.Merged]: 'Merged',
        [ContributionRequestStatus.Closed]: 'Closed',
    };

    return {
        color: statusColors[status],
        label: statusLabels[status],
    };
}
