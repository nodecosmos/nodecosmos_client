import React from 'react';
import PropTypes from 'prop-types';
import Tree from '../../../features/nodes/components/tree/Tree';

export default function TreeTab(props) {
  const { id } = props;

  return (
    <Tree id={id} />
  );
}

TreeTab.propTypes = {
  id: PropTypes.string.isRequired,
};
