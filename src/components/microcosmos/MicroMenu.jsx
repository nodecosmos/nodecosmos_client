import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  IconButton,
  ListItemIcon,
} from '@mui/material';
/* micro */
import history from '../../history';

export default function MicroMenu(props) {
  const {
    title, icon, menuItems, sx, className,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menuItem) => {
    setAnchorEl(null);

    if (menuItem.href) {
      history.push(menuItem.href);
    } else if (menuItem.click) {
      menuItem.click();
    }
  };

  return (
    <Box sx={sx}>
      <IconButton
        className={className}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableRipple
        variant="outlined"
        onClick={handleClick}
      >
        {title || icon}
      </IconButton>
      <Menu
        elevation={1}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          sx: {
            padding: 0,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2,
          },
        }}
      >
        {menuItems.map((menuItem) => (
          <MenuItem onClick={() => handleClose(menuItem)} key={menuItem.title}>
            {menuItem.icon && (
            <ListItemIcon>
              {menuItem.icon}
            </ListItemIcon>
            )}
            <Typography variant="body2" color="text.secondary">
              {menuItem.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

MicroMenu.defaultProps = {
  title: null,
  icon: null,
  className: null,
  sx: {},
};

MicroMenu.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  sx: PropTypes.object,
};
