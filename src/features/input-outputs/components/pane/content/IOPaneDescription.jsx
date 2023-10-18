import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedWorkflowDiagramObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById } from '../../../inputOutputs.selectors';
import { getIODescription } from '../../../inputOutputs.thunks';

export default function IOPaneDescription() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const { id } = selectedWorkflowDiagramObject;

  const {
    description, nodeId, workflowId, workflowIndex,
  } = useSelector(selectInputOutputById(id));

  const [loading, setLoading] = React.useState(!description);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!description) {
      dispatch(getIODescription({
        nodeId,
        workflowId,
        workflowIndex,
        id,
      })).then(() => setLoading(false));
    }
  }, [dispatch, nodeId, workflowId, id, description, workflowIndex]);

  if (loading) {
    return <Loader />;
  }

  const noDescriptionContent = (
    <>
      <Typography color="text.secondary" align="center" fontWeight="bold">
        IO has no description yet.
      </Typography>
      <Typography color="text.secondary" align="center" fontSize={30}>
        ¯\_(ツ)_/¯
      </Typography>
    </>
  );

  return (
    <DescriptionContainer>
      {(description && <Box pb={2} dangerouslySetInnerHTML={{ __html: description }} />) || noDescriptionContent}
    </DescriptionContainer>
  );
}
