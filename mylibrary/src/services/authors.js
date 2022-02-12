import { baseUrl } from 'config';
/**
 *
 * @param {number} currentPage
 * @param {number} limit
 * @returns
 */
const getAllAuthor = (currentPage, limit = 10) => (
  baseUrl.get(`authors/public/all?current_page=${currentPage}&limit=${limit}`)
);
/**
 *
 * @param {string} id
 * @returns
 */
const getAuthorDetails = (id) => (
  baseUrl.get(`authors/public/${id}`)
);

export {
  getAllAuthor,
  getAuthorDetails,
};
