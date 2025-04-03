import nodecosmos from '../../api/nodecosmos-server';
import Alert from '../../common/components/Alert';
import Loader from '../../common/components/Loader';
import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../common/hooks/useHandleServerErrorAlert';
import { HEADER_HEIGHT, STRIPE_ENABLED } from '../../features/app/constants';
import useBranchContext from '../../features/branch/hooks/useBranchContext';
import { maybeSelectNode } from '../../features/nodes/nodes.selectors';
import Members from '../../features/subscriptions/components/Members';
import { selectSubscription } from '../../features/subscriptions/subscriptions.selectors';
import { showSubscription } from '../../features/subscriptions/subscriptions.thunks';
import { SubscriptionStatus } from '../../features/subscriptions/subscriptions.types';
import UserProfileLink from '../../features/users/components/UserProfileLink';
import { selectCurrentUser } from '../../features/users/users.selectors';
import { NodecosmosDispatch } from '../../store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NodecosmosError } from '../../types';
import { faRight, faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, {
    useCallback, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SubscriptionShow() {
    const { branchId: rootId } = useBranchContext();
    const node = useSelector(maybeSelectNode(rootId, rootId));
    const editorsRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading, unsetLoading] = useBooleanStateValue();
    const [newLoading, setNewLoading, unsetNewLoading] = useBooleanStateValue();
    const handleServerError = useHandleServerErrorAlert();
    const subscription = useSelector(selectSubscription(rootId));
    const memberIds = useMemo(() => Array.from(subscription?.memberIds || []), [subscription]);
    const dispatch: NodecosmosDispatch = useDispatch();
    const [fetched, setFetched] = useBooleanStateValue(false);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!fetched || !subscription) {
            dispatch(showSubscription(rootId)).finally(() => setFetched());
        }
    }, [dispatch, fetched, subscription, rootId, setFetched]);

    const onManageSubClick = useCallback(async () => {
        setLoading();

        try {
            const response = await nodecosmos.get(`/subscriptions/customer_portal_url/${rootId}`);

            window.location.href = response.data.url;

            unsetLoading();
        } catch (error: NodecosmosError | any) {
            handleServerError({
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Something went wrong. Please try again later.',
                viewMessage: true,
            });
            unsetLoading();
            return;
        }

        return;
    }, [handleServerError, rootId, setLoading, unsetLoading]);

    const onNewSubClick = useCallback(async () => {
        setNewLoading();

        try {
            const response = await nodecosmos.get(`/subscriptions/build_new_url_for_cancelled_sub/${rootId}`);

            window.location.href = response.data.url;

            unsetNewLoading();
        } catch (error: NodecosmosError | any) {
            handleServerError({
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Something went wrong. Please try again later.',
                viewMessage: true,
            });
            unsetNewLoading();
            return;
        }

        return;
    }, [handleServerError, rootId, setNewLoading, unsetNewLoading]);

    if (!node || !node.owner || currentUser?.id !== node.owner.id) {
        return null;
    }

    if (node.isPublic || !STRIPE_ENABLED) {
        return null;
    }

    if (!fetched) {
        return <Loader p={4} />;
    }

    let subError = [
        SubscriptionStatus.PastDue,
        SubscriptionStatus.Paused,
        SubscriptionStatus.Canceled,
        SubscriptionStatus.Incomplete,
        SubscriptionStatus.Deleted,
        SubscriptionStatus.IncompleteExpired,
        SubscriptionStatus.Unpaid,
    ].find((status) => status === subscription.status);

    let isDeleted = subscription.status
        === SubscriptionStatus.Deleted
        || subscription.status === SubscriptionStatus.Canceled;

    return (
        <Box width={1} height={1}>
            <Alert position="relative" mb={2} />
            {
                subError && (
                    <Typography
                        fontWeight="bold"
                        color="error"
                        variant="subtitle2"
                        p={1}
                        borderBottom={1}
                        borderColor="borders.3"
                    >
                        Your subscription is {subError.toLocaleLowerCase()}. Please update your payment information
                        or create a new subscription.
                    </Typography>
                )
            }
            {
                subscription.status === SubscriptionStatus.Paused && (
                    <Typography
                        color="error"
                        variant="subtitle2"
                        p={1}
                        borderBottom={1}
                        borderColor="borders.3"
                    >
                        Your subscription is paused. Please update your payment information.
                    </Typography>
                )
            }

            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" position="relative">
                <Box borderBottom={1} borderColor="borders.3" p={4}>
                    <Typography fontWeight="bold" color="texts.secondary">
                        Author
                    </Typography>
                    <UserProfileLink id={node.owner.id} mt={2} />
                </Box>
                <Box borderBottom={1} borderColor="borders.3" p={4}>
                    <Typography variant="body2" color="texts.tertiary" fontWeight="bold">
                        Members × {memberIds.length}
                    </Typography>
                    <Typography fontWeight="bold" color="texts.secondary" className="mt-1">
                        ${memberIds.length * 5.00} per month{' '}
                    </Typography>
                    {
                        isDeleted && (
                            <>
                                <Button
                                    className="mt-2"
                                    variant="contained"
                                    disableElevation
                                    color="button"
                                    endIcon={newLoading
                                        ? <CircularProgress color="inherit" size={16} />
                                        : <FontAwesomeIcon icon={faAdd} />
                                    }
                                    onClick={onNewSubClick}
                                >
                                    New Subscription
                                </Button>
                                <br />
                            </>
                        )
                    }
                    <Button
                        className="mt-2"
                        variant="contained"
                        disableElevation
                        color="button"
                        endIcon={loading
                            ? <CircularProgress color="inherit" size={16} /> : <FontAwesomeIcon icon={faRight} />
                        }
                        onClick={onManageSubClick}
                    >
                        Manage Subscription
                    </Button>
                </Box>
                <Box ref={editorsRef}>
                    <Members />
                </Box>
            </Box>
        </Box>
    );
}
