import { clearSelectedObject, selectObject } from './app.thunks';
import {
    AppState, Browser, Theme,
} from './app.types';
import { deleteFlow } from '../flows/flows.thunks';
import { deleteIo } from '../input-outputs/inputOutputs.thunks';
import { createSlice } from '@reduxjs/toolkit';

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
    headerContent: null,
    theme: getTheme() || Theme.Dimmed,
    browser: fnBrowserDetect(),
    alert: {
        isOpen: false,
        message: '',
        severity: 'info',
        isModal: false,
    },
    descriptionCoordinates: {
        x: 0,
        y: 0,
    },
    isPaneOpen: true,
    isPaneLoading: false,
    selectedObject: null,
    currentNode: null,
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
        setIsPaneLoading(state, action) {
            state.isPaneLoading = action.payload;
        },
        setAlert(state, action) {
            state.alert = {
                ...state.alert,
                ...action.payload,
            };
        },
        setCurrentNode(state, action) {
            state.currentNode = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(selectObject.fulfilled, (state, action) => {
            state.selectedObject = action.payload;
        }).addCase(deleteFlow.fulfilled, (state) => {
            state.selectedObject = null;
        }).addCase(deleteIo.fulfilled, (state) => {
            state.selectedObject = null;
        }).addCase(clearSelectedObject.fulfilled, (state) => {
            state.selectedObject = null;
        });
    },
});

const { actions, reducer } = appSlice;

export const {
    setTheme,
    setIsPaneOpen,
    setIsPaneLoading,
    setHeaderContent,
    setAlert,
    setCurrentNode,
} = actions;

export default reducer;
