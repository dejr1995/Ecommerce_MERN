import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice, productsAllFetch } from "./ProductSlice";
import { CartSlice, clearCart, getTotals } from "./CartSlice";
import { AuthSlice, loadUser } from "./AuthSlice";
import { ProductApi } from "./ProductApi";
import { OrdersSlice, ordersAllFetch } from "./OrdersSlice";
import { UsersSlice, usersAllFetch } from "./UsersSlice";
import { BannerSlice } from "./BannerSlice";


export const store = configureStore({
    reducer:{
        products: ProductSlice.reducer,
        cart: CartSlice.reducer,
        auth: AuthSlice.reducer,
        orders: OrdersSlice.reducer,
        users: UsersSlice.reducer,
        banners: BannerSlice.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(ProductApi.middleware),
});

store.dispatch(productsAllFetch());
store.dispatch(usersAllFetch());
store.dispatch(ordersAllFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

