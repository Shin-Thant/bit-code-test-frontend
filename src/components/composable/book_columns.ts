import { Book } from "@/types/data";
import { ColumnDef } from "@tanstack/react-table";

export const BookColumns: ColumnDef<Book>[] = [
	{
		accessorKey: "book_uniq_idx",
		header: "Idx",
	},
	{
		accessorKey: "bookname",
		header: "Book Name",
	},
	{
		accessorKey: "content_owner.name",
		header: "Content Owner",
	},
	{
		accessorKey: "publisher.name",
		header: "Publisher",
	},
	{
		accessorKey: "created_timetick",
		cell: ({ row }) => {
			const createdDateString = row.getValue("created_timetick");
			if (!createdDateString || typeof createdDateString !== "string") {
				return "-";
			}
			const createdDate = new Date(createdDateString);
			return createdDate.toUTCString();
		},
		header: "Created Date",
	},
];
