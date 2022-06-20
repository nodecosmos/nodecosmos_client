import {
  SET_THEME,
  SET_SUBTITLE,
  SET_ANIMATION_ENABLED,
  SET_CURRENT_TOOLBAR, SET_CURRENT_NODE,
} from '../actions/types';

const INITIAL_STATE = {
  theme: localStorage.getItem('theme') || 'dark',
  subtitle: '',
  appAnimationEnabled: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_SUBTITLE:
      return {
        ...state,
        subtitle: action.payload,
      };
    case SET_ANIMATION_ENABLED:
      return {
        ...state,
        animationEnabled: action.payload,
      };
    case SET_CURRENT_TOOLBAR:
      return {
        ...state,
        currentToolbar: action.payload,
      };
    case SET_CURRENT_NODE:
      return {
        ...state,
        currentNodeID: action.payload,
      };
    default:
      return state;
  }
};
