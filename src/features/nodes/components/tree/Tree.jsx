/* mui */
import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';
/* nodecosmos */
import Node from './Node';
import NodeDescription from './NodeDescription';
import Transformable from './Transformable';

export default function Tree(props) {
  const { id } = props;
  const allNodeIds = useShallowEqualSelector((state) => Object.keys(state.nodes));
  const nestedNodeIds = useShallowEqualSelector((state) => {
    const result = {};
    allNodeIds.forEach((nodeId) => {
      const node = state.nodes[nodeId];
      if (!node) console.log(nodeId);

      result[nodeId] = node.node_ids;
    });
    return result;
  });

  const treeNodes = useMemo(() => {
    const allTreeNodes = [];

    const renderNodesAsFlatArray = (nodeId = id, nestedLevel = 0, currentUpperSiblingId = null) => {
      allTreeNodes.push(
        {
          id: nodeId,
          nestedLevel,
          upperSiblingId: currentUpperSiblingId,
        },
      );

      const childrenIds = nestedNodeIds[nodeId];
      childrenIds.forEach((nestedNodeId, index) => {
        const upperSiblingId = childrenIds[index - 1];
        renderNodesAsFlatArray(nestedNodeId, nestedLevel + 1, upperSiblingId);
      });
    };

    renderNodesAsFlatArray();

    return allTreeNodes;
  }, [id, nestedNodeIds]);

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
        <Transformable>
          <g>
            {
              treeNodes.map((nodeProps) => (
                <Node
                  key={nodeProps.id}
                  id={nodeProps.id}
                  nestedLevel={nodeProps.nestedLevel}
                  upperSiblingId={nodeProps.upperSiblingId}
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
