import {
  CREATE_MICRON,
  UPDATE_MICRON,
  DELETE_MICRON,
  SHOW_MICRON,
  INDEX_MICRONS,
  ADD_MICRON_PROPERTY,
  DELETE_MICRON_PROPERTIES,
} from '../actions/types';
import listToObject from './helpers/model-list-to-object';

export default (state = {}, action) => {
  switch (action.type) {
    case INDEX_MICRONS:
      return {
        ...state,
        ...listToObject(action.payload),
      };
    case CREATE_MICRON:
    case UPDATE_MICRON:
    case SHOW_MICRON:
      return { ...state, [action.payload.id]: { ...action.payload, fetched: true } };
    case DELETE_MICRON: {
      const { [action.payload]: _, ...rest } = state;

      return rest;
    }
    case ADD_MICRON_PROPERTY: {
      const micronWithProp = { ...state[action.payload.id] };

      micronWithProp.properties = { ...micronWithProp.properties, ...action.payload.property };

      return { ...state, [action.payload.id]: micronWithProp };
    }
    case DELETE_MICRON_PROPERTIES: {
      const micronWithoutProps = { ...state[action.payload.id] };
      const newProperties = { ...micronWithoutProps.properties };

      action.payload.properties.forEach((prop) => delete newProperties[prop]);
      micronWithoutProps.properties = newProperties;

      return { ...state, [action.payload.id]: micronWithoutProps };
    }
    default:
      return state;
  }
};
