import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedNode, selectSelectedNodeId } from '../../../nodes.selectors';

export default function NodePaneDescription({ loading }) {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const { title, description } = useSelector(selectSelectedNode);

  if (!selectedNodeId) return null;

  if (loading) {
    return <Loader />;
  }

  const nodeNotSelectedContent = (
    <Typography color="text.secondary" align="center" fontSize={30}>
      ¯\_(ツ)_/¯
    </Typography>
  );

  const nodeHasNoDescriptionContent = (
    <Typography color="text.secondary">
      This node has no description yet.
    </Typography>
  );

  const blankDescription = (selectedNodeId && nodeHasNoDescriptionContent) || nodeNotSelectedContent;

  return (
    <DescriptionContainer>
      <Box
        component="h1"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {title && '# '}
        {title}
      </Box>
      {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
    </DescriptionContainer>
  );
}

NodePaneDescription.propTypes = {
  loading: PropTypes.bool.isRequired,
};
