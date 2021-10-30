import React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { UnControlled as CodeMirror } from 'react-codemirror2';
/* material ui */
import TagRounded from '@mui/icons-material/TagRounded';
import {
  Button,
  InputAdornment,
  Box,
  Container,
} from '@mui/material';
/* micro */
import { createMicron } from '../../actions';
import Field from '../microcosmos/final-form/MicroFinalFormInputField';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

class CreateMicron extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  onSubmit = async (formValues) => {
    if (this.props.currentMicron) {
      formValues.parent_id = this.props.currentMicron.id;
    }
    formValues.description = this.state.description;
    this.props.createMicron(formValues);
  }

  onDescriptionChange = (value) => {
    this.setState({ description: value });
  }

  render() {
    return (
      <Container maxWidth="md">
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
              <Box mt={2}>
                <CodeMirror
                  value={this.state.description}
                  options={{
                    mode: 'markdown',
                    theme: 'material',
                    lineNumbers: true,
                  }}
                />
              </Box>
              <Box mt={2} pl={2} textAlign="center">
                <Button sx={{ mt: 3 }} variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </form>
          )}
        </Form>
      </Container>
    );
  }
}

CreateMicron.defaultProps = {
  currentMicron: null,
};

CreateMicron.propTypes = {
  createMicron: PropTypes.func.isRequired,
  currentMicron: PropTypes.object,
};

function mapStateToProps(state) {
  const { currentUser } = state.auth;
  return { currentUser };
}

export default connect(mapStateToProps, { createMicron })(CreateMicron);
