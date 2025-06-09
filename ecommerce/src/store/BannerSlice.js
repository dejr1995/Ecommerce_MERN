import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";
import i18next from "i18next";

export const bannersAllFetch = createAsyncThunk(
  "banners/bannersAllFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/banners`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bannersCreate = createAsyncThunk(
  "banners/bannersCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/banners`,
        values,
        setHeaders()
      );
      toast.success(i18next.t("advertisingcreated"));
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const bannersDelete = createAsyncThunk(
  "banners/bannersDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/banners/${id}`,
        setHeaders()
      );
      toast.success(i18next.t("advertisingdeleted"));
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const BannerSlice = createSlice({
  name: "banners",
  initialState: {
    items: [],
    status: null,
    createStatus: null,
    deleteStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(bannersAllFetch.pending, (state) => {
      state.status = "pending";
    })
    .addCase(bannersAllFetch.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    })
    .addCase(bannersAllFetch.rejected, (state) => {
      state.status = "rejected";
    })
    .addCase(bannersCreate.pending, (state) => {
      state.createStatus = "pending";
    })
    .addCase(bannersCreate.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
    })
    .addCase(bannersCreate.rejected, (state) => {
      state.createStatus = "rejected";
    })
    .addCase(bannersDelete.pending, (state) => {
      state.deleteStatus = "pending";
    })
    .addCase(bannersDelete.fulfilled, (state, action) => {
      const newList = state.items.filter(
        (item) => item._id === action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
    })
    .addCase(bannersDelete.rejected, (state) => {
      state.deleteStatus = "rejected";
    })
  },
});

/*[bannersAllFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [bannersAllFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [bannersAllFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [bannersCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [bannersCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      //toast.success("Advertising Created!");
    },
    [bannersCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [bannersDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [bannersDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id === action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      //toast.success("Advertising Deleted!");
    },
    [bannersDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },*/
