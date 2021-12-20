import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';
import * as PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { AddRounded, TagRounded, CloseOutlined } from '@mui/icons-material';

/* mui */
import {
  Button,
  InputAdornment,
  Modal,
  Paper,
  Box,
  DialogContent,
} from '@mui/material';
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
        <Box width={0.7} height={0.8}>
          <Form onSubmit={this.onSubmit} subscription={{ submitting: true }}>
            {({ handleSubmit }) => (
              <form className="h-1" onSubmit={handleSubmit}>
                <AnimatePresence>
                  {this.state.open && (
                  <motion.div
                    className="h-1"
                    animate={{ scale: [0.95, 1] }}
                    exit={{ scale: [1, 0.95] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paper className="Modal">
                      <Grid
                        container
                        alignItems="center"
                        className="BoxShadowBottom BorderBottom"
                        height="64px"
                      >
                        <Grid item xs={4} />
                        <Grid item xs={4} align="center">
                          <Typography variant="h5">
                            New Micron
                          </Typography>
                        </Grid>
                        <Grid item xs={4} align="right">
                          <IconButton disableRipple onClick={this.handleClose} className="squared" sx={{ mr: 2 }}>
                            <CloseOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <DialogContent sx={{ height: 'calc(100% - 128px)', padding: 4 }}>
                        <Box sx={{ height: 90 }}>
                          <Field
                            fullWidth
                            name="title"
                            label="Micron title"
                            required
                            InputProps={{
                              className: 'LargeInput',
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TagRounded sx={{ color: 'gray' }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            height: 'calc(100% - 95px)',
                            p: 2,
                            mt: '4px',
                            borderRadius: 2,
                          }}
                          className="codeMirrorBlock"
                        >
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
                      <Box
                        height="64px"
                        className="BorderTop BoxShadowTop"
                        align="right"
                        display="flex"
                        justifyContent="right"
                        alignItems="center"
                      >
                        <Button
                          color="success"
                          variant="contained"
                          disableElevation
                          sx={{ mr: 3 }}
                          type="submit"
                          startIcon={<AddRounded />}
                        >
                          Create
                        </Button>
                      </Box>
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
