import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSubscriptionsByRootId = (state: RootState) => state.subscriptions.byRootId;

export const selectSubscription = (rootId: string) => createSelector(
    selectSubscriptionsByRootId,
    (subscriptionsByRootId) => subscriptionsByRootId[rootId],
);
