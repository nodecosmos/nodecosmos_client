import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { selectContributionRequests, selectSearchTerm } from '../contributionRequests.selectors';
import NcAvatar from '../../../common/components/NcAvatar';
import NcLink from '../../../common/components/NcLink';
import { deleteContributionRequest } from '../contributionRequests.thunks';

export default function ContributionRequestsList({ nodeId }) {
  const contributionRequests = useSelector(selectContributionRequests(nodeId));
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const columns = [
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
      flex: 5,
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
    <Box p={0}>
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
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
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
      />
    </Box>
  );
}

ContributionRequestsList.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
