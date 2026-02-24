import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from '../api/tmdb'
import CastCard from '../components/CastCard'
import CastSkeleton from '../components/CastSkeleton'
import MovieCard from '../components/MovieCard'
import {motion} from 'framer-motion'
import MovieDetailsSkeleton from '../components/MovieDetailsSkeleton'

const getRatingColor = rating => {
  if (rating >= 7) return 'text-green-500'
  if (rating >= 5) return 'text-yellow-400'
  return 'text-red-500'
}

const MovieDetails = () => {
  const {id} = useParams()

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [castLoading, setCastLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({
  top: 0,
  behavior: 'smooth',
})
    const loadData = async () => {
      try {
        setLoading(true)

        const movieRes = await fetchMovieDetails(id)
        const castRes = await fetchMovieCredits(id)
        const similarRes = await fetchSimilarMovies(id)

        setMovie(movieRes.data)
        setCast(castRes.data.cast.slice(0, 15))
        setSimilar(similarRes.data.results.slice(0, 12))

        setLoading(false)
        setCastLoading(false)
      } catch (err) {
        setError(true)
        setLoading(false)
        setCastLoading(false)
      }
    }

    loadData()
  }, [id])

  if (loading) return <MovieDetailsSkeleton />
  if (error)
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Something went wrong. Please try again.
      </div>
    )

  if (!movie) return null

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : ''

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
   <div className="min-h-screen bg-gradient-to-b from-neutral-200 to-neutral-800 dark:from-neutral-900 dark:to-black text-black dark:text-white transition-colors duration-300">

      {/* 🎬 Hero Section */}
      {/* 🔙 Back Button */}
<div className="absolute top-3 left-6 z-50 ">
  <button
    onClick={() => navigate(-1)}
    className="bg-black/600 hover:bg-black text-white px-4 py-2 rounded-full backdrop-blur-md transition"
  >
    ← Back
  </button>
</div>
      <div
        className="relative h-[80vh] bg-cover bg-center flex items-end"
        style={{backgroundImage: `url(${backdropUrl})`}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative p-10 flex flex-col md:flex-row gap-10">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-72 rounded-2xl shadow-2xl"
          />

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>

            <p
              className={`mt-4 text-lg text-yellow-400 font-semibold ${getRatingColor(
                movie.vote_average
              )}`}
            >
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>

            <p className="mt-2 text-gray-400">
              📅 {movie.release_date}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres?.map(genre => (
                <span
                  key={genre.id}
                  className="bg-gray-800  text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-gray-300">
              {movie.overview}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 🎭 Cast Section */}
      <div className="px-10 mt-16">
        <h2 className="text-2xl font-bold mb-6">
          🎭 Cast
        </h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {castLoading
            ? Array(8)
                .fill()
                .map((_, i) => <CastSkeleton key={i} />)
            : cast.map(actor => (
                <CastCard key={actor.id} cast={actor} />
              ))}
        </div>
      </div>

      {/* 🔥 Similar Movies */}
      <div className="px-10 mt-16 pb-20">
        <h2 className="text-2xl font-bold mb-6">
          🔥 Similar Movies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {similar.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails