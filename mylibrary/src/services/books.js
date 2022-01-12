import { baseUrl, baseUrlAuthorization } from 'config';

/**
 * @typedef BookShortRes
 * @property {string} title
 * @property {string} author - author id
 * @property {string} image - books cover url
 * @property {string} id - public id
 */

/**
 * @description Get all books
 * @param {number} [currentPage=0] - default=0
 * @param {number} [limit=20] - default=20
 * @returns {Promise<AxiosResponse<BookShortRes>>}
 */
const getAll = (currentPage = 0, limit = 20) => (
  baseUrl.get(`books/public/all?current_page=${currentPage}&limit=${limit}`)
);

/**
 * @description Get a book information
 * @param {string} uuid - Public id of the book
 * @returns {Promise<AxiosResponse<BookShortRes>>}
 */
const getId = (uuid) => baseUrl.get(`book/public/${uuid}`);

/**
 *
 * @param {string} input - Search input
 * @param {string} [type=DEFAULT] - Search type
 * @param {number} [currentPage=0] - default=0
 * @param {number} [limit=20] - default=20
 * @returns {Promise<AxiosResponse<BookShortRes>>}
 */
const publicSearch = (input, type = 'DEFAULT', currentPage = 0, limit = 20) => (
  baseUrl.get(`books/public?search=${input}&type=${type}&limit=${limit}&current_page=${currentPage}`)
);

/**
 *
 * @param {string} input - Search input
 * @param {string} accessToken - Authentication token
 * @param {string} [type=DEFAULT] - Search type
 * @param {number} [currentPage=0] - default=0
 * @param {number} [limit=20] - default=20
 * @returns {Promise<AxiosResponse<BookShortRes>>}
 */
const userSearch = (input, accessToken, type = 'DEFAULT', currentPage = 0, limit = 20) => (
  baseUrlAuthorization(accessToken).get(`books/public?search=${input}&type=${type}&limit=${limit}&current_page=${currentPage}`)
);

export {
  getAll,
  getId,
  publicSearch,
  userSearch,
};
