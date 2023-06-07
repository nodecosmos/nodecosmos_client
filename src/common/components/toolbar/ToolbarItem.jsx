import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@mui/material';

export default function ToolbarItem({
  title,
  icon,
  color,
  onClick,
  active,
}) {
  return (
    <Tooltip title={title} placement="top">
      <Button
        onClick={onClick}
        size="large"
        className={active ? 'active' : ''}
        sx={{
          color: 'toolbar.default',
          '&:hover, &.active': { color },
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </Button>
    </Tooltip>
  );
}

ToolbarItem.defaultProps = {
  onClick: () => {},
  active: false,
};

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
