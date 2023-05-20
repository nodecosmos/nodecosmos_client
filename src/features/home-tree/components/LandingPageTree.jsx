import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import { terminateNewNode } from '../landingPageNodeSlice';
import LandingPageNode from './LandingPageNode';
import LandingPageNodeDescription from './LandingPageNodeDescription';
import SwipeableEdgeDrawer from './LandingPageSwipeableNodeDescMobile';
import LandingPageTransformable from './LandingPageTransformable';
import LandingPageNestedNodes from './LandingPageNestedNodes';

export default function LandingPageTree(props) {
  const { id } = props;
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(terminateNewNode());
  }, [dispatch]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className="Tree">
      <LandingPageTransformable>
        <g>
          <LandingPageNode
            id={id}
            nestedLevel={0}
            isRoot
          >
            <LandingPageNestedNodes currentNodeId={id} />
          </LandingPageNode>
          {!isMobile && <LandingPageNodeDescription />}
        </g>
      </LandingPageTransformable>
      <Box
        backgroundColor="background.6"
        borderRadius={1}
        overflow="hidden"
        boxShadow="buttons.1"
        position="sticky"
        my={0}
        bottom={0}
        mx={{
          xs: -3,
          sm: -4,
        }}
      >
        {isMobile && <SwipeableEdgeDrawer />}
      </Box>
    </Box>
  );
}

LandingPageTree.propTypes = {
  id: PropTypes.string.isRequired,
};
