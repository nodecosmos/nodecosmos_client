import { createSlice } from '@reduxjs/toolkit';

function fnBrowserDetect() {
    const { userAgent } = navigator;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = 'chrome';
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = 'firefox';
    } else if (userAgent.match(/safari/i)) {
        browserName = 'safari';
    } else if (userAgent.match(/opr\//i)) {
        browserName = 'opera';
    } else if (userAgent.match(/edg/i)) {
        browserName = 'edge';
    } else {
        browserName = 'No browser detection';
    }

    return browserName;
}

const appSlice = createSlice({
    name: 'app',
    initialState: {
        headerContent: null,
        theme: localStorage.getItem('theme') || 'dimmed',
        /**
     * @type {{
     *   [id: string]: {
     *     clientHeight: number,
     *     scrollTop: number,
     *   }
     * }}
     */
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
    },
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
        setAnimationEnabled(state, action) { state.animationEnabled = action.payload; },

        // move to actions that can be reused by other slices
        setTransformablePositions(state, action) {
            const current = state.transformablePositionsById[action.payload.id] || {};
            state.transformablePositionsById[action.payload.id] = {
                ...current,
                ...action.payload, 
            };
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
