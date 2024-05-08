import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import NcAvatar from '../../../common/components/NcAvatar';
import NcLink from '../../../common/components/NcLink';
import { NodecosmosDispatch } from '../../../store';
import { Profile, UUID } from '../../../types';
import useBranchContext from '../../branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../nodes/nodes.selectors';
import { ContributionRequest, ContributionRequestStatus } from '../contributionRequest.types';
import { selectContributionRequests, selectSearchTerm } from '../contributionRequests.selectors';
import { deleteContributionRequest } from '../contributionRequests.thunks';
import { Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridRowsProp } from '@mui/x-data-grid/models/gridRows';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch: NodecosmosDispatch = useDispatch();
    const { originalId } = useBranchContext();
    const optNode = useSelector(maybeSelectNode(originalId as UUID, nodeId as UUID));
    const rootId = optNode?.rootId;

    const deleteCR = useCallback((id: UUID) => {
        if (!rootId) {
            throw new Error('Root ID is not defined');
        }
        return () => dispatch(deleteContributionRequest({
            rootId,
            nodeId,
            id,
        }));
    }, [dispatch, nodeId, rootId]);

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
            field: 'owner',
            flex: 0,
            renderCell: (params: GridRenderCellParams<ContributionRequest, Profile>) => {
                const value = params.value as Profile;

                return <NcAvatar
                    width={25}
                    height={25}
                    fontSize={14}
                    name={value.name}
                    src={value.profileImageUrl} />;
            },
        },
        {
            field: 'title',
            flex: 1,
            headerName: 'Title',
            renderCell: (params: GridRenderCellParams<ContributionRequest, string>) => {
                return <NcLink to={params.row.id} title={params.value as string} />;
            },
        },
        {
            field: 'createdAt',
            flex: 1,
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
            renderCell: (params: GridRenderCellParams<ContributionRequest>) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={deleteCR(params.row.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    let rows: GridRowsProp<ContributionRequest> = [];

    if (contributionRequests) {
        rows = Object.values(contributionRequests);
    }

    return (
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
    );
}
