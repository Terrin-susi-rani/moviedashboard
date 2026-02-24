import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        searchMovies(query)
      } else {
        setResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const searchMovies = async (searchTerm) => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      )
      const data = await response.json()
      setResults(data.results || [])
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleNavigate = (id) => {
    setQuery("")
    setResults([])
    navigate(`/movie/${id}`)
  }

  const handleLogout = () => {
  Cookies.remove("jwt_token")  
  navigate("/login")
}

  return (
    <header className="relative w-full z-[100] bg-black/80 backdrop-blur-md">
  <div className="container mx-auto px-4 py-4">

    <div className="flex items-center justify-between">

      {/* LEFT SIDE - Logo */}
      <Link to="/" className="text-red-500 font-bold text-3xl">
        Movie<span className="text-white">Max</span>
      </Link>

      {/* RIGHT SIDE - Nav + Logout + Search */}
      <div className="flex items-center space-x-6">

        <Link
          to="/"
          className="text-white hover:text-red-400 font-medium"
        >
          Home
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm transition"
        >
          Logout
        </button>

        {/* Search */}
        <div className="relative w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-full
            focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />

          {loading && (
            <div className="absolute right-4 top-2.5 text-neutral-400 text-xs">
              ...
            </div>
          )}

          {query && (
            <div className="absolute left-0 mt-2 w-full bg-neutral-800 rounded-lg shadow-2xl border border-neutral-700 z-[9999]">
              {results.length > 0 ? (
                <ul className="divide-y divide-neutral-700 max-h-80 overflow-y-auto">
                  {results.slice(0, 6).map((movie) => (
                    <li key={movie.id} className="hover:bg-neutral-700 transition-colors">
                      <button
                        onClick={() => handleNavigate(movie.id)}
                        className="flex items-center p-3 w-full text-left"
                      >
                        <div className="w-10 h-14 bg-neutral-700 rounded overflow-hidden shrink-0">
                          {movie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white truncate">
                            {movie.title}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {movie.release_date || "Unknown Date"}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                !loading && (
                  <div className="p-4 text-center text-neutral-400 text-sm">
                    No Movies found matching "{query}"
                  </div>
                )
              )}
            </div>
          )}
        </div>

      </div>
    </div>

  </div>
</header>
  )
}

export default Navbar