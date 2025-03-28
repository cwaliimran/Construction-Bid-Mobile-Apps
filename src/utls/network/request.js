import axios from 'axios';

const HOST_API = `http://18.221.36.251/`;
// const HOST_API = `http://192.168.100.82:5000/`;

export const postRequest = async ({endpoint, payload}) => {
  let response = await axios.post(`${HOST_API}${endpoint}`, payload);
  return response;
};

export const getRequest = async ({endpoint}) => {
  let response = await axios.get(`${HOST_API}${endpoint}`);
  return response;
};

export const putRequest = async ({endpoint, payload}) => {
  let response = await axios.put(`${HOST_API}${endpoint}`, payload);
  return response;
};

export const patchRequest = async ({endpoint, payload}) => {
  let response = await axios.patch(`${HOST_API}${endpoint}`, payload);
  return response;
};

export const postFormRequest = async ({endpoint, payload}) => {
  let response = await axios.post(`${HOST_API}${endpoint}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const deleteRequest = async ({endpoint}) => {
  let response = await axios.delete(`${HOST_API}${endpoint}`);
  return response;
};
