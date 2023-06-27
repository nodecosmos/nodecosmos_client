import React from 'react';
import { faPenToSquare, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton, Tooltip, Typography, Box,
} from '@mui/material';
import {
  faRectangleCode, faCodeCommit, faHashtag,
} from '@fortawesome/pro-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../app/constants';
import { FLOW_PANE_CONTENTS } from '../../flows.constants';
import ToggleWorkflowPaneButton from '../../../workflows/components/pane/ToggleWorkflowPaneButton';
import { selectSelectedWorkflowDiagramObject } from '../../../workflows/workflows.selectors';
import { selectFlowAttribute, selectFlowPaneContent } from '../../flows.selectors';
import { deleteFlow } from '../../flows.thunks';
import { setFlowPaneContent } from '../../flowsSlice';
import FlowModal from '../FlowModal';

export default function FlowPaneToolbar() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const { id, workflowId } = selectedWorkflowDiagramObject;
  const dispatch = useDispatch();
  const ioPaneContent = useSelector(selectFlowPaneContent);
  const [openEditFlow, setOpenEditFlow] = React.useState(false);

  const nodeId = useSelector(selectFlowAttribute(workflowId, id, 'nodeId'));
  const title = useSelector(selectFlowAttribute(workflowId, id, 'title'));

  const handleDeleteFlow = () => {
    dispatch(deleteFlow({ id, workflowId, nodeId }));
  };

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
          active={ioPaneContent === FLOW_PANE_CONTENTS.markdown}
          onClick={() => dispatch(setFlowPaneContent(FLOW_PANE_CONTENTS.markdown))}
        />
        <ToolbarItem
          title="View Description"
          icon={faHashtag}
          color="toolbar.green"
          active={ioPaneContent === FLOW_PANE_CONTENTS.description}
          onClick={() => dispatch(setFlowPaneContent(FLOW_PANE_CONTENTS.description))}
        />
      </ToolbarContainer>

      <Box display="flex" alignItems="center" sx={{ svg: { color: 'background.list.default', mr: 0.5, ml: 1 } }}>
        {title && <FontAwesomeIcon icon={faCodeCommit} />}
        <Typography
          align="center"
          variant="body1"
          fontWeight="bold"
          color="secondary"
          ml={1}
          sx={{
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
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
          <Tooltip title="Edit Flow Title" placement="top">
            <IconButton
              className="Item"
              aria-label="Edit Flow Title"
              sx={{ svg: { color: 'toolbar.green' } }}
              onClick={() => setOpenEditFlow(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Flow" placement="top">
            <IconButton
              className="Item"
              aria-label="Delete Flow"
              sx={{ svg: { color: 'toolbar.lightRed' } }}
              onClick={handleDeleteFlow}
            >
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box>
        <ToggleWorkflowPaneButton />
      </Box>

      <FlowModal
        id={id}
        workflowId={workflowId}
        open={openEditFlow}
        onClose={() => setOpenEditFlow(false)}
      />
    </Box>
  );
}
