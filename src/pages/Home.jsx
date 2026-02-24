import Navbar from '../components/Navbar'
import MovieRow from '../components/MovieRow'
import {
  fetchTrending,
  fetchTopRated,
  fetchUpcoming,
  fetchTVShows,
} from '../api/tmdb'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
 <div className="min-h-screen bg-gradient-to-b from-neutral-200 to-neutral-800 dark:from-neutral-900 dark:to-black text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <HeroSection fetchFunction={fetchTrending}/>
      {/* Hero Section (Trending Background) */}
      <MovieRow
        title="🔥 Trending Now"
        fetchFunction={fetchTrending}
      />

      <MovieRow
        title="⭐ Top Rated"
        fetchFunction={fetchTopRated}
      />

      <MovieRow
        title="🎥 Upcoming"
        fetchFunction={fetchUpcoming}
      />

      <MovieRow
        title="📺 Popular TV Shows"
        fetchFunction={fetchTVShows}
      />
    </div>
  )
}

export default Home