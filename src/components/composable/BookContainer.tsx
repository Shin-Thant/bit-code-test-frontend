import { useGetBooksQuery } from "@/features/book/bookApiSlice";
import React from "react";
import { BookTable } from "./BookTable";

const BookContainer = () => {
	const { isFetching, data } = useGetBooksQuery();

	return (
		<>
			{isFetching ? (
				"fetching..."
			) : !data ? (
				"no data"
			) : (
				<BookTable data={data} />
			)}
		</>
	);
};

export default BookContainer;
