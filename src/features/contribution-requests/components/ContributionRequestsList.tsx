import ContributionRequestActions from './ContributionRequestActions';
import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import Alert from '../../../common/components/Alert';
import NcAvatar from '../../../common/components/NcAvatar';
import NcLink from '../../../common/components/NcLink';
import { Profile, UUID } from '../../../types';
import { ContributionRequest, ContributionRequestStatus } from '../contributionRequest.types';
import { selectContributionRequests, selectSearchTerm } from '../contributionRequests.selectors';
import {
    Box, Link, Typography,
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridRowsProp } from '@mui/x-data-grid/models/gridRows';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    nodeId: UUID;
}

const STATUS_ORDER = {
    [ContributionRequestStatus.WorkInProgress]: 1,
    [ContributionRequestStatus.Published]: 2,
    [ContributionRequestStatus.Merged]: 3,
    [ContributionRequestStatus.Closed]: 4,
};

export default function ContributionRequestsList({ nodeId }: Props) {
    const contributionRequests = useSelector(selectContributionRequests(nodeId));
    const searchTerm = useSelector(selectSearchTerm);

    const columns: GridColDef<ContributionRequest>[] = [
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
            flex: 0.25,
            renderCell: (params: GridRenderCellParams<ContributionRequest, Profile>) => {
                const value = params.value as Profile;

                return (
                    <Link component={RouterLink} to={`/${value.username}`}>
                        <Box display="flex" alignItems="center">
                            <NcAvatar
                                width={25}
                                height={25}
                                fontSize={14}
                                name={value.name}
                                src={value.profileImageUrl} />
                            <Typography variant="body2" color="text.tertiary" px={2} fontWeight="bold">
                                @{value.username}
                            </Typography>
                        </Box>
                    </Link>
                );
            },
        },
        {
            field: 'title',
            flex: 0.75,
            headerName: 'Title',
            renderCell: (params: GridRenderCellParams<ContributionRequest, string>) => {
                return <NcLink to={params.row.id} title={params.value as string} />;
            },
        },
        {
            field: 'createdAt',
            flex: 0.5,
            headerName: 'Date',
            type: 'dateTime',
            valueGetter: (params: string) => {
                return new Date(params);
            },
        },
        {
            headerName: '',
            field: 'actions',
            flex: 1,
            type: 'string',
            renderCell: (params: GridRenderCellParams<ContributionRequest>) => {
                if (params.row.status === ContributionRequestStatus.WorkInProgress) {
                    return (
                        <ContributionRequestActions nodeId={nodeId} id={params.row.id} />
                    );
                }
            },
        },
    ];

    let rows: GridRowsProp<ContributionRequest> = [];

    if (contributionRequests) {
        rows = Object.values(contributionRequests);
    }

    return (
        <>
            <Alert position="relative" />
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 50 } },
                    sorting: {
                        sortModel: [
                            {
                                field: 'createdAt',
                                sort: 'desc',
                            },
                        ],
                    },
                }}
                checkboxSelection={false}
                rowSelection={false}
                disableColumnMenu
                columnHeaderHeight={48}
                rowHeight={48}
                filterModel={
                    {
                        items: [],
                        quickFilterValues: [searchTerm],
                    }
                }
                style={{ height: '100%' }}
            />
        </>

    );
}
