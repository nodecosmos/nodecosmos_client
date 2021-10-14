import React from 'react';
import * as PropTypes from 'prop-types';

/* material */
import { Add, Sort, Search } from '@mui/icons-material';
import Box from '@mui/material/Box';

/* micro lib */
import MicroMenu from '../microcosmos/MicroMenu';

export default function Toolbar() {
  return (
    <Box display="flex">
      <MicroMenu
        menuItems={[
          { title: 'New Micron' },
          { title: 'New Organization' },
          { title: 'New Branch Proposal' },
        ]}
        icon={<Add htmlColor="#9fd642" fontSize="small" />}
      />
      <MicroMenu
        sx={{ ml: 2 }}
        menuItems={[
          { title: 'New Micron' },
          { title: 'New Organization' },
        ]}
        icon={<Sort color="secondary" fontSize="small" />}
      />
      <MicroMenu
        sx={{ ml: 2 }}
        menuItems={[
          { title: 'New Micron' },
          { title: 'New Organization' },
        ]}
        icon={<Search htmlColor="yellow" fontSize="small" />}
      />
    </Box>
  );
}

Toolbar.propTypes = {};
