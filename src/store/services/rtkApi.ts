import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICartResponse } from "../types/ICart";
import { IApi, IPizza } from "../types/Api";
import { IUser } from "../types/IUser";
import { RootState } from "../configureStore";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).entities.auth.token;
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    // Foods service
    getFoods: builder.query<IApi[], void>({
      query: () => "/foods",
    }),
    getFood: builder.query<IPizza, any>({
      query: (id) => "/foods/" + id,
    }),
    updateFood: builder.mutation({
      query: (food) => {
        const { _id, ...body } = food;

        return {
          url: "/foods/" + _id,
          method: "PUT",
          body,
        };
      },
    }),

    // Category service
    getCategory: builder.query<any, any>({
      query: (id) => "/category/" + id,
    }),

    // Register user service
    registerUser: builder.mutation<{ token: string }, IUser>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      }),
      transformResponse: async (_, meta) => {
        if (meta && meta.response) {
          const token = meta.response.headers.get("x-auth-token");
          if (token) {
            return { token };
          }
        }
        throw new Error("Token not found in the response");
      },
    }),

    // Login user service
    loginUser: builder.mutation<string, IUser>({
      query: (user) => ({
        url: "/auth",
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
        },
        responseHandler: async (response) => {
          if (response.status === 200) {
            return response.text();
          }
          return response.json();
        },
      }),
    }),
    // Cart Service
    getCart: builder.query<ICartResponse, void>({
      query: () => "/carts",
      providesTags: ["cart"],
    }),

    addToCart: builder.mutation<any, { foodId: string; quantity: number }>({
      query: ({ foodId, quantity }) => ({
        url: "/carts",
        method: "POST",
        body: { foodId, quantity },
      }),
      invalidatesTags: ["cart"],
    }),

    deleteCartItem: builder.mutation<any, string>({
      query: (foodId) => ({
        url: "/carts/" + foodId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useUpdateFoodMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = api;

export default api;
