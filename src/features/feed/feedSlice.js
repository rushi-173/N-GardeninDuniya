import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../config";
import axios from "axios";

export const initPosts = createAsyncThunk('feed/initPosts', async (_, { getState }) => {
    const response = await axios.get(`${API_URL}/home/feed?current=0&&size=5`);
    return response.data;
})

export const fetchFeedPosts = createAsyncThunk('feed/fetchFeedPosts', async (_, { getState }) => {
    const response = await axios.get(`${API_URL}/home/feed?current=${getState().feed.next}&&size=5`);
    return response.data;
})

export const addNewPost = createAsyncThunk('feed/addNewPost', async (requestData) => {
    const response = await axios.post(`${API_URL}/posts/`, requestData);
    return response.data;
})

export const createLikeOnFeedPost = createAsyncThunk('feed/createLikeOnFeedPost', async (postId) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/likes`);
    return response.data;
})

export const removeLikeFromFeedPost = createAsyncThunk('feed/removeLikeFromFeedPost', async (postId) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}/likes`);
    return response.data;
})

export const createCommentOnFeedPost = createAsyncThunk('feed/createCommentOnFeedPost', async (requestData) => {    
    const response = await axios.post(`${API_URL}/posts/${requestData.postId}/comments`, requestData.comment);
    return response.data;
})

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
        next: 0
    },
    reducers: {        
        resetFeed(state, action) {
            state.posts = [];
            state.status = 'idle';
            state.error = null;
            state.next = 0;
        }
    },
    extraReducers: {
        [initPosts.pending]: (state, action) => {            
            state.status = 'loading';
        },
        [initPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts;
            if (action.payload.next) {
                state.next = action.payload.next;
            } else {
                state.next = null;
            }
            state.status = 'idle';
        },
        [fetchFeedPosts.pending]: (state, action) => {            
            state.status = 'loading';
        },
        [fetchFeedPosts.fulfilled]: (state, action) => {            
            state.posts = state.posts.concat(action.payload.posts);
            if (action.payload.next) {
                state.next = action.payload.next;
            } else {
                state.next = null;
            }
            state.status = 'idle';
        },
        [fetchFeedPosts.rejected]: (state, action) => {         
            state.status = 'error';
            state.error = action.error.message;
        },
        [addNewPost.fulfilled]: (state, action) => {            
            state.posts.unshift(action.payload.post);
        },
        [createLikeOnFeedPost.fulfilled]: (state, action) => {            
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);            
            state.posts[postIndex] = action.payload.post;
        },
        [removeLikeFromFeedPost.fulfilled]: (state, action) => {            
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);            
            state.posts[postIndex] = action.payload.post;
        },
        [createCommentOnFeedPost.fulfilled]: (state, action) => {            
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);            
            state.posts[postIndex] = action.payload.post;
        },
    }
})

export const { resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
