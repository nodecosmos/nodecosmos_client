import React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button, Grid } from '@mui/material';
/* nodecosmos */
import Field from '../../app/components/final-form/FinalFormInputField';
import useUserAuthentication from '../services/useUserAuthentication';

// eslint-disable-next-line max-len
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* validators */
const passwordsMustMatch = (value, values) => (values.password === value ? undefined : 'passwords must match');
const validateEmailFormat = (email) => (emailRegex.test(email) ? undefined : 'email must be valid');

export default function SignupForm() {
  const { handleUserCreation } = useUserAuthentication();

  return (
    <Form onSubmit={handleUserCreation} subscription={{ submit: true }}>
      {({
        handleSubmit,
        submitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={6}>
              <Field fullWidth name="first_name" />
            </Grid>
            <Grid item xs={6}>
              <Field fullWidth name="last_name" />
            </Grid>
            <Grid item xs={12}>
              <Field fullWidth name="username" required maxLength={20} minLength={3} />
            </Grid>
            <Grid item xs={12}>
              <Field fullWidth name="email" validate={validateEmailFormat} required />
            </Grid>
            <Grid item xs={12}>
              <Field fullWidth name="password" type="password" required minLength={8} />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="password_confirmation"
                type="password"
                required
                validate={passwordsMustMatch}
              />
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ mt: 2 }} variant="contained" type="submit" disabled={submitting}>
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}
