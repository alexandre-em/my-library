import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env';

const baseUrl = axios.create({
  baseURL: API_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const baseUrlAuthorization = (accessToken) => (
  axios.create({
    baseURL: API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`,
    },
  })
);

export {
  baseUrl,
  baseUrlAuthorization,
};
