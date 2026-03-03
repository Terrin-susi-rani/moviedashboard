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
    <div className="min-h-screen 
                    bg-gradient-to-b 
                    from-neutral-200 to-neutral-800 
                    dark:from-neutral-900 dark:to-black 
                    text-black dark:text-white 
                    transition-colors duration-300">

      <Navbar />

      {/* Hero Section */}
      <HeroSection fetchFunction={fetchTrending} />

      {/* Movie Sections */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 space-y-8 sm:space-y-12 pb-10">
        
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
    </div>
  )
}


export default Home