import IconButton from '@mui/material/IconButton';
import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import {
  AddRounded,
  SearchRounded,
  Settings,
} from '@mui/icons-material';
import { Box } from '@mui/material';
/* micro */
import CreateMicron from '../shared/CreateMicronModal';

export default function MicronIndexToolbar({ currentMicron }) {
  const [openCreateMicronDialog, setOpenCreateMicronDialog] = React.useState(false);
  const iconSX = { fontSize: '14px' };

  return (
    <Box display="flex" justifyContent="center">
      <CreateMicron
        currentMicron={currentMicron}
        open={openCreateMicronDialog}
        handleClose={() => setOpenCreateMicronDialog(false)}
      />
      <IconButton
        sx={{ mr: 1, p: 2 }}
        aria-haspopup="true"
        disableRipple
        color="primary"
        onClick={() => setOpenCreateMicronDialog(true)}
      >
        <AddRounded fontSize="small" sx={iconSX} />
      </IconButton>

      <IconButton
        sx={{ mr: 1, p: 2 }}
        color="primary"
        aria-haspopup="true"
        disableRipple
        onClick={console.log}
      >
        <SearchRounded sx={iconSX} />
      </IconButton>
      {/* <MicroMenu */}
      {/*  menuItems={[ */}
      {/*    { title: 'Sort By Date Desc' }, */}
      {/*    { title: 'Sort By DESC' }, */}
      {/*  ]} */}
      {/*  icon={<AccountTreeRounded fontSize="small" sx={iconSX} />} */}
      {/* /> */}
      <IconButton
        sx={{ mr: 1, p: 2 }}
        aria-haspopup="true"
        disableRipple
        onClick={console.log}
      >
        <Settings fontSize="small" sx={iconSX} />
      </IconButton>
    </Box>
  );
}

MicronIndexToolbar.defaultProps = {
  currentMicron: null,
};

MicronIndexToolbar.propTypes = {
  currentMicron: PropTypes.object,
};
