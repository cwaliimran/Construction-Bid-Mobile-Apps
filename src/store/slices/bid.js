import {createSlice} from '@reduxjs/toolkit';
import {API_ENDPOINTS} from '../../utls/network/axios';
import {
  deleteRequest,
  getRequest,
  postRequest,
} from '../../utls/network/request';

const initialState = {
  isLoading: false,
  isDeleteLoading: false,
  isAddBidLoading: false,
  bids: [],
};

const slice = createSlice({
  name: 'bid',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsDeleteLoading(state, action) {
      state.isDeleteLoading = action.payload;
    },
    setIsAddBidLoading(state, action) {
      state.isAddBidLoading = action.payload;
    },
    setBidData(state, action) {
      state.bids = action.payload;
    },
    setDeleteBidData(state, action) {
      state.bids = state.bids.filter(bid => bid.id !== action.payload);
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

export const getBids = payload => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBids}`,
      payload: payload,
    });
    dispatch(actions.setBidData(response?.data?.bids));
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const deleteBid = id => async dispatch => {
  dispatch(actions.setIsDeleteLoading(true));
  try {
    const response = await deleteRequest({
      endpoint: `${API_ENDPOINTS.bid.deleteBid}/${id}`,
    });
    dispatch(actions.setDeleteBidData(id));
    dispatch(actions.setIsDeleteLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsDeleteLoading(false));
    throw error;
  }
};

export const getBidPropertyType = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidPropertyType}`,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidPlumbingItem = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidPlumbingItem}`,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidHVACItem = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidHVACItem}`,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidElectricItem = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidElectricItem}`,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidGeneralItem = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidGeneralItem}`,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidMiscWorkItem = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidMiscWorkItem}`,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const addBid = payload => async dispatch => {
  dispatch(actions.setIsAddBidLoading(true));
  try {
    const response = await postRequest({
      endpoint: `${API_ENDPOINTS.bid.addBid}`,
      payload: payload,
    });
    dispatch(actions.setIsAddBidLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsAddBidLoading(false));
    throw error;
  }
};
