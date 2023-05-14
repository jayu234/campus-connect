import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServise from "../apiFeature/userApi";


const initialState = {
  isAuthenticated: false,
  login: {
    user: {},
    isLoading: false,
    success: false,
    isError: false,
    message: '',
  },
  signup: {
    user: {},
    isLoading: false,
    success: false,
    isError: false,
    message: '',
  },
  loadUser: {
    data: {},
    isLoading: true,
    success: false,
    isError: false,
    message: '',
  },
  logout: {
    isLoading: false,
    success: false,
    isError: false,
    message: '',
  },
  editUser: {
    user: {},
    isLoading: false,
    success: false,
    isError: false,
    message: '',
  }
}

export const userSignup = createAsyncThunk(
  'user/signup',
  async (user, thunkAPI) => {
    try {
      return await authServise.signup(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (user, thunkAPI) => {
    try {
      return await authServise.editUser(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const userLogin = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    try {
      return await authServise.login(user)
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const userLogout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      return await authServise.logout();
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, thunkAPI) => {
    try {
      return await authServise.loadUser();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state = initialState
    },
    resetEditState: (state) => {
      state.editUser.isLoading = false
      state.editUser.success = false
      state.editUser.isError = false
      state.editUser.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.signup.isLoading = true
        state.signup.success = false
        state.signup.isError = false
        state.signup.message = ''
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.signup.isLoading = false
        state.signup.success = true
        state.signup.isError = false
        state.signup.message = ''
        state.isAuthenticated = false
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.signup.isLoading = false
        state.signup.success = false
        state.signup.isError = true
        state.signup.message = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.editUser.isLoading = true
        state.editUser.success = false
        state.editUser.isError = false
        state.editUser.message = ''
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.editUser.isLoading = false
        state.editUser.success = true
        state.editUser.isError = false
        state.editUser.message = ''
        state.loadUser.data = action.payload.result
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.editUser.isLoading = false
        state.editUser.success = false
        state.editUser.isError = true
        state.editUser.message = action.payload
        state.editUser.user = {}
      })
      .addCase(userLogin.pending, (state) => {
        state.login.isLoading = true
        state.login.success = false
        state.login.isError = false
        state.login.message = ''
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.login.isLoading = false
        state.isAuthenticated = true
        state.login.success = true
        state.login.isError = false
        state.login.user = action.payload
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.login.isLoading = false
        state.login.success = false
        state.login.isError = true
        state.login.message = action.payload
        state.isAuthenticated = false
        state.login.user = {}
      })
      .addCase(loadUser.pending, (state, action) => {
        state.loadUser.isLoading = true
        state.loadUser.success = false
        state.loadUser.isError = false
        state.loadUser.message = ''
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loadUser.isLoading = false
        state.isAuthenticated = true
        state.loadUser.success = true
        state.loadUser.isError = false
        state.loadUser.data = action.payload.result
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loadUser.isLoading = false
        state.loadUser.success = false
        state.loadUser.isError = true
        state.loadUser.message = action.payload
        state.isAuthenticated = false
        state.loadUser.data = {}
      })
      .addCase(userLogout.pending, (state) => {
        state.logout.isLoading = true
        state.logout.success = false
        state.logout.isError = false
        state.logout.message = ''
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.logout.isLoading = false
        state.logout.success = false
        state.logout.isError = true
        state.logout.message = action.payload
      })
  }
})

export const { resetEditState } = userSlice.actions;
export default userSlice.reducer;