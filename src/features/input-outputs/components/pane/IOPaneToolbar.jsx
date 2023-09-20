import React from 'react';
import {
  faPenToSquare, faTrash, faRectangleCode, faCodeFork, faDisplay,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton, Tooltip, Typography, Box,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../app/constants';
import EditIOModal from '../EditIOModal';
import ToggleWorkflowPaneButton from '../../../workflows/components/pane/ToggleWorkflowPaneButton';
import { selectSelectedWorkflowDiagramObject } from '../../../workflows/workflows.selectors';
import { selectInputOutputById, selectIOPaneContent } from '../../inputOutputs.selectors';
import { deleteIO } from '../../inputOutputs.thunks';
import { IO_PANE_CONTENTS } from '../../inputOutputs.constants';
import { setIOPaneContent } from '../../inputOutputsSlice';

export default function IOPaneToolbar() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const io = useSelector(selectInputOutputById(selectedWorkflowDiagramObject.id));
  const dispatch = useDispatch();
  const ioPaneContent = useSelector(selectIOPaneContent);
  const [openEditIO, setOpenEditIO] = React.useState(false);

  const handleDeleteIO = () => {
    dispatch(deleteIO({ id: io.id, workflowId: io.workflowId, nodeId: io.nodeId }));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={HEADER_HEIGHT}
      borderBottom={1}
      borderColor="borders.2"
      boxShadow="2"
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
          title="Edit Description"
          icon={faPenToSquare}
          color="toolbar.green"
          active={ioPaneContent === IO_PANE_CONTENTS.editor}
          onClick={() => dispatch(setIOPaneContent(IO_PANE_CONTENTS.editor))}
        />
        <ToolbarItem
          title="View Description"
          icon={faDisplay}
          color="toolbar.blue"
          active={ioPaneContent === IO_PANE_CONTENTS.description}
          onClick={() => dispatch(setIOPaneContent(IO_PANE_CONTENTS.description))}
        />
      </ToolbarContainer>

      <Box display="flex" alignItems="center" sx={{ svg: { color: 'background.list.defaultColor', mr: 0.5, ml: 1 } }}>
        {io.title && <FontAwesomeIcon icon={faCodeFork} />}
        <Typography
          align="center"
          variant="body1"
          color="text.secondary"
          ml={1}
          sx={{
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {io.title}
        </Typography>

        <Box
          display="flex"
          sx={{
            ml: 1,
            '.Item': {
              width: 31,
              height: 1,
              mx: 0.25,
              borderRadius: 1,
              '&:hover': { backgroundColor: 'toolbar.hover' },
            },
            '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
          }}
        >
          <Tooltip title="Edit IO Title" placement="top">
            <IconButton
              className="Item"
              aria-label="Edit IO Title"
              sx={{ svg: { color: 'toolbar.green' } }}
              onClick={() => setOpenEditIO(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete IO" placement="top">
            <IconButton
              className="Item"
              aria-label="Delete Flow"
              sx={{ svg: { color: 'toolbar.lightRed' } }}
              onClick={handleDeleteIO}
            >
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box>
        <ToggleWorkflowPaneButton />
      </Box>

      <EditIOModal id={io.id} open={openEditIO} onClose={() => setOpenEditIO(false)} />
    </Box>
  );
}
