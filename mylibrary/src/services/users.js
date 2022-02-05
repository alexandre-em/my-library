import { baseUrl, baseUrlAuthorization } from 'config';


const userSuggestion = (id, accessToken) => (
    baseUrlAuthorization(accessToken).get(`/user/${id}`)
  );

  const bookRead = (id, book_id, token) => (
    baseUrlAuthorization(token).patch(`user/${id}/read/${book_id}`)
  );

  const getAllBookRead = (token, id, currentPage, limit = 20) =>(
    baseUrlAuthorization(token).get(`user/books/${id}?currentPage=${currentPage}&limit=${limit}`)
  )

  export {
    userSuggestion,
    bookRead,
    getAllBookRead,
  };