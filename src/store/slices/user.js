import {createSlice} from '@reduxjs/toolkit';
import {API_ENDPOINTS} from '../../utls/network/axios';
import {getRequest, postRequest} from '../../utls/network/request';

const initialState = {
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
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
    dispatch(actions.setUserData(response?.data));
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserProfile = userId => async dispatch => {
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.Auth.getUserProfile}${userId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
