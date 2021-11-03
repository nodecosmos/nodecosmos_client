import blue from '@mui/material/colors/blue';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import {
  AddRounded,
  AccountTreeRounded,
  SearchRounded,
  Settings,
} from '@mui/icons-material';
import { Box } from '@mui/material';
/* micro */
import MicroMenu from '../../microcosmos/MicroMenu';
import CreateMicron from '../shared/CreateMicronModal';
import {
  blue1, fluorescent, green, yellow,
} from '../../../themes/dark/colors';

export default function MicronIndexToolbar({ currentMicron }) {
  const [openCreateMicronDialog, setOpenCreateMicronDialog] = React.useState(false);
  const iconSX = { fontSize: '1rem' };

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
        <AddRounded htmlColor={fluorescent} fontSize="small" sx={iconSX} />
      </IconButton>

      <IconButton
        sx={{ mr: 1, p: 2 }}
        color="primary"
        aria-haspopup="true"
        disableRipple
        onClick={console.log}
      >
        <SearchRounded color="secondary" sx={iconSX} />
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
        <Settings htmlColor={yellow} fontSize="small" sx={iconSX} />
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
