import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

export const ordersAllFetch = createAsyncThunk(
  "orders/ordersAllFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/orders`, setHeaders());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ordersEdit = createAsyncThunk(
  "orders/ordersEdit",
  async (values, { getState }) => {
    const state = getState();

    let currentOrder = state.orders.listorders.filter(
      (order) => order._id === values.id
    );

    const newOrder = {
      ...currentOrder[0],
      delivery_status: values.delivery_status,
    };

    try {
      const response = await axios.put(
        `${url}/orders/${values.id}`,
        newOrder,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);


export const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    listorders: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(ordersAllFetch.pending, (state) => {
      state.status = "pending";
    })
    .addCase(ordersAllFetch.fulfilled, (state, action) => {
      state.listorders = action.payload;
      state.status = "success";
    })
    .addCase(ordersAllFetch.rejected, (state) => {
      state.status = "rejected";
    })
    .addCase(ordersEdit.pending, (state) => {
      state.status = "pending";
    })
    .addCase(ordersEdit.fulfilled, (state, action) => {
      const updatedOrders = state.listorders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.listorders = updatedOrders;
      state.status = "success";
    })
    .addCase(ordersEdit.rejected, (state) => {
      state.status = "rejected";
    })
  },
});

/* [ordersAllFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersAllFetch.fulfilled]: (state, action) => {
      state.listorders = action.payload;
      state.status = "success";
    },
    [ordersAllFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [ordersEdit.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersEdit.fulfilled]: (state, action) => {
      const updatedOrders = state.listorders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.listorders = updatedOrders;
      state.status = "success";
    },
    [ordersEdit.rejected]: (state, action) => {
      state.status = "rejected";
    }, */
