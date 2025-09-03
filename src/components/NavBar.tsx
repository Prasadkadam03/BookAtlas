import { useState } from "react";

export default function NavBar({ onSearch }: { onSearch: (q: string) => void }) {
    const [text, setText] = useState("");

    return (
        <nav className="flex  items-center justify-between bg-indigo-500 p-4 px-12 m-4 rounded-full">
            <h1 className="ps-12 font-marker text-4xl font-bold text-white">
                <span className="text-6xl text-amber-400">B</span>OOK<span className="text-6xl text-amber-400">A</span>TLAS
            </h1>


            <form
                onSubmit={(e) => { e.preventDefault(); onSearch(text.trim()); }}
                className="flex items-center"
                role="search"
                aria-label="Book search"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-2 bg-stone-50 text-stone-900 rounded-full w-64 placeholder:text-stone-400"
                    placeholder="Search books…"
                />
                <button
                    type="submit"
                    className="bg-sky-400 hover:bg-sky-500 text-white ms-2 p-2 px-5 rounded-full cursor-pointer"
                >
                    Search
                </button>
            </form>
        </nav>
    );
}
