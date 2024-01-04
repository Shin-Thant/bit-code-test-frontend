import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {
	useCreateBookMutation,
	useGetContentOwnersQuery,
	useGetPublishersQuery,
} from "@/features/book/bookApiSlice";
import {
	CreateBookInput,
	CreateBookSchema,
} from "@/validation-schema/book-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

const CreateBookDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>();

	const { isFetching: isOwnerFetching, data: owners } =
		useGetContentOwnersQuery();
	const { isFetching: isPublisherFetching, data: publishers } =
		useGetPublishersQuery();
	const [createBook, { isLoading: isCreating }] = useCreateBookMutation();

	const form = useForm<CreateBookInput>({
		resolver: zodResolver(CreateBookSchema),
	});

	const { toast } = useToast();

	const onSubmit: SubmitHandler<CreateBookInput> = async (data) => {
		if (isCreating || !form.formState.isValid) return;

		try {
			await createBook({
				name: data.name,
				price: data.price,
				content_owner_id: parseInt(data.content_writer_id),
				publisher_id: parseInt(data.publisher_id),
			});
			form.reset();
			toast({ title: "Book created successfully!", duration: 30000 });
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Something went wrong!",
				duration: 30000,
			});
		}
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			form.reset();
		}

		return () => {
			isMounted = false;
		};
	}, [isDialogOpen, form]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger>
				<Button>
					<span className="mr-2">Create</span>
					<PlusIcon className="w-5 h-5 text-white" />
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full sm:w-2/3">
				<DialogHeader>
					<DialogTitle>Create New Book</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-3.5 py-4"
					>
						<div className="grid items-center">
							<Label htmlFor="name" className="mb-2 text-sm">
								Name
							</Label>
							<Input
								id="name"
								required={true}
								{...form.register("name")}
							/>
						</div>

						<div className="grid items-center">
							<Label htmlFor="price" className="mb-2 text-sm">
								Price
							</Label>
							<Input
								type="number"
								id="price"
								required={true}
								{...form.register("price")}
							/>
						</div>

						<FormField
							control={form.control}
							name="publisher_id"
							render={({ field }) =>
								isOwnerFetching ? (
									<p>"fetching publisher"</p>
								) : (
									<FormItem>
										<FormLabel>Publisher</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue=""
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={
															"Publisher"
														}
													/>
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{!publishers ? (
													<SelectItem value="">
														none
													</SelectItem>
												) : (
													publishers.map((item) => (
														<SelectItem
															key={item.idx.toString()}
															value={item.idx.toString()}
														>
															{item.name}
														</SelectItem>
													))
												)}
											</SelectContent>
										</Select>
									</FormItem>
								)
							}
						/>

						<FormField
							control={form.control}
							name="content_writer_id"
							render={({ field }) =>
								isOwnerFetching ? (
									<p>"fetching content owner"</p>
								) : (
									<FormItem>
										<FormLabel>Content Owner</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue=""
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={
															"Content Owner"
														}
													/>
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{!owners ? (
													<SelectItem value="">
														none
													</SelectItem>
												) : (
													owners.map((item) => (
														<SelectItem
															key={item.idx.toString()}
															value={item.idx.toString()}
														>
															{item.name}
														</SelectItem>
													))
												)}
											</SelectContent>
										</Select>
									</FormItem>
								)
							}
						/>

						<Button
							type="submit"
							disabled={
								!form.formState.isValid ||
								isOwnerFetching ||
								isPublisherFetching ||
								form.formState.isSubmitting
							}
						>
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateBookDialog;
