import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'

const Search = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get('q')

  const [results, setResults] = useState([])

  useEffect(() => {
    if (query) {
      fetchMovies(query)
    }
  }, [query])
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  const fetchMovies = async searchTerm => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
    )
    const data = await response.json()
    setResults(data.results)
  }

  return (
    <div className="pt-24 text-white">
      <h2 className="text-2xl mb-4">Results for "{query}"</h2>
      {results.map(item => (
        <div key={item.id}>{item.title || item.name}</div>
      ))}
    </div>
  )
}

export default Search