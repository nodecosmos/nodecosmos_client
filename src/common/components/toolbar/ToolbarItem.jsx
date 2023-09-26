import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

export default function ToolbarItem({
  title,
  icon,
  color,
  onClick,
  active,
  flipX,
  titleAsTooltip,
  to,
}) {
  const content = titleAsTooltip ? null : <span>{title}</span>;
  const path = useResolvedPath(to);
  const isPathActive = useMatch(path.pathname);
  const isActive = to ? isPathActive : active;
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    onClick && onClick();
  };

  return (
    <Tooltip title={titleAsTooltip && title} placement="top">
      <Button
        onClick={handleClick}
        size="large"
        className={isActive ? 'active' : ''}
        sx={{
          color: 'toolbar.default',
          '&:hover, &.active': {
            color,
          },
          svg: {
            transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
          },
        }}
      >
        <FontAwesomeIcon icon={icon} />
        {content}
      </Button>
    </Tooltip>
  );
}

ToolbarItem.defaultProps = {
  onClick: null,
  active: false,
  flipX: false,
  titleAsTooltip: true,
  to: null,
};

ToolbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  titleAsTooltip: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  flipX: PropTypes.bool,
  to: PropTypes.string,
};
