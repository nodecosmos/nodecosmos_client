import React from 'react';
import { useTheme } from '@mui/material';

export default function IOBranch() {
  const theme = useTheme();

  return (
    <g>
      <path
        strokeWidth={3.5}
        d={`M ${75} ${80}
            L ${75} ${120}`}
        stroke={theme.palette.tree.default}
        fill="transparent"
      />
    </g>
  );
}
