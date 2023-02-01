import React, { Suspense } from 'react';
import { useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const MarkdownPreview = React.lazy(() => import('@uiw/react-markdown-preview'));

const loading = (
  <Box display="flex" alignItems="center" justifyContent="center" mb={8}>
    <CircularProgress
      size={100}
      sx={{
        mt: {
          xs: 6,
          sm: 7,
        },
        color: 'background.4',
      }}
    />
  </Box>
);

export default function NodeMarkdownPreview(props) {
  const { id } = props;
  const theme = useTheme();

  const description = useSelector((state) => state.nodes.byId[id]?.description);

  // TODO: this is to be used once we use different markdown-to-html parsers
  // if (isEditingDescription === undefined) {
  //   content = <Box p={3} dangerouslySetInnerHTML={{ __html: description }} />;
  // }
  //

  const content = (
    <Box sx={{
      '.wmde-markdown hr': {
        height: 0,
      },
      ".wmde-markdown[data-color-mode*='dark']": {
        '--color-border-muted': theme.palette.markdownContent.border,
        '--color-canvas-subtle': theme.palette.markdownContent.canvas,
        '--color-canvas-default': theme.palette.markdownContent.background,
        '--color-border-default': theme.palette.markdownContent.border,
      },
    }}
    >
      <Suspense fallback={loading}>
        <Box m={4}>
          <MarkdownPreview
            warpperElement={{ 'data-color-mode': 'dark' }}
            source={description}
          />
        </Box>
      </Suspense>
    </Box>
  );

  return (
    <Box>
      {content}
    </Box>
  );
}

NodeMarkdownPreview.defaultProps = {
  id: null,
};

NodeMarkdownPreview.propTypes = {
  id: PropTypes.string,
};
