import ContributionRequestActions from './ContributionRequestActions';
import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import NcAvatar from '../../../common/components/NcAvatar';
import NcLink from '../../../common/components/NcLink';
import { Profile } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { ContributionRequest, ContributionRequestStatus } from '../contributionRequest.types';
import { selectContributionRequests, selectSearchTerm } from '../contributionRequests.selectors';
import {
    Box, Link, Typography,
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridRowsProp } from '@mui/x-data-grid/models/gridRows';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const STATUS_ORDER = {
    [ContributionRequestStatus.WorkInProgress]: 1,
    [ContributionRequestStatus.Published]: 2,
    [ContributionRequestStatus.Merged]: 3,
    [ContributionRequestStatus.Closed]: 4,
};

const INITIAL_STATE: GridInitialStateCommunity = {
    pagination: { paginationModel: { pageSize: 50 } },
    sorting: {
        sortModel: [
            {
                field: 'createdAt',
                sort: 'desc',
            },
        ],
    },
};

const COLUMNS: GridColDef<ContributionRequest>[] = [
    {
        headerName: 'Status',
        sortComparator: (v1: ContributionRequestStatus, v2: ContributionRequestStatus) => {
            return STATUS_ORDER[v1] - STATUS_ORDER[v2];
        },
        field: 'status',
        flex: 0,
        renderCell: (params: GridRenderCellParams<ContributionRequest, ContributionRequestStatus>) => {
            return <ContributionRequestStatusIcon status={params.value as ContributionRequestStatus} />;
        },
    },
    {
        headerName: 'Author',
        sortComparator: (v1: Profile, v2: Profile) => {
            if (!v1.username || !v2.username) {
                return 0;
            }

            return v1.username > v2.username ? 1 : -1;
        },
        field: 'owner',
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<ContributionRequest, Profile>) => {
            const value = params.value as Profile;

            return (
                <Link component={RouterLink} to={`/${value.username}`}>
                    <Box display="flex" alignItems="center">
                        <NcAvatar
                            size={25}
                            fontSize={14}
                            name={value.name}
                            src={value.profileImageUrl} />
                        <Typography variant="body2" color="texts.tertiary" px={2} fontWeight="bold">
                            @{value.username}
                        </Typography>
                    </Box>
                </Link>
            );
        },
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 3,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<ContributionRequest, string>) => {
            return <NcLink to={params.row.id} title={params.value as string} />;
        },
    },
    {
        field: 'createdAt',
        headerName: 'Date',
        type: 'dateTime',
        flex: 1,
        minWidth: 200,
        valueGetter: (params: string) => {
            return new Date(params);
        },
    },
    {
        headerName: '',
        field: 'actions',
        type: 'string',
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<ContributionRequest>) => {
            if (params.row.status === ContributionRequestStatus.WorkInProgress) {
                return (
                    <ContributionRequestActions id={params.row.id} />
                );
            }
        },
    },
];

export default function ContributionRequestsList() {
    const { nodeId } = useBranchContext();
    const contributionRequests = useSelector(selectContributionRequests(nodeId));
    const searchTerm = useSelector(selectSearchTerm);

    const rows: GridRowsProp<ContributionRequest> = useMemo(
        () => Object.values(contributionRequests || {}), [contributionRequests],
    );

    const filterModel = useMemo(() => (
        {
            items: [],
            quickFilterValues: [searchTerm],
        }
    ), [searchTerm]);

    return (
        <DataGrid
            rows={rows}
            columns={COLUMNS}
            initialState={INITIAL_STATE}
            checkboxSelection={false}
            rowSelection={false}
            disableColumnMenu
            columnHeaderHeight={48}
            rowHeight={48}
            filterModel={filterModel}
            scrollbarSize={0} // solves forced reflow issue
            autoPageSize
        />
    );
}
