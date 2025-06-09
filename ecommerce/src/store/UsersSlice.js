import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";
import i18next from "i18next";

export const usersAllFetch = createAsyncThunk(
  "users/usersAllFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/users`, setHeaders());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const usersDelete = createAsyncThunk("users/usersDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    toast.success(i18next.t("productdeleted"), {
      position: "bottom-left",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data, {
      position: "bottom-left",
    });
  }
});

export const userFetchById = createAsyncThunk(
  "users/userFetchById",
  async (id) => {
    try {
      const response = await axios.get(`${url}/users/${id}`, setHeaders());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    singleUser: null,
    status: null,
    deleteStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(usersAllFetch.pending, (state) => { 
      state.status = "pending";
    })
    .addCase(usersAllFetch.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = "success";
    })
    .addCase(usersAllFetch.rejected, (state) => {
      state.status = "rejected";
    })
    .addCase(usersDelete.pending, (state) => {
      state.deleteStatus = "pending";
    })
    .addCase(usersDelete.fulfilled, (state, action) => {
      const newList = state.list.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newList;
      state.deleteStatus = "success";
    })
    .addCase(usersDelete.rejected, (state) => {
      state.deleteStatus = "rejected";
    })
    .addCase(userFetchById.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userFetchById.fulfilled, (state, action) => {
      state.singleUser = action.payload;
      state.status = "success";
    })
    .addCase(userFetchById.rejected, (state) => {
      state.status = "rejected";
    })
  },
});
/* [usersAllFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersAllFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersAllFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [usersDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [usersDelete.fulfilled]: (state, action) => {
      const newList = state.list.filter(
        (user) => user._id === action.payload._id
      );
      state.list = newList;
      state.deleteStatus = "success";
      /*toast.error("User deleted!", {
        position: "bottom-left",
      });
    },
    [usersDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [userFetchById.pending]: (state, action) => {
      state.status = "pending";
    },
    [userFetchById.fulfilled]: (state, action) => {
      state.singleUser = action.payload;
      state.status = "success";
    },
    [userFetchById.rejected]: (state, action) => {
      state.status = "rejected";
    }, */