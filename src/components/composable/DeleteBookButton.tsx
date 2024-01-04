import { useDeleteBookMutation } from "@/features/book/bookApiSlice";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface Props {
	idx: number;
}

const DeleteBookButton = ({ idx }: Props) => {
	const { toast } = useToast();
	const [deleteBook, { isLoading }] = useDeleteBookMutation();

	const onDelete = async () => {
		if (isLoading) return;
		await deleteBook({ idx });
		toast({ title: "Book deleted successfully!" });
	};

	return (
		<Button onClick={onDelete} variant={"destructive"}>
			Delete
		</Button>
	);
};

export default DeleteBookButton;
