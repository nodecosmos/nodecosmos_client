import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import { useNavigate } from 'react-router-dom';

/* mui */
import {
  InputAdornment,
  DialogContent,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/pro-light-svg-icons';
import { useDispatch } from 'react-redux';
/* nodecosmos */
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import DefaultModalFormButton from '../../../common/components/buttons/DefaultModalFormButton';
import { createNode } from '../nodes.thunks';

export default function CreateNodeModal(props) {
  const { open, onClose } = props;
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formValues) => {
    setLoading(true);

    const data = { isPublic: true, ...formValues };

    dispatch(createNode(data))
      .then((response) => {
        navigate(`/nodes/${response.payload.rootId}`);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      });
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
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
                      <FontAwesomeIcon icon={faHashtag} />
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

CreateNodeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
