import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Box, Dialog, DialogTitle, IconButton, CircularProgress, DialogContent,
  Button, Typography,
} from '@mui/material';
import { Form } from 'react-final-form';
import AddRounded from '@mui/icons-material/AddRounded';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import FinalFormCheckboxTree from '../../../../common/components/final-form/FinalFormCheckboxTree';
import { setAlert } from '../../../app/appSlice';
import {
  selectChildIdsByParentId, selectNodesById, selectSelectedNode,
} from '../../nodes.selectors';
import { importNode } from '../../nodesSlice';
import ImportSearchField from './ImportSearchField';

// Dumb implementation of import feature
export default function ImportNodeModal(props) {
  const { open, onClose } = props;
  const [loading, setLoading] = React.useState(false);

  const {
    id,
    rootId,
    title,
  } = useSelector(selectSelectedNode);

  const allNodesById = useSelector(selectNodesById);

  const childIdsByParentId = useSelector(selectChildIdsByParentId);
  const childIds = childIdsByParentId[id];

  const dispatch = useDispatch();

  const onSubmit = async (formValues) => {
    setLoading(true);

    const importedNodeIds = Object.keys(formValues.importedNodeIds).filter(
      (impNodeId) => formValues.importedNodeIds[impNodeId],
    );

    try {
      dispatch(importNode({ id, importedNodeIds }));
      setLoading(false);
      onClose();
    } catch (e) {
      dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Failed to import node' }));
      setLoading(false);
    }
  };

  const checkboxTreeOptions = [];

  const addCheckboxTreeOptions = (nodeId) => ({
    value: nodeId,
    label: allNodesById[nodeId].title,
    children: childIdsByParentId[nodeId].filter((childId) => childId !== id && childIds.indexOf(childId) < 0)
      .map((childId) => addCheckboxTreeOptions(childId)),
  });

  childIdsByParentId[rootId].forEach((childId) => {
    if (childId === id || childIds.indexOf(childId) >= 0) return;
    checkboxTreeOptions.push(addCheckboxTreeOptions(childId));
  });

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography
            align="center"
            variant="body1"
            ml={1}
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            Import Nodes to
            {' '}
            {title}
          </Typography>
        </Box>
        <IconButton
          disableRipple
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 8,
          }}
        >
          <CloseOutlined sx={{ color: 'background.3' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ImportSearchField rootNodeId={rootId} />
        <Box mt={2}>
          <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
            {({ handleSubmit }) => (
              <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                <FinalFormCheckboxTree name="importedNodeIds" options={checkboxTreeOptions} />
                <Button
                  sx={{ mt: 3, float: 'right' }}
                  color="success"
                  variant="contained"
                  disableElevation
                  type="submit"
                  disabled={loading}
                  startIcon={loading
                    ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} /> : <AddRounded />}
                >
                  Import
                </Button>
              </form>
            )}
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

ImportNodeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
