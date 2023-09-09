import React, { useEffect } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import ImageEditor from '@uppy/image-editor';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { Box, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import XHRUpload from '@uppy/xhr-upload';
import nodecosmos from '../../apis/nodecosmos-server';
import CloseModalButton from './CloseModalButton';

const uppy = new Uppy({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png'],
  },
  locale: {
    strings: {
      // Change the 'Drop files here, paste or browse' message
      browse: 'Drop files here, paste, browse or %{browse}',

      // Change the 'Uploading %{smart_count} file' message
      uploading: 'Uploading %{smart_count} file',

      // Change other messages as needed
    },
  },
}).use(ImageEditor, {
  id: 'ImageEditor',
  quality: 0.8,
  actions: {
    revert: true,
    rotate: false,
    granularRotate: false,
    flip: false,
    zoomIn: true,
    zoomOut: true,
    cropSquare: false,
    cropWidescreen: false,
    cropWidescreenVertical: false,
  },
});
uppy.use(XHRUpload, {
  formData: true,
  method: 'POST',
  allowedMetaFields: [],
  metaFields: null,
  withCredentials: true,
});

export default function UppyUploadImageModal({
  open, onClose, endpointPath, aspectRatio,
}) {
  const uri = nodecosmos.getUri();

  useEffect(() => {
    const xhrUpload = uppy.getPlugin('XHRUpload');
    if (xhrUpload) {
      xhrUpload.setOptions({
        endpoint: `${uri}${endpointPath}`,
      });
    }
  }, [endpointPath, uri]);

  useEffect(() => {
    const imageEditor = uppy.getPlugin('ImageEditor');
    if (imageEditor) {
      imageEditor.setOptions({
        cropperOptions: {
          viewMode: 3,
          aspectRatio,
          rotatable: false,
        },
      });
    }
  }, [aspectRatio, uri]);

  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      uppy.cancelAll();
      onClose(response.body);
    });

    uppy.on('file-editor:complete', (file) => {
      uppy.upload();
    });

    return () => {
      uppy.off('upload-success');
    };
  }, [onClose]);

  // https://github.com/transloadit/uppy/issues/4045
  // until this issue is fixed, we need to manually remove the file from uppy on cancel
  uppy.on('file-editor:start', (file) => {
    const selector = '#uppy-DashboardContent-panel--editor >'
      + ' div.uppy-DashboardContent-bar > button.uppy-DashboardContent-back';

    new Promise((resolve) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        return;
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }).then(() => {
      document.querySelector(selector)?.addEventListener('click', () => {
        uppy.removeFile(file.id);
      });
    });
  });

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => {
        uppy.cancelAll();
        onClose();
      }}
      PaperProps={{
        elevation: 8,
      }}
    >
      <DialogTitle>
        Upload Cover Image
        <CloseModalButton onClose={() => {
          uppy.cancelAll();
          onClose();
        }}
        />
      </DialogTitle>
      <DialogContent>
        <Box sx={{
          '.uppy-Dashboard-inner': {
            backgroundColor: 'transparent!important',
            border: 'none!important',
            width: '100%!important',
          },
          '.uppy-DashboardContent-panel, .uppy-Dashboard-FileCard, .uppy-StatusBar, .uppy-StatusBar-actions': {
            backgroundColor: 'transparent!important',
            borderTop: 'none!important',
          },
          '.uppy-StatusBar:before': {
            backgroundColor: 'transparent!important',
          },
          '.uppy-DashboardContent-bar': {
            backgroundColor: 'transparent!important',
          },
          '.uppy-Dashboard-AddFiles': {
            border: 'none!important',
          },
          '.uppy-Dashboard-poweredBy, .uppy-DashboardContent-title': {
            display: 'none',
          },
          '.cropper-modal': {
            backgroundColor: '#ffffff5c',
          },
        }}
        >
          <Dashboard
            uppy={uppy}
            autoOpenFileEditor
            theme="dark"
            plugins={['ImageEditor']}
            showLinkToFileUploadResult={false}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

UppyUploadImageModal.defaultProps = {
  aspectRatio: 852 / 350,
};

UppyUploadImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  endpointPath: PropTypes.string.isRequired, // no leading slash
  aspectRatio: PropTypes.number,
};
