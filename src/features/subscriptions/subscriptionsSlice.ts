import { deleteMember, showSubscription } from './subscriptions.thunks';
import { SubscriptionState } from './subscriptions.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SubscriptionState = { byRootId: {} };

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(showSubscription.fulfilled, (state, action) => {
            const { subscription } = action.payload;

            state.byRootId[subscription.rootId] = subscription;
            state.byRootId[subscription.rootId].memberIds = new Set(subscription.memberIds);
        }).addCase(deleteMember.fulfilled, (state, action) => {
            const { rootId, memberId } = action.meta.arg;

            state.byRootId[rootId].memberIds.delete(memberId);
        });
    },
});

export default subscriptionsSlice.reducer;
