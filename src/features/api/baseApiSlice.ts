import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1" }),
	tagTypes: ["Books", "ContentOwners", "Publishers"],
	endpoints: () => ({}),
});

export default apiSlice;
