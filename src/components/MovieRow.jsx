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
  const width = rowRef.current?.clientWidth || 0
  rowRef.current?.scrollBy({ left: -width, behavior: "smooth" })
}

const scrollRight = () => {
  const width = rowRef.current?.clientWidth || 0
  rowRef.current?.scrollBy({ left: width, behavior: "smooth" })
}
return (
  <div className="px-4 sm:px-6 md:px-10 mt-8 sm:mt-12">

    {/* Title + Arrows */}
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
        {title}
      </h2>

      {/* Hide arrows on small screens */}
      <div className="hidden sm:flex space-x-2">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
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
            className="h-4 w-4 sm:h-5 sm:w-5"
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
      className="flex gap-3 sm:gap-4 md:gap-6 
                 overflow-x-auto 
                 scrollbar-hide 
                 scroll-smooth"
    >
      {loading
        ? Array(8).fill().map((_, i) => <SkeletonCard key={i} />)
        : movies.map(movie => (
            <div
              key={movie.id}
              className="min-w-[140px] 
                         sm:min-w-[180px] 
                         md:min-w-[220px]"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
    </div>

  </div>
)
}

export default MovieRow