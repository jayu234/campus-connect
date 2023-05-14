import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import answerService from "../apiFeature/answerApi";

const init = {
    data: [],
    isLoading: false,
    success: false,
    isError: false,
    message: '',
}

const initialState = {
    myAnswers: init,
    newAnswer: {...init, data: {}}
}

export const getMyAnswers = createAsyncThunk(
    'answer/myAnswers',
    async (id, thunkAPI) => {
        try {
            return await answerService.getMyAnswers(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const createAnswer = createAsyncThunk(
    'answer/newAnswer',
    async (data, thunkAPI) => {
        try {
            return await answerService.createAnswer(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        resetState: (state) => {
            state = initialState
        },
        resetNewAnswerState(state) {
            state.newAnswer = { ...init, data: {} }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyAnswers.pending, (state) => {
                state.myAnswers.isLoading = true
                state.myAnswers.success = false
                state.myAnswers.isError = false
                state.myAnswers.message = ''
            })
            .addCase(getMyAnswers.fulfilled, (state, action) => {
                state.myAnswers.isLoading = false
                state.myAnswers.success = true
                state.myAnswers.data = action.payload.result
                state.myAnswers.isError = false
                state.myAnswers.message = ''
            })
            .addCase(getMyAnswers.rejected, (state, action) => {
                state.myAnswers.isLoading = false
                state.myAnswers.success = false
                state.myAnswers.data = []
                state.myAnswers.isError = true
                state.myAnswers.message = action.payload
            })
            .addCase(createAnswer.pending, (state) => {
                state.newAnswer.isLoading = true
                state.newAnswer.success = false
                state.newAnswer.isError = false
                state.newAnswer.message = ''
            })
            .addCase(createAnswer.fulfilled, (state, action) => {
                state.newAnswer.isLoading = false
                state.newAnswer.success = true
                state.newAnswer.data = action.payload.result
                state.newAnswer.isError = false
                state.newAnswer.message = ''
            })
            .addCase(createAnswer.rejected, (state, action) => {
                state.newAnswer.isLoading = false
                state.newAnswer.success = false
                state.newAnswer.data = {}
                state.newAnswer.isError = true
                state.newAnswer.message = action.payload
            })
    }
})
export const { resetNewAnswerState } = answerSlice.actions
export default answerSlice.reducer