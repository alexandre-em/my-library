import axios from 'axios';
import { API_URL } from '@env';

//console.log(API_URL)
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