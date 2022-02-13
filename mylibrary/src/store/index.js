import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';

import auth from './slices/auth';
import loader from './slices/loader';

const devTools = true;

const store = configureStore({
  devTools,
  reducer: {
    auth,
    loader,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();

    if (devTools) {
      middleware.push(logger);
    }

    return middleware;
  },
});

export default store;
export * from './slices/auth';
