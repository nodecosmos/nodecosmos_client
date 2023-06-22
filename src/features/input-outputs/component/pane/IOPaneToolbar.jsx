import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  faRectangleCode, faCodeFork, faHashtag,
} from '@fortawesome/pro-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectSelectedWorkflowDiagramObject } from '../../../workflows/workflows.selectors';
import { selectInputOutputById, selectIOPaneContent } from '../../inputOutput.selectors';
import { IO_PANE_CONTENTS } from '../../inputOutputs.constants';
import { setIOPaneContent } from '../../inputOutputsSlice';

export default function IOPaneToolbar() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);

  const io = useSelector(selectInputOutputById(selectedWorkflowDiagramObject.id));

  const dispatch = useDispatch();
  const ioPaneContent = useSelector(selectIOPaneContent);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={HEADER_HEIGHT}
      borderBottom={1}
      borderColor="borders.4"
      // boxShadow="2"
    >
      <ToolbarContainer>
        <ToolbarItem
          title="Edit Description Markdown"
          icon={faRectangleCode}
          color="toolbar.lightRed"
          active={ioPaneContent === IO_PANE_CONTENTS.markdown}
          onClick={() => dispatch(setIOPaneContent(IO_PANE_CONTENTS.markdown))}
        />
        <ToolbarItem
          title="View Description"
          icon={faHashtag}
          color="toolbar.green"
          active={ioPaneContent === IO_PANE_CONTENTS.description}
          onClick={() => dispatch(setIOPaneContent(IO_PANE_CONTENTS.description))}
        />
      </ToolbarContainer>

      {ioPaneContent !== 'description' && (
        <Box display="flex" alignItems="center">
          {io.title && <FontAwesomeIcon icon={faCodeFork} />}
          <Typography
            align="center"
            variant="body1"
            ml={1}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {io.title}
          </Typography>
        </Box>
      )}
      <div />
    </Box>
  );
}
