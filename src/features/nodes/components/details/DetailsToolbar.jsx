import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import EditRounded from '@mui/icons-material/EditRounded';
import { Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
  faDiagramNested,
} from '@fortawesome/pro-solid-svg-icons';
import { updateNodeState } from '../../nodesSlice';

export default function DetailsToolbar(props) {
  const { id } = props;

  const dispatch = useDispatch();

  if (!id) return <div />; // empty div for flexbox alignment

  return (
    <Box sx={{
      svg: {
        color: 'background.list.default',
      },
    }}
    >
      <IconButton
        className="Item"
        onClick={() => dispatch(updateNodeState({ id, isEditingDescription: true }))}
        aria-label="Edit Description"
      >
        <EditRounded fontSize="medium" />
      </IconButton>
      <IconButton
        className="Item"
        onClick={() => dispatch(updateNodeState({ id, isEditingDescription: false }))}
        aria-label="Edit Description"
      >
        <RemoveRedEyeOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        className="Item"
        onClick={() => dispatch(updateNodeState({ id, isEditingDescription: false }))}
        aria-label="Workflow"
      >
        <FontAwesomeIcon
          icon={faDiagramNested}
        />
      </IconButton>
    </Box>
  );
}

DetailsToolbar.defaultProps = {
  id: null,
};

DetailsToolbar.propTypes = {
  id: PropTypes.string,
};
