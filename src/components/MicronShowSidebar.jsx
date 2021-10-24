import Typography from '@mui/material/Typography';
import React from 'react';
import { NavLink } from 'react-router-dom';
import * as PropTypes from 'prop-types';
/* material ui */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddRounded from '@mui/icons-material/AddRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import GestureRoundedIcon from '@mui/icons-material/GestureRounded';

export default function MicronShowSidebar(props) {
  const { micron } = props;
  const listItemSx = { p: 2, pb: 0 };
  const ListItemIconSx = { minWidth: 0, marginRight: 3 };

  return (
    <>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem sx={listItemSx}>
            <ListItemButton
              disableRipple
              exact
              component={NavLink}
              to={`/microns/${micron.id}`}
            >
              <ListItemIcon sx={ListItemIconSx}>
                <TagRoundedIcon />
              </ListItemIcon>
              <Typography fontWeight="normal">
                {micron.title.toLowerCase()}
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemSx}>
            <ListItemButton
              disableRipple
              component={NavLink}
              to={`/microns/${micron.id}/new`}
            >
              <ListItemIcon sx={ListItemIconSx}>
                <AddRounded />
              </ListItemIcon>
              <Typography fontWeight="normal">
                new micron
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemSx}>
            <ListItemButton
              disableRipple
              component={NavLink}
              to={`/microns/${micron.id}/contribution_requests`}
            >
              <ListItemIcon sx={ListItemIconSx}>
                <AccountTreeRoundedIcon />
              </ListItemIcon>
              <Typography fontWeight="normal">
                contribution requests
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemSx}>
            <ListItemButton
              disableRipple
              component={NavLink}
              to={`/microns/${micron.id}/drawing`}
            >
              <ListItemIcon sx={ListItemIconSx}>
                <GestureRoundedIcon />
              </ListItemIcon>
              <Typography fontWeight="normal">
                drawing
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </>
  );
}

MicronShowSidebar.propTypes = {
  micron: PropTypes.object.isRequired,
};
