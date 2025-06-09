import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from './api';
export const ProductApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}`}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => `products`,
        }),
    }),
});

export const { useGetAllProductsQuery } = ProductApi;