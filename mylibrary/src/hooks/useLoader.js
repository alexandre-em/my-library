import { useDispatch, useSelector } from 'react-redux';

import { loaderSlice } from 'store/slices/loader';

export default function useLoader() {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader);

  const type = {
    search: 'search',
    books: 'books',
    book: 'book',
    authors: 'authors',
    author: 'author',
    user: 'user',
  };

  /**
   * @param {Object} value contains an object with the key to update and its value(s)
   */
  const setToLoading = (value) => {
    dispatch(loaderSlice.actions.update({
      ...value,
    }));
  };

  const setLoadingOff = () => {
    dispatch(loaderSlice.actions.reset());
  };

  return {
    type,
    loaderState,
    setToLoading,
    setLoadingOff,
  };
}
