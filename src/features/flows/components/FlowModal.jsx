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
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { selectFlowAttribute } from '../flows.selectors';
import { createFlow, updateFlowTitle } from '../flows.thunks';

export default function FlowModal({
  open, onClose, workflowId, startIndex, id,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const title = useSelector(selectFlowAttribute(workflowId, id, 'title'));

  const onSubmit = async (formValues) => {
    setLoading(true);

    const payload = {
      nodeId,
      startIndex,
      workflowId,
      ...formValues,
    };

    if (id) {
      payload.id = id;
      await dispatch(updateFlowTitle(payload));
    } else {
      await dispatch(createFlow(payload));
    }

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
        {
          id ? 'Edit Flow' : 'Add Flow'
        }
        <IconButton
          disableRipple
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 16,
          }}
        >
          <CloseOutlined sx={{ color: 'background.3' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }} initialValues={{ title }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                placeholder="Flow Title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagRounded sx={{ color: 'background.3' }} />
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
                Save
              </Button>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

FlowModal.defaultProps = {
  id: null,
  startIndex: null,
};

FlowModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  workflowId: PropTypes.string.isRequired,
  startIndex: PropTypes.number,
  id: PropTypes.string,
};
