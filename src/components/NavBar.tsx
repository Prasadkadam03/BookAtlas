import { useState } from "react";

export default function NavBar({ onSearch }: { onSearch: (q: string) => void }) {
    const [text, setText] = useState("");

    return (
        <nav className="flex flex-col md:flex-row items-center justify-between bg-indigo-400 shadow-2xl border border-amber-100 p-4 md:px-12 mb-4 mx-2 md:mx-4 rounded-full gap-4">
            <h1 className="font-marker text-3xl md:text-4xl font-bold text-white   hover:text-amber-500 text-center md:text-left ps-0 md:ps-12">
                <span className="text-5xl md:text-6xl text-amber-400">B</span>OOK
                <span className="text-5xl md:text-6xl text-amber-400">A</span>TLAS
            </h1>

            <form
                onSubmit={(e) => { e.preventDefault(); onSearch(text.trim()); }}
                className="flex items-center w-full md:w-min px-6 md:p-0 justify-center"
                role="search"
                aria-label="Book search"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-2 bg-indigo-50 text-black border rounded-full w-full md:w-64 placeholder:text-stone-700"
                    placeholder="  Search books…🔍"
                />
                <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white ms-2 p-2 px-5 rounded-full cursor-pointer"
                >
                    Search
                </button>
            </form>
        </nav>
    );
}
