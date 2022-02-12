import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jonathan-potter-rest-api.herokuapp.com",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({ query: () => "api/posts" }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
