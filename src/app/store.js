import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/user/userSlice"
import feedReducer from "../features/feed/feedSlice"
import profileReducer from "../features/profile/profileSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        profile: profileReducer
    },
});
