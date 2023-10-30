import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';
import NcAvatar from '../../../common/components/NcAvatar';
import NcLink from '../../../common/components/NcLink';
import { CONTRIBUTION_REQUEST_STATUS } from '../contributionRequests.constants';
import { selectContributionRequests, selectSearchTerm } from '../contributionRequests.selectors';
import { deleteContributionRequest } from '../contributionRequests.thunks';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ContributionRequestsList({ nodeId }) {
    const contributionRequests = useSelector(selectContributionRequests(nodeId));
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const columns = [
        {
            headerName: 'Status',
            sortComparator: (v1, v2) => {
                // Define a custom order for status values
                const order = {
                    [CONTRIBUTION_REQUEST_STATUS.WORK_IN_PROGRESS]: 1,
                    [CONTRIBUTION_REQUEST_STATUS.PUBLISHED]: 2,
                    [CONTRIBUTION_REQUEST_STATUS.MERGED]: 3,
                    [CONTRIBUTION_REQUEST_STATUS.CLOSED]: 4,
                };

                return order[v1] - order[v2];
            },
            field: 'status',
            flex: 0,
            type: 'string',
            renderCell: (params) => <ContributionRequestStatusIcon status={params.value} />,
        },
        {
            headerName: 'Author',
            field: 'owner',
            flex: 0,
            type: 'object',
            renderCell: (params) => <NcAvatar scale={0.8} model={{ name: params.value?.name }} />,
        },
        {
            field: 'title',
            flex: 1,
            headerName: 'Title',
            renderCell: (params) => <NcLink to={params.row.id} title={params.value} />,
        },
        {
            field: 'createdAt',
            flex: 1,
            headerName: 'Date',
            type: 'dateTime',
        },
        {
            headerName: '',
            field: 'actions',
            flex: 1,
            type: 'string',
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(deleteContributionRequest({ nodeId, id: params.row.id }))}
                >
          Delete
                </Button>
            ),
        },
    ];

    let rows = [];

    if (contributionRequests) {
        rows = Object.values(contributionRequests);
    }

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 50,
                    },
                },
                sorting: {
                    sortModel: [
                        { field: 'status', sort: 'asc' },
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
            style={{
                height: '100%',
            }}
        />
    );
}

ContributionRequestsList.propTypes = {
    nodeId: PropTypes.string.isRequired,
};
