import { useState } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import CardsComponent from "./components/CardsComponent";

export default function App() {
  const [query, setQuery] = useState('typescript');

  return (
    <div className="h-screen font-inter bg-indigo-50 text-slate-900">
      <NavBar onSearch={setQuery} />
      <main className="mx-auto max-w-6xl p-6">
        <h2 className="mb-2 md:ps-5 font-mono text-">Results for: <span className="italic">{query}</span></h2>
        <CardsComponent query={query} />
      </main>
    </div>
  );
}
