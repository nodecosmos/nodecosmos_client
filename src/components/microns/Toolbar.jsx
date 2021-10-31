import IconButton from '@mui/material/IconButton';
import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { AddRounded, SortRounded, SearchRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
/* micro */
import MicroMenu from '../microcosmos/MicroMenu';
import CreateMicron from './CreateMicronModal';
import { fluorescent, red, yellow } from '../../themes/dark/colors';

export default function Toolbar({ currentMicron }) {
  const [openCreateMicronDialog, setOpenCreateMicronDialog] = React.useState(false);

  return (
    <Box display="flex" justifyContent="center">
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
        <AddRounded htmlColor={fluorescent} fontSize="small" sx={{ fontSize: '1rem' }} />
      </IconButton>

      <MicroMenu
        sx={{ ml: 2 }}
        menuItems={[
          { title: 'Sort By ASC' },
          { title: 'Sort By DESC' },
        ]}
        icon={<SortRounded htmlColor={red} fontSize="small" sx={{ fontSize: '1rem' }} />}
      />
      <MicroMenu
        sx={{ ml: 2 }}
        menuItems={[
          { title: 'New Micron' },
          { title: 'New Organization' },
        ]}
        icon={<SearchRounded htmlColor={yellow} fontSize="small" sx={{ fontSize: '1rem' }} />}
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
