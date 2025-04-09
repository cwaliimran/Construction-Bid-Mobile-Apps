import {createSlice} from '@reduxjs/toolkit';
import {
  deleteRequest,
  postFormRequest,
  putRequest,
} from '../../utls/network/request';
import {API_ENDPOINTS} from '../../utls/network/axios';

const initialState = {
  isUploadLoading: false,
};

const slice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isUploadLoading = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

export const uploadFile = payload => async dispatch => {
  dispatch(actions.setLoading(true));
  try {
    const response = await postFormRequest({
      endpoint: `${API_ENDPOINTS.upload.file}`,
      payload: payload,
    });
    dispatch(actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setLoading(false));
    throw error;
  }
};

export const deleteFile = payload => async dispatch => {
  dispatch(actions.setLoading(true));
  try {
    const response = await putRequest({
      endpoint: `${API_ENDPOINTS.upload.deleteFile}`,
      payload: payload,
    });
    dispatch(actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setLoading(false));
    throw error;
  }
};
