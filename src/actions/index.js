import nodecosmos from '../apis/nodecosmos-server';
import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
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

  dispatch({ type: CREATE_NODE, payload: response.data });

  if (parentNode) {
    const newParent = { ...parentNode };
    newParent.node_ids = newParent.node_ids || [];
    newParent.node_ids.push(response.data.id);
    dispatch({ type: UPDATE_NODE, payload: newParent });
  } else {
    history.push(`/nodes/${response.data.id}`);
  }
};

export const updateNode = (id, payload) => async (dispatch) => {
  // const response = await nodecosmos.patch(`/nodes/${id}`, payload);
  dispatch({ type: UPDATE_NODE, payload });
};

export const deleteNode = (id, parentNode = null) => async (dispatch) => {
  await nodecosmos.post(`/nodes/delete/${id}`);
  if (parentNode && parentNode.id !== id) {
    const newParent = { ...parentNode };
    newParent.node_ids = newParent.node_ids || [];
    newParent.node_ids.splice(parentNode.node_ids.indexOf(id), 1);
    dispatch({ type: UPDATE_NODE, payload: newParent });
  }
  dispatch({ type: DELETE_NODE, payload: id });
  if (id === parentNode.id) { // if we delete currentNode
    history.push('/m');
  } else {
    history.goBack();
  }
};
