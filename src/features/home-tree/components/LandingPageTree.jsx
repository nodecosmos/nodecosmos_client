import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import LandingPageNode from './LandingPageNode';
import LandingPageNodeDescription from './LandingPageNodeDescription';
import SwipeableEdgeDrawer from './LandingPageSwipableNodeDescMobile';
import LandingPageTransformable from './LandingPageTransformable';
import LandingPageNestedNodes from './LandingPageNestedNodes';
import { terminateNewNode } from '../landingPageNodeSlice';

export default function LandingPageTree(props) {
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
      <LandingPageTransformable>
        <g>
          <LandingPageNode
            id={id}
            nestedLevel={0}
            isRoot
          >
            <LandingPageNestedNodes currentNodeId={id} />
          </LandingPageNode>
        </g>
      </LandingPageTransformable>

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
        {!isMobile && <LandingPageNodeDescription />}
        {isMobile && <SwipeableEdgeDrawer />}
      </Box>
    </Box>
  );
}

LandingPageTree.propTypes = {
  id: PropTypes.string.isRequired,
};
