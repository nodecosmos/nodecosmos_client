/* mui */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';
import { setPositionsById } from '../../nodeSlice';
import treePositionCalculator from '../../services/tree/treePositionCalculator';
/* nodecosmos */
import Node from './Node';
import NodeDescription from './NodeDescription';
import Transformable from './Transformable';

export default function Tree(props) {
  const { id } = props;
  const [isPositionSet, setIsPositionSet] = React.useState(false);
  const childrenIdsByNodeId = useShallowEqualSelector((state) => {
    const result = {};
    Object.keys(state.nodes.byId).forEach((nodeId) => {
      const node = state.nodes.byId[nodeId];

      result[nodeId] = node.node_ids;
    });
    return result;
  });

  const { allTreeNodes, allTreeNodeIds, positionsById } = treePositionCalculator({ id, childrenIdsByNodeId });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPositionsById(positionsById));
    setIsPositionSet(true);
  }, [dispatch, positionsById]);

  if (!isPositionSet) return null;

  return (
    <Box
      display={{
        xs: 'block',
        md: 'flex',
      }}
      width={1}
      height={1}
    >
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
        <Transformable transformableId={id}>
          <g>
            {
              allTreeNodes.map((nodeProps, index) => (
                <Node
                  key={nodeProps.id}
                  id={nodeProps.id}
                  allTreeNodeIds={allTreeNodeIds}
                  allTreeNodesIndex={index}
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
