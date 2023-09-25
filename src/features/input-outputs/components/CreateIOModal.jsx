/* eslint-disable react/jsx-props-no-spreading,react/jsx-no-duplicate-props */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import AddRounded from '@mui/icons-material/AddRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
import { useSelector } from 'react-redux';
import CloseModalButton from '../../../common/components/CloseModalButton';
import FinalFormAutocompleteField from '../../../common/components/final-form/FinalFormAutocompleteField';
import useIOSubmitHandler from '../hooks/useIOSubmitHandler';
import { selectUniqueIOByRootNodeId } from '../inputOutputs.selectors';
import { ASSOCIATED_OBJECT_TYPES } from '../inputOutputs.constants';
import { selectWorkflowAttribute } from '../../workflows/workflows.selectors';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

export default function CreateIOModal({
  open, onClose, workflowId, associatedObject, flowStepId, flowStepOutputNodeId,
}) {
  const nodeId = useSelector(selectWorkflowAttribute(workflowId, 'nodeId'));
  const rootNodeId = useSelector(selectNodeAttribute(nodeId, 'rootId'));
  const allWorkflowIOs = useSelector(selectUniqueIOByRootNodeId(rootNodeId));
  const allIOTitles = allWorkflowIOs.map((io) => io.title);
  const uniqueIOTitles = [...new Set(allIOTitles)];

  const title = associatedObject === ASSOCIATED_OBJECT_TYPES.workflow
    ? 'Create Initial Input' : 'Create Output';

  const [autocompleteValue, setAutocompleteValue] = React.useState(null);

  const { onSubmit, loading } = useIOSubmitHandler({
    onClose,
    workflowId,
    associatedObject,
    flowStepId,
    flowStepOutputNodeId,
    autocompleteValue,
  });

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
        {title}
        <CloseModalButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormAutocompleteField
                freeSolo
                selectOnFocus
                options={uniqueIOTitles}
                renderOption={(props, option) => (
                  <li {...props}>
                    <FontAwesomeIcon icon={faCodeCommit} />
                    <span className="label">
                      {option}
                    </span>
                  </li>
                )}
                startAdornment={(
                  <InputAdornment position="start" sx={{ svg: { p: 2, color: 'tree.hashtag' } }}>
                    <FontAwesomeIcon icon={faCodeCommit} />
                  </InputAdornment>
                )}
                name="title"
                placeholder="IO Title"
                setAutocompleteValue={setAutocompleteValue}
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

CreateIOModal.defaultProps = {
  flowStepId: null,
  flowStepOutputNodeId: null,
};

CreateIOModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  workflowId: PropTypes.string.isRequired,
  associatedObject: PropTypes.string.isRequired,
  flowStepId: PropTypes.string,
  flowStepOutputNodeId: PropTypes.string,
};
