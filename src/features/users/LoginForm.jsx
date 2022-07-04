import * as PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-final-form';
/* mui */
import { Button, Grid } from '@mui/material';
import Field from '../app/components/final-form/FinalFormInputField';
/* nodecosmos */

export default function LoginForm(props) {
  const { onSubmit } = props;

  return (
    <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Field fullWidth name="username || email" required />
            </Grid>
            <Grid item xs={12}>
              <Field fullWidth name="password" type="password" required />
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ mt: 2 }} variant="contained" type="submit">
                Log In
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
