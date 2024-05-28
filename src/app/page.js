"use client";
import { useState, useRef } from "react";
import { Loader2, CornerDownLeft } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(false);
  const ref = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  const search = async () => {
    setPending(true);
    try {
      // Chamada para a rota de pesquisa
      // const response = await fetch(`/api?query=${searchQuery}`);
      // const data = await response.json();
      // if(response.status === 200){
         window.location.href = `/search?query=${searchQuery}`
      // }
      // Adicione aqui a lógica para lidar com os resultados da pesquisa
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex w-full bg-white">
      <div className="w-full bg-white">
        <header className="flex justify-center items-center py-4 px-8 bg-white shadow-md w-full">
          <h1 className="text-xl font-semibold text-gray-800">Fuçador</h1>
        </header>

        <div className="flex flex-col items-center justify-center h-screen">
          <img src="lupa.jpg" alt="Center Image" className="w-32 mb-8" />

          <form
            onSubmit={handleSubmit}
            className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-1/3"
          >
            <input
              type="text"
              name="prompt"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Fuçar na wiki"
              className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
            />
            <input
              aria-hidden
              type="text"
              name="token"
              value={""}
              className="hidden"
              readOnly
            />
            <button
              ref={ref}
              type="submit"
              disabled={pending}
              aria-disabled={pending}
              className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
            >
              {pending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CornerDownLeft size={16} className="-ml-px" />
              )}
            </button>
          </form>

          <div className="mt-4 space-x-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-400 focus:outline-none focus:bg-black"
            >
              Pesquisar
            </button>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Estou com sorte
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
