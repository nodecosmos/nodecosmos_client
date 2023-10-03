/* mui */
import React from 'react';
import * as PropTypes from 'prop-types';
import Transformable from '../../../common/components/Transformable';
import { TREES_TYPES } from '../trees.constants';
import { useTreeContextCreator } from '../hooks/useTreeContext';
import TreeNodes from './TreeNodes';

export default function Tree({
  rootNodeId, type, onChange, value,
}) {
  const { TreeContext, contextProviderValue } = useTreeContextCreator({
    type, onChange, value, rootNodeId,
  });

  return (
    <TreeContext.Provider value={contextProviderValue}>
      <Transformable transformableId={rootNodeId}>
        <TreeNodes rootNodeId={rootNodeId} type={type} />
      </Transformable>
    </TreeContext.Provider>
  );
}

Tree.defaultProps = {
  type: TREES_TYPES.default,
  onChange: null,
  value: null,
};

Tree.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array,
};
