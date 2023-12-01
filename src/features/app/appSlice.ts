import {
    AppState, Browser, Theme, TransformablePositions,
} from './app.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function fnBrowserDetect() {
    const { userAgent } = navigator;

    if (userAgent.match(/chrome|chromium|crios/i)) {
        return Browser.Chrome;
    } else if (userAgent.match(/firefox|fxios/i)) {
        return Browser.Firefox;
    } else if (userAgent.match(/safari/i)) {
        return Browser.Safari;
    } else if (userAgent.match(/opr\//i)) {
        return Browser.Opera;
    } else if (userAgent.match(/edg/i)) {
        return Browser.Edge;
    } else {
        return Browser.Unknown;
    }
}

function getTheme() {
    return localStorage.getItem('theme') as Theme | null;
}

const initialState: AppState = {
    theme: getTheme() || Theme.Dimmed,
    transformablePositionsById: {},
    currentNodeId: null, // used for landing page
    browser: fnBrowserDetect(),
    alert: {
        isOpen: false,
        message: '',
        severity: 'info',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
    },
    descriptionCoordinates: {
        x: 0,
        y: 0,
    },
    isPaneOpen: true,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHeaderContent(state, action) { state.headerContent = action.payload; },
        setTheme(state, action) {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        setIsPaneOpen(state, action) {
            state.isPaneOpen = action.payload;
        },
        setCurrentNode(state, action) { state.currentNodeId = action.payload; },

        setTransformablePositions(state, action: PayloadAction<TransformablePositions>) {
            state.transformablePositionsById[action.payload.id] = { ...action.payload };
        },
        setAlert(state, action) {
            state.alert = {
                ...state.alert,
                ...action.payload,
            };
        },
        setDescriptionCoordinates(state, action) {
            state.descriptionCoordinates = action.payload;
        },
    },
});

const { actions, reducer } = appSlice;

export const {
    setTheme,
    setIsPaneOpen,
    setCurrentNode,
    setHeaderContent,
    setTransformablePositions,
    setAlert,
    setDescriptionCoordinates,
} = actions;

export default reducer;
