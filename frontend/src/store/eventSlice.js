import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "../apiFeature/eventApi";

const init = {
    data: [],
    isLoading: false,
    success: false,
    isError: false,
    message: ''
}

const initialState = {
    nearbyEvents: init,
    newEvent: {...init, data: {}},
    allEvents: init,
    event: {...init, data: {}}
}

export const getNearbyEvents = createAsyncThunk(
    'event/nearbyEvents',
    async (_, thunkApi) => {
        try {
            return await eventService.getNearbyEvents();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
)
export const getEventDetails = createAsyncThunk(
    'event/eventDetails',
    async (id, thunkApi) => {
        try {
            return await eventService.getEventDetails(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
)

export const getAllEvents = createAsyncThunk(
    'event/allEvents',
    async (_, thunkApi) => {
        try {
            return await eventService.getAllEvents();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
)

export const createEvent = createAsyncThunk(
    'event/newEvent',
    async (data, thunkApi) => {
        try {
            return await eventService.createEvent(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetEventState(state) {
            state = initialState
        },
        resetNewEventState(state) {
            state.newEvent = {...init, data: {}}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNearbyEvents.pending, (state) => {
                state.nearbyEvents.isLoading = true
                state.nearbyEvents.success = false
                state.nearbyEvents.isError = false
                state.nearbyEvents.message = ''
            })
            .addCase(getNearbyEvents.fulfilled, (state, action) => {
                state.nearbyEvents.isLoading = false
                state.nearbyEvents.success = true
                state.nearbyEvents.data = action.payload.result
                state.nearbyEvents.isError = false
                state.nearbyEvents.message = ''
            })
            .addCase(getNearbyEvents.rejected, (state, action) => {
                state.nearbyEvents.isLoading = false
                state.nearbyEvents.success = false
                state.nearbyEvents.data = []
                state.nearbyEvents.isError = true
                state.nearbyEvents.message = action.payload
            })
            .addCase(getEventDetails.pending, (state) => {
                state.event.isLoading = true
                state.event.success = false
                state.event.isError = false
                state.event.message = ''
            })
            .addCase(getEventDetails.fulfilled, (state, action) => {
                state.event.isLoading = false
                state.event.success = true
                state.event.data = action.payload.result
                state.event.isError = false
                state.event.message = ''
            })
            .addCase(getEventDetails.rejected, (state, action) => {
                state.event.isLoading = false
                state.event.success = false
                state.event.data = {}
                state.event.isError = true
                state.event.message = action.payload
            })
            .addCase(getAllEvents.pending, (state) => {
                state.allEvents.isLoading = true
                state.allEvents.success = false
                state.allEvents.isError = false
                state.allEvents.message = ''
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.allEvents.isLoading = false
                state.allEvents.success = true
                state.allEvents.data = action.payload.result
                state.allEvents.isError = false
                state.allEvents.message = ''
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.allEvents.isLoading = false
                state.allEvents.success = false
                state.allEvents.data = []
                state.allEvents.isError = true
                state.allEvents.message = action.payload
            })
            .addCase(createEvent.pending, (state) => {
                state.newEvent.isLoading = true
                state.newEvent.success = false
                state.newEvent.isError = false
                state.newEvent.message = ''
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.newEvent.isLoading = false
                state.newEvent.success = true
                state.newEvent.data = action.payload.result
                state.newEvent.isError = false
                state.newEvent.message = ''
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.newEvent.isLoading = false
                state.newEvent.success = false
                state.newEvent.data = {}
                state.newEvent.isError = true
                state.newEvent.message = action.payload
            })
    }
})

export const {resetEventState, resetNewEventState} = eventSlice.actions;
export default eventSlice.reducer