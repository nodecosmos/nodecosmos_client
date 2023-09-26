import React, { Suspense } from 'react';
import { Box, Button, CardMedia } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/pro-regular-svg-icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedNode } from '../../nodes.selectors';
import { updateNodeState } from '../../nodesSlice';
import DeleteCoverImageButton from './DeleteCoverImageButton';

const UppyUploadImageModal = React.lazy(() => import('../../../../common/components/uppy/UppyUploadImageModal'));

export default function NodePaneDescriptionCoverImage({ coverImageUrl }) {
  const {
    id, isTemp, rootId,
  } = useSelector(selectSelectedNode);

  const [openCoverImageUploader, setOpenCoverImageUploader] = React.useState(false);
  const [displayCoverImageUploadButton, setDisplayCoverImageUploadButton] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = (responseBody) => {
    setOpenCoverImageUploader(false);

    if (responseBody?.coverImageUrl) {
      dispatch(updateNodeState({
        id,
        coverImageUrl: responseBody.coverImageUrl,
      }));
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {coverImageUrl && (
          <Box
            sx={{
              width: 1,
              height: 475,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              '.AmbientImage': {
                position: 'absolute',
                width: 1,
                height: 375,
                filter: 'blur(50px) opacity(0.5)',
              },
              '.CoverImage': {
                position: 'relative',
                maxWidth: '100%',
                maxHeight: '100%',
                '.CoverImageMedia': {
                  borderRadius: 5,
                  maxWidth: '100%',
                  width: 850,
                  maxHeight: 375,
                },
              },
            }}
          >

            <CardMedia
              className="AmbientImage"
              component="img"
              image={coverImageUrl}
              alt="Cover Image Ambient"
            />
            <Box
              className="CoverImage"
              onMouseOver={() => setDisplayCoverImageUploadButton(true)}
              onMouseLeave={() => setDisplayCoverImageUploadButton(false)}
            >
              <DeleteCoverImageButton displayCoverImageUploadButton={displayCoverImageUploadButton} />
              <CardMedia
                className="CoverImageMedia"
                component="img"
                image={coverImageUrl}
                alt="Cover Image"
              />
              <Button
                component="label"
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faCamera} />}
                onClick={() => setOpenCoverImageUploader(true)}
                sx={{
                  opacity: displayCoverImageUploadButton ? 0.8 : 0,
                  transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                  position: 'absolute',
                  backgroundColor: 'background.1',
                  color: 'text.primary',
                  bottom: 16,
                  right: 16,
                  '&:hover': {
                    backgroundColor: 'background.1',
                  },
                }}
              >
                Upload cover image
              </Button>
            </Box>
          </Box>
        )}

      </Box>
      {!coverImageUrl && !isTemp && (
        <Box
          w={1}
          mt={0}
          mb={-5}
          display="flex"
          justifyContent="center"
          p={4}
        >
          <Button
            component="label"
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faCamera} />}
            onClick={() => setOpenCoverImageUploader(true)}
            color="buttonContrast"
          >
            Upload cover image
          </Button>
        </Box>
      )}

      {openCoverImageUploader && (
      <Suspense>
        <UppyUploadImageModal
          open={openCoverImageUploader}
          onClose={handleClose}
          endpointPath={`nodes/${rootId}/${id}/upload_cover_image`}
        />
      </Suspense>
      )}
    </>

  );
}

NodePaneDescriptionCoverImage.defaultProps = {
  coverImageUrl: null,
};

NodePaneDescriptionCoverImage.propTypes = {
  coverImageUrl: PropTypes.string,
};
