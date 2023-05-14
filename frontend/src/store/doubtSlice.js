import doubtService from "../apiFeature/doubtApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const init = {
    data: [],
    isLoading: false,
    success: false,
    isError: false,
    message: '',
}

const initialState = {
    relatedDoubts: init,
    similarDoubts: init,
    doubtDetails: { ...init, data: {} },
    myDoubts: init,
    newDoubt: { ...init, data: {} }
}


export const getRelatedDoubts = createAsyncThunk(
    'doubt/relatedDoubts',
    async (_, thunkAPI) => {
        try {
            return await doubtService.getRelatedDoubts();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getSimilarDoubts = createAsyncThunk(
    'doubt/similarDoubts',
    async (id, thunkAPI) => {
        try {
            return await doubtService.getSimilarDoubts(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getDoubtDetails = createAsyncThunk(
    'doubt/doubtDetails',
    async (id, thunkAPI) => {
        try {
            return await doubtService.getDoubtDetails(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getMyDoubts = createAsyncThunk(
    'doubt/myDoubts',
    async (id, thunkAPI) => {
        try {
            return await doubtService.getMyDoubts(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const createDoubt = createAsyncThunk(
    'doubt/create',
    async (data, thunkAPI) => {
        try {
            return await doubtService.createDoubt(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    }
)

const doubtSlice = createSlice({
    name: 'doubt',
    initialState,
    reducers: {
        resetDoubtState(state) {
            state = initialState
        },
        resetNewDoubtState(state) {
            state.newDoubt = { ...init, data: {} }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRelatedDoubts.pending, (state) => {
                state.relatedDoubts.isLoading = true
                state.relatedDoubts.success = false
                state.relatedDoubts.isError = false
                state.relatedDoubts.message = ''
            })
            .addCase(getRelatedDoubts.fulfilled, (state, action) => {
                state.relatedDoubts.isLoading = false
                state.relatedDoubts.success = true
                state.relatedDoubts.data = action.payload.result
                state.relatedDoubts.isError = false
                state.relatedDoubts.message = ''
            })
            .addCase(getRelatedDoubts.rejected, (state, action) => {
                state.relatedDoubts.isLoading = false
                state.relatedDoubts.success = false
                state.relatedDoubts.data = []
                state.relatedDoubts.isError = true
                state.relatedDoubts.message = action.payload
            })
            .addCase(getSimilarDoubts.pending, (state) => {
                state.similarDoubts.isLoading = true
                state.similarDoubts.success = false
                state.similarDoubts.isError = false
                state.similarDoubts.message = ''
            })
            .addCase(getSimilarDoubts.fulfilled, (state, action) => {
                state.similarDoubts.isLoading = false
                state.similarDoubts.success = true
                state.similarDoubts.data = action.payload.result
                state.similarDoubts.isError = false
                state.similarDoubts.message = ''
            })
            .addCase(getSimilarDoubts.rejected, (state, action) => {
                state.similarDoubts.isLoading = false
                state.similarDoubts.success = false
                state.similarDoubts.data = []
                state.similarDoubts.isError = true
                state.similarDoubts.message = action.payload
            })
            .addCase(getDoubtDetails.pending, (state) => {
                state.doubtDetails.isLoading = true
                state.doubtDetails.success = false
                state.doubtDetails.isError = false
                state.doubtDetails.message = ''
            })
            .addCase(getDoubtDetails.fulfilled, (state, action) => {
                state.doubtDetails.isLoading = false
                state.doubtDetails.success = true
                state.doubtDetails.data = action.payload.result
                state.doubtDetails.isError = false
                state.doubtDetails.message = ''
            })
            .addCase(getDoubtDetails.rejected, (state, action) => {
                state.doubtDetails.isLoading = false
                state.doubtDetails.success = false
                state.doubtDetails.data = []
                state.doubtDetails.isError = true
                state.doubtDetails.message = action.payload
            })
            .addCase(getMyDoubts.pending, (state) => {
                state.myDoubts.isLoading = true
                state.myDoubts.success = false
                state.myDoubts.isError = false
                state.myDoubts.message = ''
            })
            .addCase(getMyDoubts.fulfilled, (state, action) => {
                state.myDoubts.isLoading = false
                state.myDoubts.success = true
                state.myDoubts.data = action.payload.result
                state.myDoubts.isError = false
                state.myDoubts.message = ''
            })
            .addCase(getMyDoubts.rejected, (state, action) => {
                state.myDoubts.isLoading = false
                state.myDoubts.success = false
                state.myDoubts.data = []
                state.myDoubts.isError = true
                state.myDoubts.message = action.payload
            })
            .addCase(createDoubt.pending, (state) => {
                state.newDoubt.isLoading = true
                state.newDoubt.data = {}
                state.newDoubt.success = false
                state.newDoubt.isError = false
                state.newDoubt.message = ''
            })
            .addCase(createDoubt.fulfilled, (state, action) => {
                state.newDoubt.isLoading = false
                state.newDoubt.success = true
                state.newDoubt.data = action.payload.result
                state.newDoubt.isError = false
                state.newDoubt.message = ''
            })
            .addCase(createDoubt.rejected, (state, action) => {
                state.newDoubt.isLoading = false
                state.newDoubt.success = false
                state.newDoubt.data = {}
                state.newDoubt.isError = true
                state.newDoubt.message = action.payload
            })
    }
})
export const { resetNewDoubtState } = doubtSlice.actions
export default doubtSlice.reducer;