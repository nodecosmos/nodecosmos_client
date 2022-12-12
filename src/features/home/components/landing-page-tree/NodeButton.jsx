import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import useNodeButtonAnimationStyle from '../../hooks/landing-page-tree/useNodeButtonAnimationStyle';
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/landing-page-tree/useNodeTreeEvents';
import { NODE_BUTTON_HEIGHT } from './constants';
import NodeButtonText from './NodeButtonText';
import NodeToolbar from './NodeToolbar';

export default function NodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
    upperSiblingID,
  } = props;

  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isEditing = useSelector((state) => state.landingPageNodes[id].isEditing);

  const { onNodeClick } = useNodeTreeEvents({ id });
  const { backgroundColor } = useNodeButtonBackground({
    id,
    nestedLevel,
    isRoot,
  });
  const style = useNodeButtonAnimationStyle({
    id,
    isRoot,
    upperSiblingID,
    nestedLevel,
  });

  const isCurrentNode = nodeExpanded && id === currentNodeID;
  const hasNestedNodes = useSelector((state) => state.landingPageNodes[id].node_ids.length > 0);

  const isNodeColored = (nodeExpanded && isCurrentNode) || (nodeExpanded && hasNestedNodes) ? 'expanded' : null;

  return (
    <foreignObject className="NodeName" width="500" height={NODE_BUTTON_HEIGHT} x={0} y={0} style={style}>
      <Box display="flex" width="100%">
        <Box
          component={isEditing ? 'div' : Button}
          onClick={onNodeClick}
          onKeyUp={(event) => event.preventDefault()}
          display="inline-flex"
          alignItems="center"
          sx={{
            backgroundColor,
            height: NODE_BUTTON_HEIGHT,
            color: isNodeColored ? 'rgb(0 0 0 / 70%)' : '#fff',
            input: {
              color: isNodeColored ? 'rgb(0 0 0 / 70%)' : '#fff',
            },
            '&:hover': {
              backgroundColor,
            },
            borderRadius: 1.5,
            p: 1,
            cursor: 'pointer',
          }}
        >
          <TagRounded fontSize="small" />
          <NodeButtonText id={id} />
        </Box>
        <Box filter="none">
          {isCurrentNode && <Box className="NodeActions" sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
        </Box>
      </Box>
    </foreignObject>
  );
}

NodeButton.defaultProps = {
  upperSiblingID: null,
};

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  upperSiblingID: PropTypes.string,
};
