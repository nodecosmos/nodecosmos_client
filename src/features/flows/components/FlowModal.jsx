import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, DialogContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { selectFlowAttribute } from '../flows.selectors';
import { createFlow, updateFlowTitle } from '../flows.thunks';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import DefaultModalFormButton from '../../../common/components/buttons/DefaultModalFormButton';

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

    setTimeout(() => setLoading(false), 500);
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      PaperProps={{
        elevation: 8,
      }}
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
              <DefaultModalFormButton loading={loading} />
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
