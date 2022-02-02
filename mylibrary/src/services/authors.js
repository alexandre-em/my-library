import { baseUrl, baseUrlAuthorization } from 'config';

const getAllAuthor = (currentPage, limit = 10) => (
    baseUrl.get(`authors/public/all?current_page=${currentPage}&limit=${limit}`)
  );


  export {
    getAllAuthor,
  };