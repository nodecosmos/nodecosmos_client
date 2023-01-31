import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import Node from './Node';
import NodeDescription from './NodeDescription';
import SwipeableEdgeDrawer from './SwipableNodeDescMobile';
import Transformable from './Transformable';
import NestedNodes from './NestedNodes';
import { terminateNewNode } from './landingPageNodeSlice';

export default function Tree(props) {
  const { id } = props;
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(terminateNewNode());
  }, [dispatch]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      className="Tree"
      display={{
        xs: 'block',
        md: 'flex',
      }}
      sx={{
        width: 1,
      }}
    >
      <Transformable>
        <g>
          <Node
            id={id}
            nestedLevel={0}
            isRoot
          >
            <NestedNodes currentNodeId={id} />
          </Node>
        </g>
      </Transformable>

      <Box
        width={{
          md: '38.19700%',
        }}
        position={{
          xs: 'sticky',
          md: 'static',
        }}
        bottom={{
          xs: 0,
          md: 'auto',
        }}
      >
        {!isMobile && <NodeDescription />}
        {isMobile && <SwipeableEdgeDrawer />}
      </Box>
    </Box>
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
