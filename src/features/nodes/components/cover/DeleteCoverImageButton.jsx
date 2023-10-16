import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { selectSelectedNode } from '../../nodes.selectors';
import { deleteNodeImage } from '../../nodes.thunks';
import { updateNodeState } from '../../nodesSlice';

export default function DeleteCoverImageButton({ displayCoverImageUploadButton }) {
  const { id } = useSelector(selectSelectedNode);
  const dispatch = useDispatch();

  const handleDeleteCoverImage = useCallback(() => {
    dispatch(deleteNodeImage(id)).then((response) => {
      if (response.error) {
        console.error('Error deleting cover image');
      } else {
        dispatch(updateNodeState({
          id,
          coverImageUrl: null,
        }));
      }
    });
  }, [dispatch, id]);

  return (
    <Tooltip title="Delete Cover Image">
      <IconButton
        color="button"
        onClick={handleDeleteCoverImage}
        sx={{
          zIndex: 1,
          backgroundColor: 'background.1',
          opacity: displayCoverImageUploadButton ? 0.8 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          borderRadius: '50%',
          top: 16,
          right: 24,
          width: 30,
          height: 30,
          p: 0,
          svg: {
            color: 'button.contrastText',
            fontSize: 18,
          },
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </IconButton>
    </Tooltip>
  );
}

DeleteCoverImageButton.propTypes = {
  displayCoverImageUploadButton: PropTypes.bool.isRequired,
};
