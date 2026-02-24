import React, { useEffect, useState } from "react"
import { fetchTrending } from "../api/tmdb"
import { motion, AnimatePresence } from "framer-motion"

const HeroSection = ({fetchFunction}) => {
  const [movies, setMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)


   useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchFunction()
        setMovies(res.data.results.slice(0, 5))
        
      } catch (err) {
        console.error(err)
       
      }
    }

    loadData()
  }, [fetchFunction])

  // Auto slide every 5 sec
  useEffect(() => {
    if (movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % movies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [movies])

  if (movies.length === 0)
    return <div className="h-screen bg-black animate-pulse" />

  const movie = movies[currentIndex]

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : ""

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center z-10 container mx-auto px-6">
        <div className="max-w-3xl text-white">

          <span className="bg-red-600 text-xs px-2 py-1 rounded">
            TRENDING
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            {movie.title || movie.name}
          </h1>

          <p className="text-neutral-300 mt-4 line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition">
              ▶ Watch Now
            </button>
            <button className="bg-neutral-800/80 px-6 py-3 rounded-lg border border-neutral-600">
              + Watchlist
            </button>
          </div>

        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 1 + movies.length) % movies.length
          )
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl z-20"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={() =>
          setCurrentIndex((currentIndex + 1) % movies.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl z-20"
      >
        ❯
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-red-600"
                : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

    </div>
  )
}

export default HeroSection