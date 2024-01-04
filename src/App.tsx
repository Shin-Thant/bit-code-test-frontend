import { BookTable } from "./components/composable/BookTable";

("use client");

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];

function App() {
	return (
		<div>
			<BookTable
				columns={columns}
				data={[
					{
						id: "728ed52f",
						amount: 100,
						status: "pending",
						email: "m@example.com",
					},
				]}
			/>
		</div>
	);
}

export default App;
