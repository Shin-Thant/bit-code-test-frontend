import { Book } from "@/types/Book";
import apiSlice from "../api/baseApiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBooks: builder.query<Book[], void>({
			query: () => "/books",
			providesTags: (result) => {
				if (!result?.length) {
					return [{ type: "Books", id: "LIST" }];
				}
				return [
					...result.map((book) => ({
						type: "Books" as const,
						id: book.idx,
					})),
					{ type: "Books", id: "LIST" },
				];
			},
		}),
	}),
});

export const { useGetBooksQuery } = bookApiSlice;
