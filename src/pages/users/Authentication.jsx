import Alert from '../../common/components/Alert';
import useUserAuthentication from '../../features/users/hooks/useUserAuthentication';
import {
    Tab,
    Tabs,
    Box,
    Container,
    Typography,
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

export default function Authentication() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const { redirect } = useUserAuthentication();

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
        <Container
            maxWidth="sm"
            sx={{
                height: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box width={1}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography
                        sx={{
                            fontSize: 50,
                            ml: 1,
                        }}
                        fontWeight="bold">
                        <Box component="span" color="logo.blue">node</Box>
                        <Box component="span" color="logo.red">cosmos</Box>
                    </Typography>
                </Box>
                <Box mt={0} mb={-4}>
                    <Alert position="static" />
                </Box>
                <Box mt={4}>
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
                <Box textAlign="center" mt={3}>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
}
