import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../ExampleaData.js";
import axios from "axios";

//const initialState = { value: [] };

const initialState = {
  value: UsersData,
  //logged: "Fatma",
  rcounter: 0,
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  //msg: null,
};

//create the thunk for register(type and payloadCreator):
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      //send a POST request to server:
      const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      console.log(response);
      const user = response.data.user; //retrive the response from server
      return user; //return the response from server as payload to thunk
    } catch (error) {
      console.log(error);
    }
  }
);

//create the thunk for login:

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    //send a request to your server to log user out:
    const response = await axios.post("http://localhost:3001/logout");
  } catch (error) {}
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /*addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      state.value.map((user) => {
        if (user.email === action.payload.email) {
          user.name = action.payload.name;
          user.password = action.payload.password;
        }
      });*/
  },

  /*addCounter: (state) => {
    state.rcounter += 1;
  },*/

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      //for the login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      //for the logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser, deleteUser, updateUser, addCounter } =
  userSlice.actions;
export default userSlice.reducer;
