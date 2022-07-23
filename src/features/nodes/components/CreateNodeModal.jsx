import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import { Form } from 'react-final-form';
import { AddRounded, CloseOutlined, TagRounded } from '@mui/icons-material';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
/* nodecosmos */
import FinalFormInputField from '../../app/components/final-form/FinalFormInputField';

export default function CreateNodeModal(props) {
  const { open, onClose } = props;
  const [description, setDescription] = useState(null);

  const onSubmit = async (formValues) => {
    formValues.description = description;
  };

  return (
    <Dialog
      hideBackdrop
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        New Node
        <IconButton
          disableRipple
          onClick={onClose}
          className="squared"
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
            <form className="h-1" onSubmit={handleSubmit}>
              <FinalFormInputField
                sx={{ mb: 4 }}
                fullWidth
                name="title"
                label="Node title"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagRounded sx={{ color: 'gray' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <CodeMirror
                extensions={[markdown({ markdownLanguage, codeLanguages: languages })]}
                onChange={(value) => setDescription(value)}
              />
              <Button
                sx={{ mt: 4, float: 'right' }}
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
