import axios from 'axios';

const postData = (url, data) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const apiUrl = 'http://localhost:5000/api' + url;
  return axios
    .post(apiUrl, JSON.stringify(data), options)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

const postFormData = (url, data) => {
  const apiUrl = 'http://localhost:5000/api' + url;
  const config = {
    method: 'POST',
    url: apiUrl,
    data,
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

const getData = (url, params) => {
  const options = {
    params,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const apiUrl = 'http://localhost:5000/api' + url;
  return axios
    .get(apiUrl, options)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response;
    });
};

export { getData, postData, postFormData };
