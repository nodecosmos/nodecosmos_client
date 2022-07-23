import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import useNodeTreeEvents from '../services/useNodeTreeEvents';

export default function NodeButtonText(props) {
  const { id } = props;

  const nodeTitle = useSelector((state) => state.nodes[id].title);
  const isNew = useSelector((state) => state.nodes[id].isNew);
  const parentId = useSelector((state) => state.nodes[id].parent_id);

  const { handleNodeCreation } = useNodeTreeEvents({ id: parentId });

  const sx = { outline: 'none', minWidth: 30 };
  if (isNew) sx.cursor = 'text';

  return (
    <Box contentEditable={isNew} sx={sx} onInput={handleNodeCreation}>
      {nodeTitle}
    </Box>
  );
}

NodeButtonText.propTypes = {
  id: PropTypes.string.isRequired,
};
