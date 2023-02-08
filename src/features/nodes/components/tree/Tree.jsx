/* mui */
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useTreePositionCalculator from '../../hooks/tree/useTreePositionCalculator';
import { setPositionsById } from '../../nodesSlice';

/* nodecosmos */
import Node from './Node';
import Transformable from './Transformable';

export default function Tree(props) {
  const { id } = props;
  const { positionsById, viewportNodes } = useTreePositionCalculator(id);

  const dispatch = useDispatch();
  useEffect(() => { dispatch(setPositionsById(positionsById)); }, [dispatch, positionsById]);

  return (
    <Transformable rootId={id}>
      <g>
        {
          viewportNodes.map((nodeProps) => (
            <Node
              key={nodeProps.id}
              id={nodeProps.id}
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
