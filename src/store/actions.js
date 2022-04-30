import {
  INITIALIZED,
  NETWORK_CHANGED,
  UPDATE_USER,
  SET_REGION,
  FIRST_LOAD,
  NEW_VERSION,
  SET_LOCATION,
  SET_ROOT_ACTION,
  SET_TOKEN,
} from './types';

export default function useActions(state, dispatch) {
  const setInitialized = initialized =>
    dispatch({type: INITIALIZED, payload: initialized});
  const setNewVersionAvailable = isNewVersionAvailable =>
    dispatch({type: NEW_VERSION, payload: isNewVersionAvailable});
  const setRegion = region => dispatch({type: SET_REGION, payload: region});
  const setFirstLoad = isFirstLoad =>
    dispatch({type: FIRST_LOAD, payload: isFirstLoad});

  const networkConnectionChanged = networkChangeState =>
    dispatch({type: NETWORK_CHANGED, payload: networkChangeState});

  const updateUser = user => dispatch({type: UPDATE_USER, payload: user});

  const updateLocation = location =>
    dispatch({type: SET_LOCATION, payload: location});

  const updateRootAction = data =>
    dispatch({type: SET_ROOT_ACTION, payload: data});
  const clearRootAction = () => dispatch({type: SET_ROOT_ACTION, payload: {}});

  const updateToken = token => dispatch({type: SET_TOKEN, payload: token});

  return {
    setRegion,
    setNewVersionAvailable,
    setFirstLoad,
    setInitialized,
    networkConnectionChanged,
    updateUser,
    updateLocation,
    updateRootAction,
    clearRootAction,
    updateToken,
  };
}
