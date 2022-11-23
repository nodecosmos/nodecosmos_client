import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import {
  Box, Card, CardContent, CardHeader, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NodeAvatar from '../../../app/components/NodeAvatar';
/* nodecosmos */
import Node from './Node';
import NodeDescription from './NodeDescription';
import Transformable from './Transformable';
import NestedNodes from './NestedNodes';
import { terminateNewNode } from '../../nodeSlice';

export default function Tree(props) {
  const { id } = props;
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(terminateNewNode());
  }, [dispatch]);

  return (
    <Box className="Tree" sx={{ width: 1, height: 1 }}>
      <Transformable>
        <g>
          <Node
            id={id}
            nestedLevel={0}
            isRoot
          >
            <NestedNodes currentNodeId={id} />
          </Node>
          <NodeDescription />
        </g>
      </Transformable>
    </Box>
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
