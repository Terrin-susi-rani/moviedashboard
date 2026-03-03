import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {fetchActorDetails, fetchActorMovies} from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import { useNavigate } from "react-router-dom"

const ActorDetails = () => {
  const {id} = useParams()
  const [actor, setActor] = useState(null)
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      const actorRes = await fetchActorDetails(id)
      const movieRes = await fetchActorMovies(id)

      setActor(actorRes.data)
      setMovies(movieRes.data.cast.slice(0, 12))
    }

    loadData()
  }, [id])

  if (!actor) return null

  const profileUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
  <div className="min-h-screen 
                  bg-gradient-to-b 
                  from-neutral-200 to-neutral-800 
                  dark:from-neutral-900 dark:to-black 
                  text-black dark:text-white 
                  transition-colors duration-300">
                    {/* 🔙 Back Button */}
<div className="absolute top-4 left-4 md:top-6 md:left-10 z-50">
  <button
    onClick={() => navigate(-1)}
    className="bg-black/70 hover:bg-black 
               text-white 
               px-4 py-2 
               rounded-full 
               backdrop-blur-md 
               transition duration-300 
               shadow-lg"
  >
    ← Back
  </button>
</div>

    {/* 🎬 Hero Section */}
    <div className="relative">

      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20"
        style={{ backgroundImage: `url(${profileUrl})` }}
      />

      <div className="relative 
                      px-6 sm:px-10 md:px-16 
                      py-12 
                      flex flex-col md:flex-row 
                      gap-8 md:gap-12 
                      items-center md:items-start">

        {/* Profile Image */}
        <img
          src={profileUrl}
          alt={actor.name}
          className="w-48 sm:w-60 md:w-72 
                     rounded-3xl shadow-2xl 
                     object-cover"
        />

        {/* Actor Info */}
        <div className="text-center md:text-left max-w-3xl">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {actor.name}
          </h1>

          <div className="mt-4 space-y-2 text-black-400 text-sm sm:text-base">
            {actor.birthday && (
              <p>🎂 {actor.birthday}</p>
            )}
            {actor.place_of_birth && (
              <p>📍 {actor.place_of_birth}</p>
            )}
            {actor.popularity && (
              <p>🔥 Popularity: {actor.popularity.toFixed(1)}</p>
            )}
          </div>

          <p className="mt-6 text-sm sm:text-base leading-relaxed text-black-300">
            {actor.biography || "No biography available."}
          </p>
        </div>
      </div>
    </div>

    {/* 🎬 Known For Section */}
    <div className="px-6 sm:px-10 md:px-16 mt-16 pb-20">

      <h2 className="text-2xl sm:text-3xl font-bold mb-8">
        🎬 Known For
      </h2>

      <div className="grid 
                      grid-cols-2 
                      sm:grid-cols-3 
                      md:grid-cols-4 
                      lg:grid-cols-5 
                      xl:grid-cols-6 
                      gap-4 sm:gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  </div>
)
}

export default ActorDetails