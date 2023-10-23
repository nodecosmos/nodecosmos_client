import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homepageTab: null,
        innovateTab: 0,
    },
    reducers: {
        setHomepageTab: (state, action) => { state.homepageTab = action.payload; },
        setInnovateTab: (state, action) => { state.innovateTab = action.payload; },
    },
});

const { actions, reducer } = homeSlice;

export const {
    setInnovateTab,
    setHomepageTab,
} = actions;

export default reducer;
