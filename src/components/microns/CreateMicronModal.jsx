import React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { TagRounded } from '@mui/icons-material';

/* material ui */
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Button,
  InputAdornment,
  Modal,
  Paper,
  Box,
} from '@mui/material';
/* micro */
import { createMicron } from '../../actions';
import Field from '../microcosmos/final-form/MicroFinalFormInputField';

class CreateMicronModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  onSubmit = async (formValues) => {
    if (this.props.currentMicron) {
      formValues.parent_id = this.props.currentMicron.id;
    }

    this.props.createMicron(formValues);
  }

  handleClose = () => {
    this.setState({ open: false });
    setTimeout(() => {
      this.props.handleClose();
      this.setState({ open: true });
    }, 300);
  }

  render() {
    return (
      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClose={this.handleClose}
        open={this.props.open}
      >
        <Box width={0.5}>
          <AnimatePresence>
            {this.state.open && (
              <motion.div
                animate={{ scale: [0.7, 1] }}
                exit={{ scale: [1, 0.5] }}
                transition={{ duration: 0.3 }}
              >
                <Paper>
                  <DialogTitle align="center" sx={{ fontWeight: 'bold' }}>
                    New Micron
                  </DialogTitle>
                  <DialogContent align="center">
                    <Form onSubmit={this.onSubmit} subscription={{ submitting: true }}>
                      {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <Field
                            fullWidth
                            name="title"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TagRounded sx={{ color: 'text.primary' }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Button sx={{ mt: 3 }} variant="contained" type="submit">
                            Create
                          </Button>
                        </form>
                      )}
                    </Form>
                  </DialogContent>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    );
  }
}

CreateMicronModal.defaultProps = {
  currentMicron: null,
};

CreateMicronModal.propTypes = {
  createMicron: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentMicron: PropTypes.object,
};

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  return { currentUser };
}

export default connect(mapStateToProps, { createMicron })(CreateMicronModal);
