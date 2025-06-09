import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";
import i18next from "i18next";

export const productsAllFetch = createAsyncThunk(
  "products/productsAllFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );
      toast.success(i18next.t("productcreated"));
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );
      toast.info(i18next.t("productedited"));
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productsDelete = createAsyncThunk(
  "products/productsDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );
      toast.success(i18next.t("productdeleted"));
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(productsAllFetch.pending, (state) => {
      state.status = "pending";
    })
    .addCase(productsAllFetch.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    })
    .addCase(productsAllFetch.rejected, (state) => {
      state.status = "rejected";
    })
    .addCase(productsCreate.pending, (state) => {
      state.createStatus = "pending";
    })
    .addCase(productsCreate.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Product Created!");
    })
    .addCase(productsCreate.rejected, (state) => {
      state.createStatus = "rejected";
    })
    .addCase(productsEdit.pending, (state) => {
      state.editStatus = "pending";
    })
    .addCase(productsEdit.fulfilled, (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "success";
      toast.info("Product Edited!");
    })
    .addCase(productsEdit.rejected, (state) => {
      state.editStatus = "rejected";
    })
    .addCase(productsDelete.pending, (state) => {
      state.deleteStatus = "pending";
    })
    .addCase(productsDelete.fulfilled, (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      toast.success("Product Deleted!");
    })
    .addCase(productsDelete.rejected, (state) => {
      state.deleteStatus = "rejected";
    })
  },
});

/* [productsAllFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsAllFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsAllFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      //toast.success("Product Created!");
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "success";
      //toast.info("Product Edited!");
    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
    [productsDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productsDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id === action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      //toast.success("Product Deleted!");
    },
    [productsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },*/
