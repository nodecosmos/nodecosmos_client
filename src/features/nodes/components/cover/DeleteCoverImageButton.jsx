import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedNode } from '../../nodes.selectors';
import { deleteNodeImage } from '../../nodes.thunks';
import { updateNodeState } from '../../nodesSlice';

export default function DeleteCoverImageButton({ displayCoverImageUploadButton }) {
  const { id, persistentRootId, persistentId } = useSelector(selectSelectedNode);
  const dispatch = useDispatch();

  const handleDeleteCoverImage = () => {
    dispatch(deleteNodeImage({
      rootId: persistentRootId,
      id: persistentId,
    })).then((response) => {
      if (response.error) {
        console.log('error deleting cover image');
      } else {
        dispatch(updateNodeState({
          id,
          coverImageUrl: null,
        }));
      }
    });
  };

  return (
    <IconButton
      color="button"
      onClick={handleDeleteCoverImage}
      sx={{
        zIndex: 1,
        opacity: displayCoverImageUploadButton ? 1 : 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
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
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      }}
    >
      <FontAwesomeIcon icon={faClose} />
    </IconButton>
  );
}

DeleteCoverImageButton.propTypes = {
  displayCoverImageUploadButton: PropTypes.bool.isRequired,
};
