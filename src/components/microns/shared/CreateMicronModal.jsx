import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import * as PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { SaveOutlined, TagRounded } from '@mui/icons-material';

/* mui */
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Button,
  InputAdornment,
  Modal,
  Paper,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
/* micro */
import { createMicron } from '../../../actions';
import Field from '../../microcosmos/final-form/MicroFinalFormInputField';

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

    formValues.description = this.state.description;

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
        hideBackdrop
        onClose={this.handleClose}
        open={this.props.open}
      >
        <Box width={0.9} height={0.9}>
          <Form onSubmit={this.onSubmit} subscription={{ submitting: true }}>
            {({ handleSubmit }) => (
              <form className="h-1" onSubmit={handleSubmit}>
                <AnimatePresence>
                  {this.state.open && (
                  <motion.div
                    className="h-1"
                    animate={{ scale: [0.8, 1] }}
                    exit={{ scale: [1, 0.5], opacity: [1, 1, 0] }}
                    transition={{ duration: 0.25 }}
                  >
                    <Paper sx={{ height: 1, padding: 0, boxShadow: '0px 0px 14px 2px #00000078' }}>
                      <Box padding={3} height={64}>
                        <Grid container alignItems="center">
                          <Grid item xs={4} />
                          <Grid item xs={4} align="center">
                            <Typography variant="h5">
                              New Micron
                            </Typography>
                          </Grid>
                          <Grid item xs={4} align="right">
                            <Button
                              disableElevation
                              sx={{ height: 35 }}
                              type="submit"
                              startIcon={<SaveOutlined />}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      <DialogContent sx={{ height: 'calc(100% - 64px)', padding: 2 }}>
                        <Field
                          sx={{ height: 85 }}
                          fullWidth
                          name="title"
                          label="Micron title"
                          required
                          InputProps={{
                            className: 'MicroPlain Large',
                            startAdornment: (
                              <InputAdornment position="start">
                                <TagRounded sx={{ color: 'gray' }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Box sx={{ height: 'calc(100% - 90px)', ml: 2 }}>
                          <CodeMirror
                            className="h-1"
                            onChange={(_editor, _data, value) => { this.setState({ description: value }); }}
                            value={this.state.description}
                            options={{
                              placeholder: 'Description',
                              mode: 'markdown',
                              theme: 'material',
                              lineNumbers: true,
                            }}
                          />
                        </Box>
                      </DialogContent>
                    </Paper>
                  </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </Form>
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
