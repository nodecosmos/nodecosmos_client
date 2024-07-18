import ImageUpload from './ImageUpload';
import Alert from '../../../../common/components/Alert';
import NcAvatar from '../../../../common/components/NcAvatar';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import toLocalTime from '../../../../utils/localTime';
import useProfileConfirmation from '../../hooks/useProfileConfirmation';
import useProfileUser from '../../hooks/useProfileUser';
import { selectCurrentUser } from '../../users.selectors';
import { faMailReply } from '@fortawesome/pro-thin-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Container, Tab, Tabs, Typography, Link as MuiLink,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, {
    useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
    Link, Outlet, useLocation,
} from 'react-router-dom';

export default function Profile() {
    const user = useProfileUser();
    const currentUser = useSelector(selectCurrentUser);
    const isCurrentUser = currentUser && user && currentUser.id === user.id;
    const [hovered, hover, unhover] = useBooleanStateValue();
    const { loading, handleResendConfirmationEmail } = useProfileConfirmation();
    const [currentPage, setCurrentPage] = useState(0);
    const handleTabChange = useCallback((_: React.SyntheticEvent, value: number) => setCurrentPage(value), []);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('nodes')) {
            setCurrentPage(1);
        } else {
            setCurrentPage(0);
        }
    }, [location.pathname]);

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="md">
            <Box
                p={4}
                border={1}
                borderColor="borders.1"
                borderRadius={2}
                onMouseLeave={unhover}
                width={1}
                display="flex"
                justifyContent="start"
                flexDirection="column"
                alignItems="center">
                <Alert position="sticky" mb={1} />
                <Box
                    width="fit-content"
                    position="relative"
                    onMouseOver={hover}
                    onMouseLeave={unhover}
                >
                    <ImageUpload hovered={hovered} onModalClose={unhover} />
                    <NcAvatar
                        size={200}
                        fontSize={69}
                        src={user.profileImageUrl}
                        name={user.username} />
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column" width={1}>
                    <Typography variant="h4" color="text.primary" fontWeight="bold" mt={1}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="h6" color="text.tertiary">
                            @
                            {user.username}
                        </Typography>
                        <Typography color="text.tertiary" ml={1}>
                            {toLocalTime(user.createdAt.toString())}
                        </Typography>
                    </Box>

                    {
                        currentUser && isCurrentUser && (
                            <>
                                <Typography variant="body2" color="text.link" fontWeight="bold" mt={1}>
                                    {currentUser.email}
                                    <Box
                                        component="span"
                                        color="text.tertiary"> - visible only to you
                                    </Box>
                                </Typography>
                                <Typography variant="caption" color="text.tertiary">

                                </Typography>
                            </>
                        )
                    }

                    {
                        currentUser && !currentUser.isConfirmed && currentUser.username === user.username && (
                            <>
                                <Typography variant="body2" color="warning.main" mt={2}>
                                    Please confirm your email address to access all features.
                                    If you did not receive the email, please check your spam folder or request
                                    a new one from profile page.
                                </Typography>
                                <Button
                                    className="mt-2"
                                    variant="outlined"
                                    onClick={handleResendConfirmationEmail}
                                    color="success"
                                    disabled={loading}
                                    startIcon={
                                        loading
                                            ? <CircularProgress size={20} sx={{ color: 'success.main' }} />
                                            : <FontAwesomeIcon icon={faMailReply} />
                                    }
                                >
                                    Resend Confirmation Email
                                </Button>
                            </>

                        )
                    }

                </Box>
            </Box>
            <Box mt={4}>
                <Tabs
                    value={currentPage}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab
                        component={Link}
                        label="Bio"
                        disableRipple
                        LinkComponent={MuiLink}
                        to=""
                    />
                    <Tab
                        component={Link}
                        label="Root Nodes"
                        disableRipple
                        LinkComponent={MuiLink}
                        to="nodes"
                    />
                </Tabs>
            </Box>
            <Box textAlign="center" mt={3}>
                <Outlet />
            </Box>
        </Container>
    );
}
