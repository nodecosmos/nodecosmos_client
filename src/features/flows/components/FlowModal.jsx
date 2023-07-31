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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCommit } from '@fortawesome/pro-solid-svg-icons';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { selectFlowAttribute } from '../flows.selectors';
import { createFlow, updateFlowTitle } from '../flows.thunks';
import CloseModalButton from '../../../common/components/CloseModalButton';

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
        <CloseModalButton onClose={onClose} />
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
