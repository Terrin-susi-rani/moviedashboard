import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <motion.nav
      initial={{y: -80}}
      animate={{y: 0}}
      transition={{duration: 0.5}}
      className="fixed top-0 w-full bg-black bg-opacity-70 backdrop-blur-md p-4 flex justify-between items-center z-50"
    >
      <Link to="/" className="text-2xl text-red-600 font-bold">
        🎬 MovieDB
      </Link>
    
      <div className="flex gap-6 text-white">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
         <ThemeToggle />
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-1 rounded hover:shadow-glow transition"
        >
          Logout
        </button>
      </div>
    </motion.nav>
  )
}

export default Navbar