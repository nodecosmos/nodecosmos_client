import React from 'react';
import PropTypes from 'prop-types';
import TagRounded from '@mui/icons-material/TagRounded';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';
import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { NODE_BUTTON_HEIGHT } from '../trees.constants';
import { selectTreeNodeAttribute } from '../trees.selectors';

export default function NodeButton(props) {
  const {
    treeNodeId,
  } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));

  const { onNodeClick } = useNodeTreeEvents(treeNodeId);
  const { backgroundColor, color } = useNodeButtonBackground(treeNodeId);

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
        {title}
      </div>
    </Button>
  );
}

NodeButton.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
