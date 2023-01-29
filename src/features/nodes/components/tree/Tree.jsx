/* mui */
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useRenderNodeInViewport from '../../hooks/tree/useRenderNodeInViewport';
import useTreePositionCalculator from '../../hooks/tree/useTreePositionCalculator';
import { setPositionsById } from '../../nodeSlice';

/* nodecosmos */
import Node from './Node';
import Transformable from './Transformable';

export default function Tree(props) {
  const { id } = props;
  const { allTreeNodes, positionsById } = useTreePositionCalculator(id);
  const renderedNodes = useRenderNodeInViewport({ transformableId: id, allTreeNodes });

  const dispatch = useDispatch();
  useEffect(() => { dispatch(setPositionsById(positionsById)); }, [dispatch, positionsById]);

  return (
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
  );
}

Tree.propTypes = {
  id: PropTypes.string.isRequired,
};
