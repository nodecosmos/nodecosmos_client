import Alert from '../../../common/components/Alert';
import Field from '../../../common/components/final-form/FinalFormInputField';
import {
    validateNotEmailFormat,
    validateURLSafe,
} from '../../../utils/validation';
import useUserAuthentication from '../hooks/useUserAuthentication';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button, Container, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { Form } from 'react-final-form';

const SX = {
    height: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
};

export default function UpdateUsername() {
    const { handleUpdateUsername, loading } = useUserAuthentication();

    return (
        <div className="overflow-auto h-100">
            <Container maxWidth="sm" sx={SX}>
                <Form<{ username: string }>
                    onSubmit={handleUpdateUsername}
                    subscription={{ active: true }}>
                    {({
                        handleSubmit,
                        submitting,
                    }) => (
                        <form className="w-100" onSubmit={handleSubmit}>
                            <Alert position="static" mb={2} />
                            <Typography
                                variant="body1"
                                align="center"
                                fontWeight={600}
                            >
                                Choose your username
                            </Typography>
                            <Field
                                className="w-100 mt-2"
                                fullWidth
                                name="username"
                                validate={[validateNotEmailFormat, validateURLSafe]}
                                label="Username"
                                required
                                maxLength={20}
                                minLength={3} />
                            <div className="display-flex justify-center">
                                <Button
                                    className="mt-2"
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    disabled={submitting}
                                    startIcon={
                                        loading
                                            ? <CircularProgress size={20} className="toolbar-purple" />
                                            : <FontAwesomeIcon size="2xs" icon={faUser} />
                                    }
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    )}
                </Form>
            </Container>
        </div>

    );
}
