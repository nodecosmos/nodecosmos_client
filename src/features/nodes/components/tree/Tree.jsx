import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box } from '@mui/material';
/* nodecosmos */
import Node from './Node';
import NodeDescription from './NodeDescription';
import Transformable from './Transformable';

export default function Tree(props) {
  const { id } = props;

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1}>
      <Box
        borderRight={{
          xs: 0,
          md: 1,
        }}
        borderColor={{
          xs: 'borders.box.xs',
          md: 'borders.box.md',
        }}
        boxShadow={{
          xs: 0,
          md: 'boxBorder.right.md',
        }}
        width="61.803%"
        height="100%"
      >
        <Transformable>
          <g>
            <Node
              id={id}
              nestedLevel={0}
              isRoot
            />
          </g>
        </Transformable>
      </Box>
      <Box
        width={{
          xs: 1,
          md: '38.19700%',
        }}
        // position={{
        //   xs: 'sticky',
        //   md: 'static',
        // }}
        // bottom={{
        //   xs: 0,
        //   md: 'auto',
        // }}
      >
        <NodeDescription />
      </Box>
    </Box>
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
