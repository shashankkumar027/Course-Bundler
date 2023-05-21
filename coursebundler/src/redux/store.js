import { configureStore } from '@reduxjs/toolkit';
import {
  deleteProfileReducer,
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

//export const server = `http://localhost:4500/api/v1`;

export const server = `https://coursebundler-48zf.onrender.com/api/v1`;

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
    deleteProfile: deleteProfileReducer,
  },
});

export default store;
