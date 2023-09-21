import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from 'react-redux';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
/* nodecosmos */
import { faCodeCommit } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import { createWorkflow } from '../workflows.thunks';
import CloseModalButton from '../../../common/components/CloseModalButton';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

export default function CreateWorkflowModal({
  open, onClose, nodeId,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const rootNodeId = useSelector(selectNodeAttribute(nodeId, 'persistentRootId'));

  const onSubmit = async (formValues) => {
    setLoading(true);

    const payload = {
      nodeId,
      rootNodeId,
      ...formValues,
    };

    await dispatch(createWorkflow(payload));

    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      PaperProps={{
        elevation: 5,
        sx: {
          borderRadius: 2.5,
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          border: 1,
          borderColor: 'borders.4',
        },
      }}
    >
      <DialogTitle>
        New Workflow
        <CloseModalButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                placeholder="Workflow Title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ svg: { color: 'tree.hashtag' } }}>
                      <FontAwesomeIcon icon={faCodeCommit} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                sx={{ mt: 3, float: 'right' }}
                color="success"
                variant="contained"
                disableElevation
                type="submit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} /> : <AddRounded />}
              >
                Create
              </Button>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

CreateWorkflowModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  nodeId: PropTypes.string.isRequired,
};
