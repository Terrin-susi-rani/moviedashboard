import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchTrending = (page = 1) =>
  axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)

export const fetchTopRated = () =>
  axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)

export const fetchUpcoming = () =>
  axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)

export const fetchTVShows = () =>
  axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)

export const fetchMovieDetails = id =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)

export const fetchMovieCredits = id =>
  axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)

export const fetchSimilarMovies = id =>
  axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)

export const fetchActorDetails = id =>
  axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}`)

export const fetchActorMovies = id =>
  axios.get(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`)