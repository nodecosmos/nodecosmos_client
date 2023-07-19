import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import DescriptionContainer from '../../../../../common/components/DescriptionContainer';
import { selectSelectedWorkflowDiagramObject } from '../../../../workflows/workflows.selectors';
import { selectInputOutputById } from '../../../inputOutput.selectors';
import { getIODescription } from '../../../inputOutput.thunks';

export default function IOPaneDescription() {
  const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowDiagramObject);
  const { id } = selectedWorkflowDiagramObject;

  const { description, nodeId, workflowId } = useSelector(selectInputOutputById(id));

  const [loading, setLoading] = React.useState(!description);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!description) {
      dispatch(getIODescription({
        nodeId,
        workflowId,
        id,
      })).then(() => setLoading(false));
    }
  }, [dispatch, nodeId, workflowId, id, description]);

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
