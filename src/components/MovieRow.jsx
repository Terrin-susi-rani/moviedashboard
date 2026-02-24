import { useEffect, useState, useRef } from "react"
import MovieCard from "./MovieCard"
import SkeletonCard from "./SkeletonCard"

const MovieRow = ({ title, fetchFunction }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const rowRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchFunction()
        setMovies(res?.data?.results || [])
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    loadData()
  }, [fetchFunction])

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -600, behavior: "smooth" })
  }

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 600, behavior: "smooth" })
  }

 return (
  <div className="px-10 mt-12">

    {/* Title + Arrows */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="flex space-x-2">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={scrollRight}
          className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Movie Row */}
    <div
      ref={rowRef}
      className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth"
    >
      {loading
        ? Array(8).fill().map((_, i) => <SkeletonCard key={i} />)
        : movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
    </div>

  </div>
)
}

export default MovieRow