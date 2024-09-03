import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quoteApi = createApi({
  reducerPath: "quoteApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/" }),
  tagTypes: ["Quotes"],
  endpoints: (build) => ({
    getQuotes: build.query({
      query: () => "quotes",
      providesTags: ["Quotes"],
    }),
    createQuote: build.mutation({
      query: (quote) => ({
        url: "quotes",
        method: "POST",
        body: quote,
      }),
      invalidatesTags: ["Quotes"],
    }),
    toggleFake: build.mutation({
      query: ({ id, quote }) => ({
        url: `quotes/${id}`,
        method: "PUT",
        body: quote,
      }),
      invalidatesTags: ["Quotes"],
    }),
    deleteQuote: build.mutation({
      query: (id) => ({
        url: `quotes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quotes"],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useCreateQuoteMutation,
  useToggleFakeMutation,
  useDeleteQuoteMutation,
} = quoteApi;
