import microcosmos from '../apis/microcosmos-server';
import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_MICRON,
  UPDATE_MICRON,
  DELETE_MICRON,
  INDEX_MICRONS,
  SHOW_MICRON,
  SET_CURRENT_TOOLBAR, SET_SUBTITLE,
} from './types';

/* User Actions */
export const login = (payload) => ({ type: SIGN_IN, payload });
export const logout = () => ({ type: SIGN_OUT });

/* Micron Actions */
export const createMicron = (payload, parentMicron = null) => async (dispatch) => {
  const response = await microcosmos.post('/microns.json', payload);

  dispatch({ type: CREATE_MICRON, payload: response.data });

  if (parentMicron) {
    const newParent = { ...parentMicron };
    newParent.micron_ids = newParent.micron_ids || [];
    newParent.micron_ids.push(response.data.id);
    dispatch({ type: UPDATE_MICRON, payload: newParent });
  } else {
    history.push(`/microns/${response.data.id}`);
  }
};

export const updateMicron = (id, payload) => async (dispatch) => {
  const response = await microcosmos.patch(`/microns/${id}`, payload);
  dispatch({ type: UPDATE_MICRON, payload: response.data });
};

export const deleteMicron = (id, parentMicron = null) => async (dispatch) => {
  await microcosmos.post(`/microns/delete/${id}`);
  if (parentMicron && parentMicron.id !== id) {
    const newParent = { ...parentMicron };
    newParent.micron_ids = newParent.micron_ids || [];
    newParent.micron_ids.splice(parentMicron.micron_ids.indexOf(id), 1);
    dispatch({ type: UPDATE_MICRON, payload: newParent });
  }
  dispatch({ type: DELETE_MICRON, payload: id });
  if (id === parentMicron.id) { // if we delete currentMicron
    history.push('/m');
  } else {
    history.goBack();
  }
};

export const indexMicrons = () => async (dispatch) => {
  const response = await microcosmos.get('/microns');
  dispatch({ type: INDEX_MICRONS, payload: response.data });
};

export const showMicron = (id) => async (dispatch) => {
  const response = await microcosmos.get(`/microns/${id}`);
  dispatch({ type: SHOW_MICRON, payload: response.data });
};

/* APP */

export const setCurrentToolbar = (toolbar) => ({
  type: SET_CURRENT_TOOLBAR,
  payload: toolbar,
});

export const setSubtitle = (subtitle) => ({
  type: SET_SUBTITLE,
  payload: subtitle,
});
