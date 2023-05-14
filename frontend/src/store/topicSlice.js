import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import topicService from "../apiFeature/topicApi";

const init = {
    data: [],
    isLoading: false,
    success: false,
    isError: false,
    message: '',
}
const initialState = {
    topic: {...init, data: {}},
    following: init,
    allTopics: init
}

export const getTopicDetails = createAsyncThunk(
    'topic/details',
    async (id, thunkAPI) => {
        try {
            return await topicService.getTopicDetails(id);
        }catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getFollowing = createAsyncThunk(
    'topic/following',
    async (id, thunkAPI) => {
        try {
            return await topicService.getFollowing(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getAllTopics = createAsyncThunk(
    'topic/topicData',
    async (_, thunkAPI) => {
        try {
            return await topicService.getAllTopics();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        resetTopic: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopicDetails.pending, (state) => {
                state.topic.isLoading = true
                state.topic.success = false
                state.topic.isError = false
                state.topic.message = ''
            })
            .addCase(getTopicDetails.fulfilled, (state, action) => {
                state.topic.isLoading = false
                state.topic.success = true
                state.topic.isError = false
                state.topic.message = ''
                state.topic.data = action.payload.result
            })
            .addCase(getTopicDetails.rejected, (state, action) => {
                state.topic.isLoading = false
                state.topic.success = false
                state.topic.isError = true
                state.topic.data = {}
                state.topic.message = action.payload
            })
            .addCase(getFollowing.pending, (state) => {
                state.following.isLoading = true
                state.following.success = false
                state.following.isError = false
                state.following.message = ''
            })
            .addCase(getFollowing.fulfilled, (state, action) => {
                state.following.isLoading = false
                state.following.success = true
                state.following.isError = false
                state.following.message = ''
                state.following.data = action.payload.result
            })
            .addCase(getFollowing.rejected, (state, action) => {
                state.following.isLoading = false
                state.following.success = false
                state.following.isError = true
                state.following.data = []
                state.following.message = action.payload
            })
            .addCase(getAllTopics.pending, (state) => {
                state.allTopics.isLoading = true
                state.allTopics.isError = false
                state.allTopics.success = false
                state.allTopics.message = ''
            })
            .addCase(getAllTopics.fulfilled, (state, action) => {
                state.allTopics.isLoading = false
                state.allTopics.success = true
                state.allTopics.isError = false
                state.allTopics.data = action.payload.result
                state.allTopics.message = ''
            })
            .addCase(getAllTopics.rejected, (state, action) => {
                state.allTopics.isLoading = false
                state.allTopics.success = false
                state.allTopics.isError = true
                state.allTopics.data = []
                state.allTopics.message = action.payload
            })
    }
})

export default topicSlice.reducer;