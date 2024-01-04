import { z } from "zod";

export const CreateBookSchema = z.object({
	name: z.string().trim(),
	price: z
		.string()
		.refine((val) => {
			return !isNaN(parseInt(val));
		})
		.transform((val) => parseInt(val)),
	publisher_id: z.string(),
	content_writer_id: z.string(),
});
export type CreateBookInput = z.infer<typeof CreateBookSchema>;
