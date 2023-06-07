import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import TagRounded from '@mui/icons-material/TagRounded';
import { useDispatch, useSelector } from 'react-redux';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
/* nodecosmos */
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import { selectWorkflow } from '../../workflows/workflows.selectors';
import { updateWorkflowInitialInputs } from '../../workflows/workflows.thunks';
import { createIo } from '../inputOutput.thunks';

export const ASSOCIATED_OBJECT_TYPES = {
  workflow: 'workflow',
  flowStep: 'flowStep',
};

export default function CreateIoModal({
  open, onClose, workflowId, associatedObject,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const workflow = useSelector(selectWorkflow(workflowId));

  const onSubmit = async (formValues) => {
    setLoading(true);

    const payload = {
      workflowId,
      ...formValues,
    };

    await dispatch(createIo(payload)).then((data) => {
      const { inputOutput } = data.payload;

      if (associatedObject === ASSOCIATED_OBJECT_TYPES.workflow) {
        const initialInputIds = [...workflow.initialInputIds, inputOutput.id] || [inputOutput.id];

        return dispatch(updateWorkflowInitialInputs({
          nodeId: workflow.nodeId,
          id: workflow.id,
          initialInputIds,
        }));
      }

      // TODO: flow step
      return Promise.resolve();
    });

    setLoading(false);

    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        New IO
        <IconButton
          disableRipple
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 16,
          }}
        >
          <CloseOutlined sx={{ color: 'background.4' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                placeholder="IO Title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagRounded sx={{ color: 'background.4' }} />
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

CreateIoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  workflowId: PropTypes.string.isRequired,
  associatedObject: PropTypes.string.isRequired,
};
