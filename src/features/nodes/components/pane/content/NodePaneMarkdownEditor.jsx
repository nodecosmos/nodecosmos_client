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
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const descriptionMarkdown = useSelector(selectNodeAttribute(selectedNodeId, 'descriptionMarkdown'));

  // const handleChange = (value) => {
  //   if (isTemp) return;
  //
  //   if (handleChangeTimeout.current) {
  //     clearTimeout(handleChangeTimeout.current);
  //   }
  //
  //   handleChangeTimeout.current = setTimeout(() => {
  //     const descriptionHtml = md().render(value);
  //     const shortDescription = extractTextFromHtml(descriptionHtml);
  //
  //     dispatch(updateNodeState({
  //       id: selectedNodeId,
  //       description: descriptionHtml,
  //       shortDescription,
  //       descriptionMarkdown: value,
  //     }));
  //     dispatch(updateNodeDescription({
  //       persistentRootId,
  //       persistentId,
  //       description: descriptionHtml,
  //       shortDescription,
  //       descriptionMarkdown: value,
  //     }));
  //   }, 500);
  // };

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
