import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export interface BookDoc {
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  ebook_access?: string;
  key: string;
}

interface OpenLibrarySearchResponse {
  docs: BookDoc[];
}

export default function CardsComponent({ query }: { query: string }) {
  const [books, setBooks] = useState<BookDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const controller = new AbortController();
    const id = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: OpenLibrarySearchResponse = await res.json();

        setBooks(Array.isArray(data.docs) ? data.docs : []);

      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err?.message ?? "Something went wrong");
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [query]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div role="alert">Error: {error}</div>;
  if (books.length === 0) return <div>No books found</div>;

  return (
    <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {books.slice(0, 100).map((b) => {
        b.cover_i
          ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
          : undefined;

        return <BookCard key={b.key} book={b} />;
      })}
    </div>
  );
}
