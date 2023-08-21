import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { selectContributionRequests, selectSearchTerm } from '../contributionRequests.selectors';
import NcAvatar from '../../../common/components/NcAvatar';
import NcLink from '../../../common/components/NcLink';
import { deleteContributionRequest } from '../contributionRequests.thunks';
import { CONTRIBUTION_REQUEST_STATUS } from '../contributionRequests.constants';
import ContributionRequestStatusIcon from './ContributionRequestStatusIcon';

export default function ContributionRequestsList({ nodeId }) {
  const contributionRequests = useSelector(selectContributionRequests(nodeId));
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      type: 'string',
      flex: 0,
      renderCell: (params) => <ContributionRequestStatusIcon status={params.value} />,
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
    },
    {
      field: 'owner',
      headerName: 'Author',
      type: 'object',
      flex: 0,
      renderCell: (params) => <NcAvatar scale={0.8} model={{ name: params.value?.name }} />,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 8,
      renderCell: (params) => <NcLink to={params.row.id} title={params.value} />,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'dateTime',
      flex: 1,
    },
    {
      headerName: '',
      type: 'actions',
      flex: 1,
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
