import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../config";
import { saveUserDataToLocalStorage, setupAuthHeaderForServiceCalls } from "./utils";

export const login = createAsyncThunk('user/login', async (userCredentials, thunkAPI) => {
    const response = await axios.post(
        `${API_URL}/login`, userCredentials
    );
    if (response.data) {
        saveUserDataToLocalStorage(response.data.user, response.data.token);
        setupAuthHeaderForServiceCalls(response.data.token);
    }
    return response.data;
})

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedInUser: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state, action) => {
            state.loggedInUser = null;
            state.status = 'idle';
            state.error = null;
        },
        updateUser: (state, action) => {
            const userUpdates = action.payload;
            Object.keys(userUpdates).forEach(key => {
                if (key in state.loggedInUser) {
                    state.loggedInUser[key] = userUpdates[key];
                }
            })            
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {            
            state.loggedInUser = action.payload.user;
            state.status = 'idle';
        },
        [login.rejected]: (state, action) => {            
            state.status = 'error';
            state.error = action.error.message;
        },

        [fetchUserData.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUserData.fulfilled]: (state, action) => {            
            state.loggedInUser = action.payload.user;
            state.status = 'idle';
        },
        [fetchUserData.rejected]: (state, action) => {
            console.log("rejected", state, action);
            state.status = 'error';
            state.error = action.error.message;
        },
    }
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
