import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {fetchActorDetails, fetchActorMovies} from '../api/tmdb'
import MovieCard from '../components/MovieCard'

const ActorDetails = () => {
  const {id} = useParams()
  const [actor, setActor] = useState(null)
  const [movies, setMovies] = useState([])

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
 <div className="min-h-screen bg-white text-white dark:bg-black dark:text-white transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={profileUrl}
          className="w-80 rounded-2xl shadow-xl"
        />

        <div>
          <h1 className="text-4xl font-bold">{actor.name}</h1>
          <p className="mt-4 text-gray-400">
            🎂 {actor.birthday}
          </p>
          <p className="mt-6 max-w-2xl">
            {actor.biography || "No biography available."}
          </p>
        </div>
      </div>

      {/* Known For */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          🎬 Known For
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActorDetails