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
import { sublime } from '@uiw/codemirror-theme-sublime';

/* mui */
import {
  Button,
  InputAdornment,
  DialogContent,
} from '@mui/material';
/* nodecosmos */
import FinalFormInputField from '../../app/components/final-form/FinalFormInputField';

const INITIAL_DESCRIPTION_VALUE = '\n\n\n\n';

export default function CreateNodeModal(props) {
  const { open, onClose } = props;
  const [description, setDescription] = useState(null);

  const onSubmit = async (formValues) => {
    formValues.description = description;
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
                label="TITLE"
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
                theme="dark"
                value={INITIAL_DESCRIPTION_VALUE}
                onChange={(_event, value) => setDescription(value)}
                placeholder="DESCRIPTION"
                basicSetup={{ highlightActiveLine: true, lineWrapping: true }}
                extensions={[markdown({ markdownLanguage, codeLanguages: languages })]}
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
