import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const TreeContext = createContext(undefined);

export default function TreeProvider({
  children, type, onChange, value, rootNodeId,
}) {
  const [shouldRebuildTree, setShouldRebuildTree] = useState(false);
  const selectedNodeIds = new Set(value);

  const onChangeHandler = useCallback((args) => {
    if (onChange) onChange(args);
  }, [onChange]);

  const contextValue = {
    type,
    onChange: onChangeHandler,
    selectedNodeIds,
    rootNodeId,
    shouldRebuildTree,
    setShouldRebuildTree,
  };

  return <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>;
}

TreeProvider.defaultProps = {
  onChange: undefined,
  value: [],
};

TreeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  rootNodeId: PropTypes.string.isRequired,
};
