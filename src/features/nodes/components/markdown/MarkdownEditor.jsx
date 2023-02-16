import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import md from 'markdown-it';
/* nodecosmos */
import { selectNodeAttribute } from '../../nodes.selectors';
import { updateNode } from '../../nodes.thunks';
import { updateNodeState } from '../../nodesSlice';

const CustomCodeMirror = React.lazy(() => import('../../../../common/components/CustomCodeMirror'));

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

export default function MarkdownEditor(props) {
  const { id } = props;

  const dispatch = useDispatch();
  const handleChangeTimeout = React.useRef(null);
  const descriptionMarkdown = useSelector(selectNodeAttribute(id, 'descriptionMarkdown'));

  const handleChange = (value) => {
    if (handleChangeTimeout.current) {
      clearTimeout(handleChangeTimeout.current);
    }

    handleChangeTimeout.current = setTimeout(() => {
      const descriptionHtml = md().render(value);

      dispatch(updateNodeState({
        id,
        description: descriptionHtml,
        descriptionMarkdown: value,
      }));

      dispatch(updateNode({ id, description: descriptionHtml, description_markdown: value }));
    }, 500);
  };

  return (
    <Suspense fallback={loading}>
      <Box height={1}>
        <CustomCodeMirror value={descriptionMarkdown || ''} onChange={handleChange} />
      </Box>
    </Suspense>
  );
}

MarkdownEditor.propTypes = {
  id: PropTypes.string.isRequired,
};
