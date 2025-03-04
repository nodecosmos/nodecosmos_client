import Alert from '../../common/components/Alert';
import useUserAuthentication from '../../features/users/hooks/useUserAuthentication';
import {
    Tab,
    Tabs,
    Box,
    Container,
    Typography, Button,
} from '@mui/material';
import React, {
    useEffect,
    useState,
    useCallback,
} from 'react';
import {
    Outlet, Link, useLocation,
} from 'react-router-dom';

function loadRecaptcha() {
    const script = document.createElement('script');
    script.id = 'recaptcha';
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function unloadRecaptcha() {
    // Check if script is already loaded
    if (!window.grecaptcha) {
        // Already unloaded
        return;
    }
    const script = document.getElementById('recaptcha');
    if (script) {
        document.head.removeChild(script);
    }

    const recaptcha = document.querySelector('.grecaptcha-badge');
    if (recaptcha) {
        recaptcha.remove();
    }

    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
        if (script.src && script.src.indexOf('gstatic.com/recaptcha') !== -1) {
            script.parentNode.removeChild(script);
        }
    }
}

const SX = {
    height: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default function Authentication() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const { redirect, continueWithGoogle } = useUserAuthentication();

    useEffect(() => {
        if (location.pathname === '/auth/login') {
            setCurrentPage(0);
        } else {
            setCurrentPage(1);
        }
    }, [location.pathname]);

    const handleTabChange = useCallback((_event, value) => setCurrentPage(value), []);

    useEffect(() => {
        if (import.meta.env.VITE_RECAPTCHA_ENABLED) {
            loadRecaptcha();
        }

        return () => {
            unloadRecaptcha();
        };
    }, []);

    return (
        <div className="overflow-auto h-100">
            <Container maxWidth="sm" sx={SX}>
                <Box
                    width={1}
                    height={{
                        xs: 1,
                        lg: 'auto',
                    }}>
                    <Box
                        component={Link}
                        to="/"
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <Typography
                            fontSize="50px"
                            fontWeight="bold"
                        >
                            <Box component="span" color="logo.blue">node</Box>
                            <Box component="span" color="logo.red">cosmos</Box>
                        </Typography>
                    </Box>
                    <Box mt={0}>
                        <Alert position="static" />
                    </Box>
                    <Box>
                        <Tabs
                            value={currentPage}
                            onChange={handleTabChange}
                            centered
                        >
                            <Tab
                                label="Log in"
                                disableRipple
                                LinkComponent={Link}
                                to={`/auth/login?redirect=${redirect}`} />
                            <Tab
                                label="Sign up"
                                disableRipple
                                LinkComponent={Link}
                                to={`/auth/signup?redirect=${redirect}`} />
                        </Tabs>
                    </Box>
                    <Box className="mt-3 display-flex justify-center">
                        <div>
                            <Button
                                color=""
                                className="p-3 border-radius-2 display-flex justify-center align-center toolbar-default"
                                variant="outlined"
                                onClick={continueWithGoogle}
                            >
                                <img src="/google-icon.svg" alt="logo" height={20} width={20} />
                                <Typography
                                    color="texts.primary"
                                    variant="body2"
                                    className="fs-16 ml-1">
                                    Sign in with Google
                                </Typography>
                            </Button>
                        </div>
                    </Box>
                    <Box textAlign="center" mt={3}>
                        <Outlet />
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
