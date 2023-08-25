import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { HEADER_HEIGHT } from '../../features/app/constants';
import DescriptionContainer from './DescriptionContainer';

export default function RemirrorEditorContainer({ children }) {
  return (
    <Box
      sx={{
        height: '100%',
        '.MuiStack-root': {
          backgroundColor: 'background.5',
          borderColor: 'borders.2',
          pb: 0.5,
          pl: 0.5,
          height: HEADER_HEIGHT,
          boxShadow: '2',
        },
        '.MuiBox-root': {
          backgroundColor: 'background.5',
        },
        '.remirror-editor-wrapper': {
          height: `calc(100% - ${HEADER_HEIGHT})`,
          overflow: 'auto',
          p: 4,
        },
        '.MuiButtonBase-root': {
          color: 'text.secondary',
          backgroundColor: 'background.5',
          border: 0,
          borderColor: 'borders.2',
          mr: 0.5,

          '&.Mui-selected': {
            backgroundColor: 'background.8',
            color: 'text.secondary',
            '&:hover': {
              color: 'text.secondary',
              backgroundColor: 'background.8',
            },
          },

          '&.Mui-disabled': {
            backgroundColor: 'background.5',
            color: 'text.disabled',
          },
        },
      }}
    >
      <DescriptionContainer p={0}>
        {children}
      </DescriptionContainer>
    </Box>
  );
}

RemirrorEditorContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
