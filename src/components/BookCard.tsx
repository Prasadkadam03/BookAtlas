import type { BookDoc } from "./CardsComponent";

export default function BookCard({ book }: { book: BookDoc }) {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null;

    return (
        <article>
            <img
                alt={book.title}
                src={coverUrl || "https://via.placeholder.com/150"}
            />
            <h3 >{book.title}</h3>
            <p>{book.author_name?.join(", ") || "Unknown author"}</p>
            <p>First published: {book.first_publish_year}</p>
        </article>
    );
}