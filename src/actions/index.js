import nodecosmos from '../apis/nodecosmos-server';
import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_MICRON,
  UPDATE_MICRON,
  DELETE_MICRON,
  INDEX_MICRONS,
  SHOW_MICRON,
  SET_CURRENT_TOOLBAR,
  SET_SUBTITLE,
  SET_THEME,
} from './types';

/* User Actions */
export const login = (payload) => ({ type: SIGN_IN, payload });
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  return { type: SIGN_OUT };
};
export const syncCurrentUser = (id) => async (dispatch) => {
  try {
    await nodecosmos.get('/sync_current_user');
  } catch (error) {
    switch (error.response.data.error) {
      case 'session_expired':
        dispatch({ type: SIGN_OUT });
        history.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        break;
      default:
        dispatch({ type: SIGN_OUT });
    }
  }
};

/* NodeTab Actions */
export const createNode = (payload, parentNode = null) => async (dispatch) => {
  const response = await nodecosmos.post('/nodes.json', payload);

  dispatch({ type: CREATE_MICRON, payload: response.data });

  if (parentNode) {
    const newParent = { ...parentNode };
    newParent.node_ids = newParent.node_ids || [];
    newParent.node_ids.push(response.data.id);
    dispatch({ type: UPDATE_MICRON, payload: newParent });
  } else {
    history.push(`/nodes/${response.data.id}`);
  }
};

export const updateNode = (id, payload) => async (dispatch) => {
  // const response = await nodecosmos.patch(`/nodes/${id}`, payload);
  dispatch({ type: UPDATE_MICRON, payload });
};

export const deleteNode = (id, parentNode = null) => async (dispatch) => {
  await nodecosmos.post(`/nodes/delete/${id}`);
  if (parentNode && parentNode.id !== id) {
    const newParent = { ...parentNode };
    newParent.node_ids = newParent.node_ids || [];
    newParent.node_ids.splice(parentNode.node_ids.indexOf(id), 1);
    dispatch({ type: UPDATE_MICRON, payload: newParent });
  }
  dispatch({ type: DELETE_MICRON, payload: id });
  if (id === parentNode.id) { // if we delete currentNode
    history.push('/m');
  } else {
    history.goBack();
  }
};

export const indexNodes = () => async (dispatch) => {
  const response = await nodecosmos.get('/nodes');
  dispatch({ type: INDEX_MICRONS, payload: response.data });
};

export const showNode = (id) => async (dispatch) => {
  const response = await nodecosmos.get(`/nodes/${id}`);
  dispatch({ type: INDEX_MICRONS, payload: response.data.all_nested_nodes });
  dispatch({ type: SHOW_MICRON, payload: response.data });
};

/* APP */
export const setTheme = (theme) => {
  localStorage.setItem('theme', theme);

  return {
    type: SET_THEME,
    payload: theme,
  };
};

export const setCurrentToolbar = (toolbar) => ({
  type: SET_CURRENT_TOOLBAR,
  payload: toolbar,
});

export const setSubtitle = (subtitle) => ({
  type: SET_SUBTITLE,
  payload: subtitle,
});
