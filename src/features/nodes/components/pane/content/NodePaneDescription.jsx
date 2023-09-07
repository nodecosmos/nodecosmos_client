import React from 'react';
import { Typography, Box, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedNode, selectSelectedNodeId } from '../../../nodes.selectors';

export default function NodePaneDescription() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const { description, coverImageUrl } = useSelector(selectSelectedNode);

  if (!selectedNodeId) return null;

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
    <div>
      {coverImageUrl && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 475,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            '.AmbientImage': {
              position: 'absolute',
              width: '100%',
              height: 350,
              filter: 'blur(50px) opacity(0.5)',
            },
            '.CoverImage': {
              position: 'relative',
              maxWidth: 852,
              maxHeight: '100%',
              borderRadius: 5,
            },
          }}
        >
          <CardMedia
            className="AmbientImage"
            component="img"
            image={coverImageUrl}
            alt="Cover Image Ambient"
          />
          <CardMedia
            className="CoverImage"
            component="img"
            image={coverImageUrl}
            alt="Cover Image"
          />
        </Box>
      )}
      <DescriptionContainer>

        {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
      </DescriptionContainer>
    </div>
  );
}
