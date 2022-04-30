import {
  INITIALIZED,
  NETWORK_CHANGED,
  SET_REGION,
  FIRST_LOAD,
  UPDATE_USER,
  NEW_VERSION,
  SET_LOCATION,
  SET_ROOT_ACTION,
  SET_TOKEN,
} from './types';

export const initialState = {
  initialized: false,
  isFirstLoad: false,
  isNewVersionAvailable: false,
  isConnected: true,
  isInternetReachable: true,
  region: null,
  user: null,
  location: null,
  rootAction: {},
  token: '',
};

export default function reducer(state, action) {
  switch (action.type) {
    case INITIALIZED: {
      return {
        ...state,
        initialized: action.payload,
      };
    }
    case NEW_VERSION: {
      return {
        ...state,
        isNewVersionAvailable: action.payload,
      };
    }
    case SET_REGION: {
      return {
        ...state,
        region: action.payload,
      };
    }
    case FIRST_LOAD: {
      return {
        ...state,
        isFirstLoad: action.payload,
      };
    }
    case NETWORK_CHANGED: {
      const {isConnected, isInternetReachable} = action.payload;
      return {
        ...state,
        isConnected,
        isInternetReachable,
      };
    }
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case SET_ROOT_ACTION:
      return {
        ...state,
        rootAction: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
}
