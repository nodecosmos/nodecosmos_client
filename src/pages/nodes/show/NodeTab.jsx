import React from 'react';
/* mui */
import {
  Typography,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function NodeTab() {
  const { id } = useParams();
  const node = useSelector((state) => state.nodes.byId[id]);

  return (
    <Box py={4} px={5} width={1}>
      <Typography className="nodeTabShow" variant="h5" textAlign="center" mb={2}>
        {node.title}
      </Typography>
      <Typography variant="body2" fontWeight="normal">
        {node.description}
      </Typography>
    </Box>
  );
}
