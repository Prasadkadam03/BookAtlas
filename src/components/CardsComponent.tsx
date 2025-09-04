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

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl p-3 shadow animate-pulse bg-white">
      <div className="rounded-2xl h-80 w-full bg-gradient-to-br from-amber-200 to-amber-300" />
      <div className="pt-3 space-y-2">
        <div className="h-5 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-200 rounded w-1/3" />
      </div>
      <div className="mt-3 h-8 bg-slate-200 rounded-full" />
    </div>
  );
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

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="p-6 rounded-xl bg-red-50 text-red-700 border border-red-200">
        <p className="font-semibold">Something went wrong</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl bg-white shadow">
        <p className="font-medium">No books found.</p>
        <p className="text-sm text-slate-600">Try a different keyword or check your spelling.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.slice(0, 100).map((b) => (
        <BookCard key={b.key} book={b} />
      ))}
    </div>
  );
}
