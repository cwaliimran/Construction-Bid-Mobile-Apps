import {createSlice} from '@reduxjs/toolkit';
import {API_ENDPOINTS} from '../../utls/network/axios';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../utls/network/request';

const initialState = {
  isLoading: false,
  isDeleteLoading: false,
  isAddBidLoading: false,
  bids: [],
  bid: null,
  addNewItem: [],
  totalPages: 1,
  totalPagesItem: 1,
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

    setNewBidData(state, action) {
      state.bids = state.bids.concat(action.payload);
    },

    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },

    setTotalPagesItem(state, action) {
      state.totalPagesItem = action.payload;
    },

    setBid(state, action) {
      state.bid = action.payload;
    },

    setUpdateBid(state, action) {
      const updatedItem = action.payload;

      if (!state.bid?.sections) return;

      let newTotalProjectCost = 0;

      state.bid = {
        ...state.bid,
        sections: Object.keys(state.bid.sections).reduce((acc, sectionId) => {
          const section = state.bid.sections[sectionId];

          acc[sectionId] = {
            ...section,
            items: section.items
              ? section.items.map(item => {
                  if (item.itemId === updatedItem.itemId) {
                    const updated = {...item, ...updatedItem};
                    updated.totalCost = updated.unitCost * updated.quantity; // Update total cost
                    return updated;
                  }
                  return item;
                })
              : section.items,
          };

          // Calculate total cost for this section
          if (acc[sectionId].items) {
            newTotalProjectCost += acc[sectionId].items.reduce(
              (sum, item) => sum + (item.totalCost || 0),
              0,
            );
          }

          return acc;
        }, {}),
        totalProjectCost: newTotalProjectCost, // Update total project cost
      };
    },

    setUpdateBidPropertySection(state, action) {
      const updatedItem = action.payload;

      if (!state.bid?.sections || !state.bid.sections[updatedItem.sectionId])
        return;

      state.bid = {
        ...state.bid,
        sections: {
          ...state.bid.sections,
          [updatedItem.sectionId]: {
            ...state.bid.sections[updatedItem.sectionId], // Preserve other properties
            address:
              updatedItem.address ??
              state.bid.sections[updatedItem.sectionId].address,
            areaSqft:
              updatedItem.areaSqft ??
              state.bid.sections[updatedItem.sectionId].areaSqft,
            propertyId:
              updatedItem.propertyId ??
              state.bid.sections[updatedItem.sectionId].propertyId,
            propertyName:
              updatedItem.propertyName ??
              state.bid.sections[updatedItem.sectionId].propertyName,
          },
        },
      };
    },

    setUpdateBidImages(state, action) {
      const updatedItem = action.payload;

      if (!state.bid?.sections || !state.bid.sections[updatedItem.sectionId])
        return;

      state.bid = {
        ...state.bid,
        sections: {
          ...state.bid.sections,
          [updatedItem.sectionId]: {
            ...state.bid.sections[updatedItem.sectionId], // Preserve other properties
            images:
              updatedItem.images ??
              state.bid.sections[updatedItem.sectionId].images,
          },
        },
      };
    },

    setRemoveBidItem(state, action) {
      const itemId = action.payload;

      if (!state.bid?.sections) return;

      let newTotalProjectCost = 0;

      state.bid = {
        ...state.bid,
        sections: Object.keys(state.bid.sections).reduce((acc, sectionId) => {
          const section = state.bid.sections[sectionId];

          // Filter out the item to remove
          const updatedItems = section.items
            ? section.items.filter(item => item.itemId !== itemId)
            : section.items;

          acc[sectionId] = {
            ...section,
            items: updatedItems,
          };

          // Recalculate total project cost
          if (updatedItems) {
            newTotalProjectCost += updatedItems.reduce(
              (sum, item) => sum + (item.totalCost || 0),
              0,
            );
          }

          return acc;
        }, {}),
        totalProjectCost: newTotalProjectCost, // Update total project cost after removal
      };
    },

    setDeleteBidData(state, action) {
      state.bids = state.bids.filter(bid => bid.id !== action.payload);
    },
    setAddNewItemData(state, action) {
      state.addNewItem = [...state.addNewItem, action.payload];
    },
    setEmptyNewItemData(state, action) {
      state.addNewItem = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

export const getBids = (page, search) => async dispatch => {
  if (page === 1) {
    dispatch(actions.setIsLoading(true));
  }
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBids}?pageno=${page}&search=${search}`,
    });

    if (page === 1) {
      dispatch(actions.setBidData(response?.data?.bids));
      dispatch(actions.setTotalPages(response?.data?.total_pages));
    } else if (page > 1) {
      dispatch(actions.setNewBidData(response?.data?.bids));
    }
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBid = id => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBid}?bidId=${id}`,
    });
    dispatch(actions.setIsLoading(false));
    dispatch(actions.setBid(response?.data?.bid));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getSections = () => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getSections}`,
    });
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

export const getBidPlumbingItem = (page, search) => async dispatch => {
  if (page === 1) {
    dispatch(actions.setIsLoading(true));
  }
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidPlumbingItem}?pageno=${page}&search=${search}`,
    });
    if (page === 1) {
      dispatch(actions.setTotalPagesItem(response?.data?.total_pages));
    }
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidHVACItem = (page, search) => async dispatch => {
  if (page === 1) {
    dispatch(actions.setIsLoading(true));
  }
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidHVACItem}?pageno=${page}&search=${search}`,
    });
    if (page === 1) {
      dispatch(actions.setTotalPagesItem(response?.data?.total_pages));
    }
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidElectricItem = (page, search) => async dispatch => {
  if (page === 1) {
    dispatch(actions.setIsLoading(true));
  }
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidElectricItem}?pageno=${page}&search=${search}`,
    });
    if (page === 1) {
      dispatch(actions.setTotalPagesItem(response?.data?.total_pages));
    }
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidGeneralItem = (page, search) => async dispatch => {
  if (page === 1) {
    dispatch(actions.setIsLoading(true));
  }
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidGeneralItem}?pageno=${page}&search=${search}`,
    });
    if (page === 1) {
      dispatch(actions.setTotalPagesItem(response?.data?.total_pages));
    }
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const getBidMiscWorkItem = (page, search) => async dispatch => {
  if (page === 1) {
    dispatch(actions.setIsLoading(true));
  }
  try {
    const response = await getRequest({
      endpoint: `${API_ENDPOINTS.bid.getBidMiscWorkItem}?pageno=${page}&search=${search}`,
    });
    if (page === 1) {
      dispatch(actions.setTotalPagesItem(response?.data?.total_pages));
    }
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

export const updateBid = payload => async dispatch => {
  dispatch(actions.setIsAddBidLoading(true));
  try {
    const response = await putRequest({
      endpoint: `${API_ENDPOINTS.bid.updateBid}`,
      payload: payload,
    });
    dispatch(actions.setIsAddBidLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsAddBidLoading(false));
    throw error;
  }
};

export const addItem = payload => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await postRequest({
      endpoint: `${API_ENDPOINTS.bid.addItem}`,
      payload: payload,
    });
    dispatch(actions.setIsLoading(false));
    dispatch(actions.setAddNewItemData(response?.data?.itemInformation));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const updateItem = payload => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await putRequest({
      endpoint: `${API_ENDPOINTS.bid.updateItem}`,
      payload: payload,
    });
    dispatch(actions.setIsLoading(false));
    dispatch(actions.setUpdateBid(response?.data?.itemInformation));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const bidSendEmail = payload => async dispatch => {
  dispatch(actions.setIsLoading(true));
  try {
    const response = await postRequest({
      endpoint: `${API_ENDPOINTS.download.bidPdfSend}`,
      payload: payload,
    });
    dispatch(actions.setIsLoading(false));
    return response;
  } catch (error) {
    dispatch(actions.setIsLoading(false));
    throw error;
  }
};

export const deleteItem = id => async dispatch => {
  dispatch(actions.setRemoveBidItem(id));
};

export const emptyAddItem = () => async dispatch => {
  dispatch(actions.setEmptyNewItemData([]));
};

export const setUpdateBidPropertySection = payload => async dispatch => {
  dispatch(actions.setUpdateBidPropertySection(payload));
};

export const setUpdateBidImages = payload => async dispatch => {
  dispatch(actions.setUpdateBidImages(payload));
};

// setUpdateBidImages
