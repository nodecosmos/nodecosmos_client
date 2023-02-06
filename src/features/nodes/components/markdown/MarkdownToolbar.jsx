import React from 'react';
import PropTypes from 'prop-types';
import EditRounded from '@mui/icons-material/EditRounded';
import { Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { setEditNodeDescription } from '../../nodesSlice';

export default function MarkdownToolbar(props) {
  const { id } = props;

  const dispatch = useDispatch();

  if (!id) return <div />; // empty div for flexbox alignment

  return (
    <Box>
      <IconButton
        className="Item"
        onClick={() => dispatch(setEditNodeDescription({ id, value: true }))}
        aria-label="Edit Description"
      >
        <EditRounded fontSize="medium" sx={{ color: 'text.secondary' }} />
      </IconButton>
      <IconButton
        className="Item"
        onClick={() => dispatch(setEditNodeDescription({ id, value: false }))}
        aria-label="Edit Description"
      >
        <RemoveRedEyeOutlinedIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
      </IconButton>
    </Box>
  );
}

MarkdownToolbar.defaultProps = {
  id: null,
};

MarkdownToolbar.propTypes = {
  id: PropTypes.string,
};
