import React from 'react';
import PropTypes from 'prop-types';
import TagRounded from '@mui/icons-material/TagRounded';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import useNodeButtonBackground from '../../hooks/tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';
import { NODE_BUTTON_HEIGHT } from './constants';

export default function NodeButton(props) {
  const {
    id,
    nestedLevel,
    isRoot,
  } = props;

  const nodeTitle = useSelector((state) => state.nodes.byId[id].title);
  const { onNodeClick } = useNodeTreeEvents(id);
  const {
    backgroundColor,
    color,
  } = useNodeButtonBackground({
    id,
    nestedLevel,
    isRoot,
  });

  return (
    <Button
      className="NodeButton"
      onClick={onNodeClick}
      onKeyUp={(event) => event.preventDefault()}
      style={{
        backgroundColor,
        height: NODE_BUTTON_HEIGHT,
        color,
      }}
    >
      <TagRounded fontSize="small" ml="-2px" />
      <div
        className="NodeButtonText"
        style={{
          cursor: 'pointer!important',
          pointerEvents: 'none',
          color,
        }}
      >
        {nodeTitle}
      </div>
    </Button>
  );
}

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  isRoot: PropTypes.bool.isRequired,
};
