/* mui */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useRenderNodeInViewport from '../../hooks/tree/useRenderNodeInViewport';
import useTreePositionCalculator from '../../hooks/tree/useTreePositionCalculator';
import { setPositionsById } from '../../nodeSlice';

/* nodecosmos */
import Node from './Node';
import NodeDescription from './NodeDescription';
import Transformable from './Transformable';

export default function Tree(props) {
  const { id } = props;
  const { allTreeNodes, positionsById } = useTreePositionCalculator(id);
  const renderedNodes = useRenderNodeInViewport({ transformableId: id, allTreeNodes });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPositionsById(positionsById));
  }, [dispatch, positionsById]);

  return (
    <Box
      display={{ xs: 'block', md: 'flex' }}
      width={1}
      height={1}
    >
      <Box
        borderRight={{ xs: 0, md: 1 }}
        borderColor={{ xs: 'borders.box.xs', md: 'borders.box.md' }}
        boxShadow={{ xs: 0, md: 'boxBorder.right.md' }}
        width="61.803%"
        height="100%"
      >
        <Transformable rootId={id}>
          <g>
            {
              renderedNodes.map((nodeProps) => (
                <Node
                  key={nodeProps.id}
                  id={nodeProps.id}
                  treeId={id}
                  nestedLevel={nodeProps.nestedLevel}
                  upperSiblingId={nodeProps.upperSiblingId}
                  lastChildId={nodeProps.lastChildId}
                  isRoot={nodeProps.nestedLevel === 0}
                />
              ))
            }
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
