export interface Book {
	idx: number;
	book_uniq_idx: number;
	bookname: string;
	price: number;
	cover_photo: string;
	content_writer: {
		idx: number;
		name: string;
	};
	publisher: {
		idx: number;
		name: string;
	};
	created_timetick: string;
}
