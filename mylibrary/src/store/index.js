import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from './slices/auth';

const devTools = true;

const store = configureStore({
  devTools,
  reducer: {
    auth,
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
