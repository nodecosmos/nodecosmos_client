import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import { useDispatch } from 'react-redux';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
/* nodecosmos */
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/CloseModalButton';
import { createContributionRequest } from '../contributionRequests.thunks';

export default function CreateContributionRequestModal({
  open, onClose, nodeId,
}) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    setLoading(true);

    const payload = {
      nodeId,
      ...formValues,
    };

    dispatch(createContributionRequest(payload)).then(() => {
      onClose();
      setTimeout(() => setLoading(false), 500);
    });
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
        New Contribution Request
        <CloseModalButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                placeholder="Contribution Request Title"
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

CreateContributionRequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  nodeId: PropTypes.string.isRequired,
};
