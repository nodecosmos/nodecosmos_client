import React, { useEffect, useMemo } from 'react';
import { Box, Drawer } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import NodeDescription from '../../../features/nodes/components/details/NodeDescription';
import Workflow from '../../../features/workflows/components/diagram/Workflow';
import WorkflowContainer from '../../../features/workflows/components/WorkflowContainer';
import WorkflowToolbar from '../../../features/workflows/components/WorkflowToolbar';
import { selectWorkflowsByNodeId } from '../../../features/workflows/workflows.selectors';
import { showWorkflow } from '../../../features/workflows/workflows.thunks';

export default function WorkflowTab() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const workflows = useSelector(selectWorkflowsByNodeId(id));
  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (!workflow.id) setLoading(true);
    dispatch(showWorkflow(id)).then(() => setLoading(false));
  }, [dispatch, id, workflow.id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      width={1}
      height={1}
    >
      <WorkflowContainer>
        <Box height={1} width={1} display="flex">
          <Box height={`calc(100% - ${HEADER_HEIGHT})`} width={0.5}>
            <WorkflowToolbar nodeId={id} />
            <Workflow nodeId={id} />
          </Box>

          <Drawer
            variant="persistent"
            open
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 0.5, ml: '50%' },
              float: 'right',
            }}
          >
            <NodeDescription />
          </Drawer>
        </Box>
      </WorkflowContainer>
    </Box>
  );
}
