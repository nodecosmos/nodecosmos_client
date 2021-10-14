import { Button, Grid } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-final-form';
import Field from '../microcosmos/final-form/MicroFinalFormInputField';

const required = (value) => (value ? undefined : 'is required');

export default function LoginForm(props) {
  const { onSubmit } = props;

  return (
    <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Field fullWidth name="username || email" validate={required} />
            </Grid>
            <Grid item xs={12}>
              <Field fullWidth name="password" type="password" validate={required} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" type="submit">
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
