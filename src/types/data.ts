export interface Publisher {
	idx: number;
	name: string;
}
export interface ContentOwner {
	idx: number;
	name: string;
}

export interface Book {
	idx: number;
	book_uniq_idx: string;
	bookname: string;
	price: number;
	cover_photo: string;
	content_owner: ContentOwner;
	publisher: Publisher;
	created_timetick: string;
}
