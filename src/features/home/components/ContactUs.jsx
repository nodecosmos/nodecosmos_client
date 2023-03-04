import React from 'react';
import {
  Button, Grid, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Form } from 'react-final-form';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import FinalFormInputField from '../../../common/components/final-form/FinalFormInputField';
import AnimateOnView from './AnimateOnView';
import Section from './Section';

// eslint-disable-next-line max-len
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmailFormat = (email) => (emailRegex.test(email) ? undefined : 'email must be valid');

export default function ContactUs() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (formValues) => {
    setLoading(true);
    // eslint-disable-next-line no-undef
    axios.post(
      'https://z9cnfgotre.execute-api.us-east-1.amazonaws.com/contact/contact-us',
      formValues,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(() => {
      setLoading(false);
      setSuccess(true);
    }).catch((error) => {
      setLoading(false);
      console.error(error);
    });
  };

  if (success) {
    return (
      <Box
        mt={{
          xs: 8,
          md: 32,
        }}
      >
        <AnimateOnView>
          <Section>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" align="center" gutterBottom>
                  Thank you for your message!
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                  We will get back to you as soon as possible.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CheckCircleOutlineRoundedIcon sx={{ fontSize: 100, color: 'success.main' }} />
                </Box>
              </Grid>
            </Grid>
          </Section>
        </AnimateOnView>
      </Box>
    );
  }

  return (
    <Box
      mt={{
        xs: 16,
        md: 32,
      }}
    >
      <AnimateOnView>
        <Typography
          variant="h4"
          variantMapping={{ h4: 'h3' }}
          textAlign="center"
          fontSize={{
            xs: '28px',
            sm: '32px',
          }}
        >
          Get in touch with us
        </Typography>
      </AnimateOnView>
      <Box mt={3}>
        <AnimateOnView delay={400}>
          <Section>
            <Typography color="text.secondary">
              Contact us at
              {' '}
              <a href="mailto:contact@nodecosmos.com">
                <Box
                  component="span"
                  color="secondary.main"
                  fontWeight="bold"
                  sx={{
                    borderBottom: 2,
                    borderBottomColor: 'secondary.main',
                  }}
                >
                  contact@nodecosmos.com
                </Box>
              </a>
              {' '}
              or fill out the form below.
            </Typography>

            <Box mt={4}>
              <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justify="center">
                      <Grid item xs={12} md={6}>
                        <FinalFormInputField
                          fullWidth
                          name="first_name"
                          label="First Name"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FinalFormInputField
                          fullWidth
                          name="last_name"
                          label="Last Name"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FinalFormInputField
                          fullWidth
                          name="email"
                          label="E-mail"
                          validate={validateEmailFormat}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FinalFormInputField
                          fullWidth
                          name="body"
                          label="Body"
                          type="text"
                          required
                          multiline
                        />
                      </Grid>
                    </Grid>
                    <Button
                      sx={{
                        mt: 3,
                        '&:disabled': {
                          backgroundColor: 'success.main',
                        },
                      }}
                      disabled={loading}
                      color="success"
                      variant="contained"
                      disableElevation
                      type="submit"
                      startIcon={
                        loading ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
                          : <SendOutlinedIcon />
                      }
                    >
                      Send
                    </Button>
                  </form>
                )}
              </Form>
            </Box>
          </Section>
        </AnimateOnView>
      </Box>
    </Box>
  );
}
