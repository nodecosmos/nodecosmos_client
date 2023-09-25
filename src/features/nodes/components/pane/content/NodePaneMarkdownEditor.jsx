import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import {
  selectNodeAttribute,
  selectSelectedNodeId,
} from '../../../nodes.selectors';
import Loader from '../../../../../common/components/Loader';

const CustomCodeMirror = React.lazy(() => import('../../../../../common/components/codemirror/CodeMirrorEditor'));

export default function NodePaneMarkdownEditor() {
  const id = useSelector(selectSelectedNodeId);

  const descriptionMarkdown = useSelector(selectNodeAttribute(id, 'descriptionMarkdown'));

  return (
    <Suspense fallback={<Loader />}>
      <Box height={1}>
        <CustomCodeMirror
          value={descriptionMarkdown || ''}
          editable={false}
        />
      </Box>
    </Suspense>
  );
}
