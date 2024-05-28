"use client";
import { useEffect, useState } from "react";
import { CornerDownLeft, Loader2 } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api?query=${searchQuery}`);
      const data = await response.json();
      // redirect to search page
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Preencher o state result com um mock de 11 resultados
    const mockResults = Array.from({ length: 11 }, (_, index) => ({
      title: `Resultado ${index + 1}`,
      description: "Descrição do resultado",
      image: "lupa.jpg",
      url: "https://www.google.com",
    }));
    setResults(mockResults);
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleClickPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="flex w-full bg-white">
      <div className="w-full bg-white">
        <header className="flex justify-center items-center py-4 px-8 bg-white shadow-md w-full">
          <h1 className="text-xl font-semibold text-gray-800">Fuçador</h1>
        </header>

        <div className="flex flex-col h-screen">
          <div className="flex items-center w-full p-8">
            <img src="lupa.jpg" alt="Center Image" className="w-20 mr-12" />

            <form
              onSubmit={handleSearch}
              className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-1/3"
            >
              <input
                type="text"
                name="prompt"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Fuçar na wiki"
                className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
                className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
              >
                {loading ? <Loader2 size={24} /> : <CornerDownLeft size={24} />}
              </button>
            </form>
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-lg font-semibold text-gray-800 m-5">
              Resultados da pesquisa
            </h2>
            <ul className="flex flex-col items-center justify-center w-full">
              {paginatedResults.map((result, index) => (
                <li key={index} className="flex flex-row items-center justify-start w-full">
                  <img
                    src={result.image}
                    alt="Result Image"
                    className="w-16 h-16 m-5"
                  />
                  <div className="flex flex-col items-start justify-center w-full">
                    <a href={result.url} className="text-lg font-semibold text-gray-800">
                      {result.title}
                    </a>
                    <a href={result.url} className="text-lg font-semibold text-gray-800">
                      {result.url}
                    </a>
                    <p className="text-sm font-normal text-gray-600">
                      {result.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleClickPrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-black rounded-lg disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={handleClickNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-black rounded-lg disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
            <div className="text-center mt-2">
              Página {currentPage} de {totalPages}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
