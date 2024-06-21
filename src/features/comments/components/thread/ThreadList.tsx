import ThreadActions from './ThreadActions';
import NcAvatar from '../../../../common/components/NcAvatar';
import NcLink from '../../../../common/components/NcLink';
import { Profile } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectThreads } from '../../comments.selectors';
import { CommentThread } from '../../comments.types';
import useThreadsContext from '../../hooks/thread/useThreadsContext';
import {
    Box, Link, Typography,
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

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

const COLUMNS: GridColDef<CommentThread>[] = [
    {
        headerName: 'Author',
        field: 'author',
        sortComparator: (v1: Profile, v2: Profile) => {
            if (!v1.username || !v2.username) {
                return 0;
            }

            return v1.username > v2.username ? 1 : -1;
        },
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<CommentThread, Profile>) => {
            const value = params.value as Profile;

            return (
                <Link component={RouterLink} to={`/${value.username}`}>
                    <Box display="flex" alignItems="center">
                        <NcAvatar
                            size={25}
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
        headerName: 'Title',
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<CommentThread, string>) => {
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
        renderCell: (params: GridRenderCellParams<CommentThread>) => {
            return <ThreadActions id={params.row.id} />;
        },
    },
];

export default function ThreadList() {
    const { branchId, nodeId: objectId } = useBranchContext();
    const threads = useSelector(selectThreads(branchId, objectId));
    const { searchTerm } = useThreadsContext();

    const rows = useMemo(() => threads || [], [threads]);

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
        />
    );
}
