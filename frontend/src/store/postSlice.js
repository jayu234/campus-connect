import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../apiFeature/postApi";

const init = {
    data: [],
    isLoading: false,
    success: false,
    isError: false,
    message: ''
}

const initialState = {
    myPosts: init,
    newPost: { ...init, data: {} }
}

export const getMyPosts = createAsyncThunk(
    'post/myPosts',
    async (id, thunkAPI) => {
        try {
            return await postService.getMyPosts(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)
export const createPost = createAsyncThunk(
    'post/create',
    async (data, thunkAPI) => {
        try {
            return await postService.createPost(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetState: (state) => {
            state = initialState
        },
        resetNewPostState: (state)=>{
            state.newPost = { ...init, data: {} }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyPosts.pending, (state) => {
                state.myPosts.isLoading = true
                state.myPosts.success = false
                state.myPosts.isError = false
                state.myPosts.message = ''
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.myPosts.isLoading = false
                state.myPosts.success = true
                state.myPosts.data = action.payload.result
                state.myPosts.isError = false
                state.myPosts.message = ''
            })
            .addCase(getMyPosts.rejected, (state, action) => {
                state.myPosts.isLoading = false
                state.myPosts.success = false
                state.myPosts.data = []
                state.myPosts.isError = true
                state.myPosts.message = action.payload
            })
            .addCase(createPost.pending, (state)=>{
                state.newPost.isLoading = true
                state.newPost.data = []
                state.newPost.success = false
                state.newPost.isError = false
                state.newPost.message = ''
            })
            .addCase(createPost.fulfilled, (state, action)=>{
                state.newPost.isLoading = false
                state.newPost.data = action.payload.result
                state.newPost.success = true
                state.newPost.isError = false
                state.newPost.message = ''
            })
            .addCase(createPost.rejected, (state, action)=>{
                state.newPost.isLoading = false
                state.newPost.data = []
                state.newPost.success = false
                state.newPost.isError = true
                state.newPost.message = action.payload
            })
    }
})
export const { resetNewPostState } = postSlice.actions
export default postSlice.reducer