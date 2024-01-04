import { Book, ContentOwner, Publisher } from "@/types/data";
import apiSlice from "../api/baseApiSlice";

interface CreateBookArg {
	name: string;
	price: number;
	publisher_id: number;
	content_owner_id: number;
}

export const bookApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getContentOwners: builder.query<ContentOwner[], void>({
			query: () => "/content-owners",
			providesTags: (result) => {
				if (!result?.length) {
					return [{ type: "ContentOwners", id: "LIST" }];
				}
				return [
					...result.map((owner) => ({
						type: "ContentOwners" as const,
						id: owner.idx,
					})),
					{ type: "ContentOwners", id: "LIST" },
				];
			},
		}),

		getPublishers: builder.query<Publisher[], void>({
			query: () => "/publishers",
			providesTags: (result) => {
				if (!result?.length) {
					return [{ type: "Publishers", id: "LIST" }];
				}
				return [
					...result.map((owner) => ({
						type: "Publishers" as const,
						id: owner.idx,
					})),
					{ type: "Publishers", id: "LIST" },
				];
			},
		}),

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

		createBook: builder.mutation<Book, CreateBookArg>({
			query: (arg) => ({
				url: "/books",
				method: "POST",
				body: arg,
			}),
			invalidatesTags: [{ type: "Books", id: "LIST" }],
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetContentOwnersQuery,
	useGetPublishersQuery,
	useCreateBookMutation,
} = bookApiSlice;
