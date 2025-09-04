import type { BookDoc } from "./CardsComponent";

export default function BookCard({ book }: { book: BookDoc }) {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`  // Use large size cover if available
        : null;

    function moreDetails() {
        window.open(`https://openlibrary.org/${book.key}`, "_blank");    // Open book details in a new tab
    }

    return (
        <article className="flex flex-col hover:bg-indigo-50 hover:shadow-xl shadow rounded-2xl p-3 transition-transform duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-2 flex items-center justify-center h-80 w-full shadow-md shadow-gray-400">
                <img
                    alt={book.title}
                    src={coverUrl || "src/assets/No-Image.png"}         // Fallback image if no cover available
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>


            <div className="pt-3 px-1">
                <h3 className="text-xl font-semibold truncate">{book.title}</h3>
                <p className="text-sm text-gray-700">{book.author_name?.join(", ") || "Unknown author"}</p>
                <div className="flex gap-3">
                    <p className="text-xs text-gray-500">{book.first_publish_year}</p>
                    <p className="text-xs text-gray-500">{book.ebook_access}</p>
                </div>
            </div>
            <button className="mt-2 px-3 py-2 text-sm bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition cursor-pointer" onClick={() => moreDetails()}>
                View Details
            </button>

        </article>
    );
}