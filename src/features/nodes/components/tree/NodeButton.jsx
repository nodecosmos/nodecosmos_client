import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import { NODE_BUTTON_HEIGHT } from './constants';
import NodeToolbar from './NodeToolbar';
import useNodeButtonAnimationStyle from '../../hooks/tree/useNodeButtonAnimationStyle';
import useNodeButtonBackground from '../../hooks/tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';
import NodeButtonText from './NodeButtonText';

export default function NodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isNew = useSelector((state) => state.nodes[id].isNew);

  const { onNodeClick } = useNodeTreeEvents({ id });
  const { backgroundColor } = useNodeButtonBackground({ id, nestedLevel, isRoot });
  const style = useNodeButtonAnimationStyle({ id, isRoot });

  const isCurrentNode = nodeExpanded && id === currentNodeID;

  const buttonClassName = nodeExpanded && 'expanded';

  return (
    <foreignObject className="NodeName" width="500" height={NODE_BUTTON_HEIGHT} x={0} y={0} style={style}>
      <Box display="flex" width="100%">
        <Button
          className={buttonClassName}
          onClick={onNodeClick}
          style={{ backgroundColor }}
          disableRipple={isNew}
        >
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" sx={{ mr: 2 }} />
            <NodeButtonText id={id} />
          </Box>
        </Button>
        <Box filter="none">
          {isCurrentNode && <Box className="NodeActions" sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
        </Box>
      </Box>
    </foreignObject>
  );
}

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
