import type { BookDoc } from "./CardsComponent";

export default function BookCard({ book }: { book: BookDoc }) {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null;

    return (
        <article className="flex flex-col hover:bg-indigo-50 hover:shadow-xl shadow rounded-2xl p-3 transition-transform duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-2 flex items-center justify-center h-80 w-full shadow-md shadow-gray-400">
                <img
                    alt={book.title}
                    src={coverUrl || "src/assets/No-Image.png"}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>


            <div className="pt-3 px-1">
                <h3 className="text-xl font-semibold truncate">{book.title}</h3>
                <p className="text-sm text-gray-700">{book.author_name?.join(", ") || "Unknown author"}</p>
                <p className="text-xs text-gray-500">{book.first_publish_year}</p>
            </div>
            <button className="mt-2 px-3 py-1 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition cursor-pointer">
                View Details
            </button>

        </article>
    );
}