import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

const CreateBookDialog = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>
					<span className="mr-2">Create</span>
					<PlusIcon className="w-5 h-5 text-white" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default CreateBookDialog;
