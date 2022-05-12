import {
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  SHOW_NODE,
  INDEX_NODES,
  ADD_NODE_PROPERTY,
  DELETE_NODE_PROPERTIES,
  INCREMENT_NODES_Y_ENDS,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case INDEX_NODES: {
      const result = {};

      action.payload.forEach((payload) => {
        const { id } = payload;
        payload.node_ids = payload.node_ids || [];
        payload.x = payload.x || 60;
        payload.y = payload.y || 40;
        payload.xEnds = payload.xEnds || 100;
        payload.yEnds = payload.yEnds || 40;
        result[id] = payload;
      });

      return { ...state, ...result };
    }
    case CREATE_NODE:
    case UPDATE_NODE:
    case SHOW_NODE:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          fetched: true,
          node_ids: action.payload.node_ids || [],
          x: action.payload.x || 0,
          y: action.payload.y || 0,
          xEnds: action.payload.xEnds || 0,
          yEnds: action.payload.yEnds || 0,
        },
      };
    case INCREMENT_NODES_Y_ENDS: {
      const newState = {};

      action.payload.ids.forEach((id) => {
        const node = state[id];
        const yEnds = node.yEnds + action.payload.increment;

        newState[id] = { ...node, yEnds };
      });

      return { ...state, ...newState };
    }
    case DELETE_NODE: {
      const { [action.payload]: _, ...rest } = state;

      return rest;
    }
    case ADD_NODE_PROPERTY: {
      const nodeWithProp = { ...state[action.payload.id] };

      nodeWithProp.properties = { ...nodeWithProp.properties, ...action.payload.property };

      return { ...state, [action.payload.id]: nodeWithProp };
    }
    case DELETE_NODE_PROPERTIES: {
      const nodeWithoutProps = { ...state[action.payload.id] };
      const newProperties = { ...nodeWithoutProps.properties };

      action.payload.properties.forEach((prop) => delete newProperties[prop]);
      nodeWithoutProps.properties = newProperties;

      return { ...state, [action.payload.id]: nodeWithoutProps };
    }
    default:
      return state;
  }
};
