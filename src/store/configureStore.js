import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slice/auth.slice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
