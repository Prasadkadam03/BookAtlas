import { useState } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import CardsComponent from "./components/CardsComponent";

export default function App() {
  const [query, setQuery] = useState("typescript");

  return (
    <div className="font-inter  text-slate-900 pt-1 min-h-screen">
      <div className="sticky top-5 z-10 mt-5">
        <NavBar onSearch={setQuery} />     {/* NavBar component with onSearch prop to update query state */}
      </div>

      <main className="mx-auto max-w-6xl p-6">
        <h2
          className="mb-3 md:ps-5 font-mono text-sm md:text-base text-slate-700"
          aria-live="polite"
        >
          Results for: <span className="italic">{query}</span>
        </h2>

        <CardsComponent query={query} />  {/* CardsComponent to display books based on the query */}
      </main>
    </div>
  );
}
