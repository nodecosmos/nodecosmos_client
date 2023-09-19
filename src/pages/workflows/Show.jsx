import React, { useEffect, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../common/components/Loader';
import { HEADER_HEIGHT } from '../../features/app/constants';
import usePaneResizable from '../../common/hooks/usePaneResizable';
import Workflow from '../../features/workflows/components/diagram/Workflow';
import WorkflowPane from '../../features/workflows/components/pane/WorkflowPane';
import WorkflowContainer from '../../features/workflows/components/WorkflowContainer';
import WorkflowToolbar from '../../features/workflows/components/WorkflowToolbar';
import { WORKFLOW_DIAGRAM_CONTEXT } from '../../features/workflows/workflows.constants';
import { WorkflowsContext } from '../../features/workflows/workflows.context';
import { selectIsWfPaneOpen, selectWorkflowsByNodeId } from '../../features/workflows/workflows.selectors';
import { showWorkflow } from '../../features/workflows/workflows.thunks';
import Alert from '../../common/components/Alert';
import { clearSelectedWorkflowDiagramObject } from '../../features/workflows/workflowsSlice';

export default function Show() {
  const { id } = useParams();
  const theme = useTheme();

  const dispatch = useDispatch();
  const workflows = useSelector(selectWorkflowsByNodeId(id));
  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const [loading, setLoading] = React.useState(true);
  const isWfPaneOpen = useSelector(selectIsWfPaneOpen);

  const workflowWidthFromLocalStorage = localStorage.getItem('workflowWidth');
  const workflowPaneWidthFromLocalStorage = localStorage.getItem('workflowPaneWidth');

  const workflowRef = React.useRef(null);
  const workflowDetailsRef = React.useRef(null);

  const [resizerHovered, setResizerHovered] = React.useState(false);

  const {
    paneAWidth,
    paneBWidth,
    handleResize,
    resizeInProgress,
  } = usePaneResizable({
    aRef: workflowRef,
    bRef: workflowDetailsRef,
    initialWidthA: workflowWidthFromLocalStorage || '70%',
    initialWidthB: workflowPaneWidthFromLocalStorage || '30%',
  });

  useEffect(() => {
    localStorage.setItem('workflowWidth', paneAWidth);
    localStorage.setItem('workflowPaneWidth', paneBWidth);
  }, [paneAWidth, paneBWidth]);

  useEffect(() => {
    if (!workflow.id) {
      setLoading(true);
      dispatch(showWorkflow(id)).then(() => setLoading(false));
    } else {
      setLoading(false);
    }

    return () => {
      dispatch(clearSelectedWorkflowDiagramObject());
    };
  }, [dispatch, id, workflow.id]);

  useEffect(() => {
    if (!resizeInProgress) {
      setResizerHovered(false);
    }
  }, [resizeInProgress]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      width={1}
      height={1}
    >
      <WorkflowsContext.Provider value={WORKFLOW_DIAGRAM_CONTEXT.workflowPage}>
        <WorkflowContainer>
          <Box
            height={1}
            width={1}
            display="flex"
            style={{
              cursor: resizeInProgress ? 'col-resize' : 'default',
            }}
          >
            <Box
              height={1}
              width={(isWfPaneOpen && paneAWidth) || '100%'}
              ref={workflowRef}
              overflow="hidden"
            >
              <WorkflowToolbar nodeId={id} />
              <Alert />
              <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                <Workflow nodeId={id} />
              </Box>
            </Box>
            <Box
              onMouseDown={handleResize}
              onMouseEnter={() => setResizerHovered(true)}
              onMouseLeave={() => {
                if (!resizeInProgress) {
                  setResizerHovered(false);
                }
              }}
              width="8px"
              backgroundColor="transparent"
              height={1}
              ml={-1}
              sx={{
                position: 'relative',
                '&:hover': {
                  cursor: 'col-resize',
                },
              }}
            />
            <Box
              backgroundColor="background.5"
              height={1}
              display={isWfPaneOpen ? 'block' : 'none'}
              width={(isWfPaneOpen && paneBWidth) || 0}
              ref={workflowDetailsRef}
              overflow="hidden"
              boxShadow="left.2"
              borderLeft={1}
              style={{
                borderLeftColor: resizerHovered ? theme.palette.borders['5'] : theme.palette.borders['3'],
              }}
            >
              <WorkflowPane />
            </Box>
          </Box>
        </WorkflowContainer>
      </WorkflowsContext.Provider>
    </Box>
  );
}
