import {createSlice} from '@reduxjs/toolkit';
import {API_ENDPOINTS} from '../../utls/network/axios';
import {getRequest, postRequest, putRequest} from '../../utls/network/request';

const initialState = {
  isLoading: false,
  user: null,
  globalEmail: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setUserData(state, action) {
      state.user = action.payload;
    },

    setGlobalEmail(state, action) {
      state.globalEmail = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

export const setUser = data => dispatch => {
  dispatch(actions.setUserData(data));
};

export const loginUser = payload => async dispatch => {
  try {
    const response = await postRequest({
      endpoint: `${API_ENDPOINTS.Auth.login}`,
      payload: payload,
    });
    dispatch(actions.setUserData(response?.data?.profile));
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMyProfile = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.Auth.getMyProfile}`,
    });
    dispatch(actions.setUserData(response?.data?.profile));
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const updateProfile = payload => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await putRequest({
      endpoint: `${API_ENDPOINTS.Auth.updateProfile}`,
      payload: payload,
    });
    dispatch(actions.setUserData(response?.data?.profile));
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const changePassword = payload => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await putRequest({
      endpoint: `${API_ENDPOINTS.Auth.changePassword}`,
      payload: payload,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const setGlobalEmail = payload => async dispatch => {
  dispatch(actions.setGlobalEmail(payload));
};
