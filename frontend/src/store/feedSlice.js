import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedService from "../apiFeature/feedApi";

const initialState = {
    feed: {
        data: [],
        isLoading: false,
        success: false,
        isError: false,
        errorCode: null,
        message: '',
    }
}

export const getFeedData = createAsyncThunk(
    'feed/feedData',
    async (_, thunkAPI) => {
        try {
            return await feedService.getFeedData();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const feedSclice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        resetFeedState: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedData.pending, (state, action) => {
                state.feed.isLoading = true
                state.feed.isError = false
                state.feed.success = false
                state.feed.message = ''
            })
            .addCase(getFeedData.fulfilled, (state, action) => {
                state.feed.isLoading = false
                state.feed.success = true
                state.feed.isError = false
                state.feed.data = action.payload.result
                state.feed.message = ''
            })
            .addCase(getFeedData.rejected, (state, action) => {
                state.feed.isLoading = false
                state.feed.success = false
                state.feed.isError = true
                state.feed.data = []
                state.feed.message = action.payload
            })
    }
})

export default feedSclice.reducer;