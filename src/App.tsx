import { useState } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import CardsComponent from "./components/CardsComponent";

export default function App() {
  const [query, setQuery] = useState('typescript');

  return (
    <div className="h-auto font-inter bg-indigo-0 text-slate-900">
      <div className="sticky top-5 mt-5">
        <NavBar onSearch={setQuery} />
      </div>
      <main className="mx-auto max-w-6xl p-6">
        <h2 className="mb-2 md:ps-5 font-mono text-">Results for: <span className="italic">{query}</span></h2>
        <CardsComponent query={query} />
      </main>
    </div>
  );
}
