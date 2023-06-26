import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/pro-light-svg-icons';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import TagRounded from '@mui/icons-material/TagRounded';
import { Button, DialogContent, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import { selectInputOutputById } from '../inputOutput.selectors';
import { updateIOTitle } from '../inputOutput.thunks';

export default function EditIOModal({ id, open, onClose }) {
  const { nodeId, workflowId, title } = useSelector(selectInputOutputById(id));
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (formValues) => {
    setLoading(true);

    const payload = {
      nodeId,
      workflowId,
      id,
      ...formValues,
    };

    dispatch(updateIOTitle(payload)).then(() => {
      setLoading(false);
    }).catch((e) => {
      console.error(e);

      setLoading(false);
    });

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
        Edit IO
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
        <Form
          onSubmit={onSubmit}
          subscription={{
            submitting: true,
          }}
          initialValues={{
            title,
          }}
        >
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
                startIcon={loading ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
                  : <FontAwesomeIcon icon={faFloppyDisk} />}
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

EditIOModal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
