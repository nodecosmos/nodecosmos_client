import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import TagRounded from '@mui/icons-material/TagRounded';

import { useNavigate } from 'react-router-dom';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
import nodecosmos from '../../../apis/nodecosmos-server';
/* nodecosmos */
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/CloseModalButton';

export default function CreateNodeModal(props) {
  const { open, onClose } = props;
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formValues) => {
    setLoading(true);

    try {
      // we will implement logic once we enable subscriptions
      const data = { isPublic: true, ...formValues };

      const response = await nodecosmos.post('/nodes', data);
      navigate(`/nodes/${response.data.rootId}`);
      return null;
    } catch (e) {
      setLoading(false);

      if (!e.response.data.title) return { title: e.response.data.error };
      return e.response.data;
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      PaperProps={{
        elevation: 0,
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
        New Node
        <CloseModalButton onClose={onClose} />
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                placeholder="Title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagRounded sx={{ color: 'tree.hashtag' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                sx={{ mt: 3, float: 'right' }}
                color="button"
                variant="contained"
                disableElevation
                type="submit"
                disabled={loading}
                startIcon={
                  loading
                    ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
                    : <AddRounded />
                }
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

CreateNodeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
