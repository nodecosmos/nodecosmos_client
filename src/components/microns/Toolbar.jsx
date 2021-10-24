import IconButton from '@mui/material/IconButton';
import React from 'react';
import * as PropTypes from 'prop-types';
/* material */
import { AddRounded, SortRounded, SearchRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
/* micro lib */
import MicroMenu from '../microcosmos/MicroMenu';
import CreateMicron from './CreateMicron';
import { fluorescent, red, yellow } from '../../themes/dark/colors';

export default function Toolbar({ currentMicron }) {
  const [openCreateMicronDialog, setOpenCreateMicronDialog] = React.useState(false);

  return (
    <Box display="flex">
      <CreateMicron
        currentMicron={currentMicron}
        open={openCreateMicronDialog}
        handleClose={() => setOpenCreateMicronDialog(false)}
      />
      <IconButton
        aria-haspopup="true"
        disableRipple
        variant="outlined"
        onClick={() => setOpenCreateMicronDialog(true)}
      >
        <AddRounded htmlColor={fluorescent} fontSize="small" />
      </IconButton>

      <MicroMenu
        sx={{ ml: 2 }}
        menuItems={[
          { title: 'Sort By ASC' },
          { title: 'Sort By DESC' },
        ]}
        icon={<SortRounded htmlColor={red} fontSize="small" />}
      />
      <MicroMenu
        sx={{ ml: 2 }}
        menuItems={[
          { title: 'New Micron' },
          { title: 'New Organization' },
        ]}
        icon={<SearchRounded htmlColor={yellow} fontSize="small" />}
      />
    </Box>
  );
}

Toolbar.defaultProps = {
  currentMicron: null,
};

Toolbar.propTypes = {
  currentMicron: PropTypes.object,
};
