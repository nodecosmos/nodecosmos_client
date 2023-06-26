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
  flipX,
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
          svg: {
            transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
          },
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
  flipX: false,
};

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  flipX: PropTypes.bool,
};
