import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AddRounded from '@mui/icons-material/AddRounded';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
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
import FinalFormInputField from '../../app/components/final-form/FinalFormInputField';

export default function CreateNodeModal(props) {
  const { open, onClose } = props;
  const navigate = useNavigate();

  const onSubmit = async (formValues) => {
    try {
      const response = await nodecosmos.post('/nodes.json', formValues);
      navigate(`/nodes/${response.data.id}`);
      return null;
    } catch (e) {
      return e.data;
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        New Node
        <IconButton
          disableRipple
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 16,
          }}
        >
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit }) => (
            <form style={{ height: '100%' }} onSubmit={handleSubmit}>
              <FinalFormInputField
                fullWidth
                name="title"
                label="Title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagRounded sx={{ color: 'gray' }} />
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
                startIcon={<AddRounded />}
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
