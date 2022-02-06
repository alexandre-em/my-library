import { baseUrlAuthorization } from 'config';

/**
 * 
 * @param {string} id 
 * @param {string} accessToken 
 * @returns 
 */
const userSuggestion = (id, accessToken) => (
    baseUrlAuthorization(accessToken).get(`/user/${id}`)
  );
/**
 * 
 * @param {string} id 
 * @param {string} book_id 
 * @param {string} token 
 * @returns 
 */
  const bookRead = (id, book_id, token) => (
    baseUrlAuthorization(token).patch(`user/${id}/read/${book_id}`)
  );
/**
 * 
 * @param {string} token 
 * @param {string} id 
 * @param {number} currentPage 
 * @param {number} limit 
 * @returns 
 */
  const getAllBookRead = (token, id, currentPage, limit = 20) =>(
    baseUrlAuthorization(token).get(`user/books/${id}?currentPage=${currentPage}&limit=${limit}`)
  )

  export {
    userSuggestion,
    bookRead,
    getAllBookRead,
  };