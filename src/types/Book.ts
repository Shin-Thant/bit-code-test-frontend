export interface Book {
	idx: number;
	book_uniq_idx: string;
	bookname: string;
	price: number;
	cover_photo: string;
	content_owner: {
		idx: number;
		name: string;
	};
	publisher: {
		idx: number;
		name: string;
	};
	created_timetick: string;
}
