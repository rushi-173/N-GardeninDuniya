import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../config";

export const fetchProfilePosts = createAsyncThunk('profile/fetchProfilePosts', async (userId) => {
    const response = await axios.get(`${API_URL}/posts?userId=${userId}`);
    return response.data;
})

export const fetchUser = createAsyncThunk('profile/fetchUser', async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
})

export const createLikeOnProfilePost = createAsyncThunk('profile/createLikeOnProfilePost', async (postId) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/likes`);
    return response.data;
})

export const removeLikeFromProfilePost = createAsyncThunk('profile/removeLikeFromProfilePost', async (postId) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}/likes`);
    return response.data;
})

export const createCommentOnProfilePost = createAsyncThunk('profile/createCommentOnProfilePost', async (requestData) => {
    const response = await axios.post(`${API_URL}/posts/${requestData.postId}/comments`, requestData.comment);
    return response.data;
})

export const follow = createAsyncThunk('profile/follow', async (requestData) => {
    const response = await axios.post(`${API_URL}/user-connections`, requestData);
    return response.data;
})

export const unFollow = createAsyncThunk('profile/unFollow', async (_, { getState }) => {
    const response = await axios.delete(`${API_URL}/user-connections/${getState().profile.following._id}`);
    return response.data;
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: null,
        following: null,
        posts: [],
    },
    reducers: {
        resetProfile(state, action) {
            state.user = null
            state.following = false
            state.posts = []
        }
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {            

        },
        [fetchUser.fulfilled]: (state, action) => {            
            state.user = action.payload.user;
            state.following = action.payload.following;
        },
        [fetchUser.rejected]: (state, action) => {            
        },

        [fetchProfilePosts.pending]: (state, action) => {            

        },
        [fetchProfilePosts.fulfilled]: (state, action) => {            
            state.posts = action.payload.posts;

        },
        [fetchProfilePosts.rejected]: (state, action) => {                    
        },
        [createLikeOnProfilePost.fulfilled]: (state, action) => {            
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);            
            state.posts[postIndex] = action.payload.post;
        },
        [removeLikeFromProfilePost.fulfilled]: (state, action) => {            
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);            
            state.posts[postIndex] = action.payload.post;
        },
        [createCommentOnProfilePost.fulfilled]: (state, action) => {            
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);            
            state.posts[postIndex] = action.payload.post;
        },
        [follow.fulfilled]: (state, action) => {            
            state.following = action.payload.following;
            state.user.followerCount = state.user.followerCount + 1;
        },
        [unFollow.fulfilled]: (state, action) => {            
            state.following = null;
            state.user.followerCount = state.user.followerCount - 1;
        },
        [unFollow.rejected]: (state, action) => {            
            state.following = null;
            state.user.followerCount = state.user.followerCount - 1;
        }
    }
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
