import { baseUrl, baseUrlAuthorization } from 'config';


const userSuggestion = (id, accessToken) => (
    baseUrlAuthorization(accessToken).get(`/user/${id}`)
  );

  const bookRead = (id, book_id, token) => (
    baseUrlAuthorization(token).patch(`user/${id}/read/${book_id}`)
  )

  export {
    userSuggestion,
    bookRead
  };