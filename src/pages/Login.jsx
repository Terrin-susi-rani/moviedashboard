import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate,Navigate} from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = Cookies.get('jwt_token')

if (token) {
  return <Navigate to="/" replace />
}

  const handleLogin = async e => {
    e.preventDefault()

    const res = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    console.log(res)

    const data = await res.json()

    if (res.ok) {
   
      Cookies.set('jwt_token', data.jwt_token, {
  expires: 7,
  path: '/',
})
  

    navigate('/', { replace: true })

    } else {
      setError(data.error_msg)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-black via-gray-900 to-black
                    relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <form 
        onSubmit={handleLogin} 
        className="relative backdrop-blur-lg bg-white/10 
                   border border-white/20 
                   shadow-2xl rounded-2xl 
                   p-10 w-96 text-white transition-all duration-300"
      >
        <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">
          Welcome Back 🎬
        </h1>

        <div className="mb-5">
          <label className="block mb-2 text-sm text-gray-300">
            Username
          </label>
          <input
            className="w-full p-3 bg-black/40 rounded-lg 
                       focus:outline-none focus:ring-2 
                       focus:ring-red-500 transition-all"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="w-full p-3 bg-black/40 rounded-lg 
                       focus:outline-none focus:ring-2 
                       focus:ring-red-500 transition-all"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button 
          className="w-full bg-red-600 hover:bg-red-700 
                     transition-all duration-300 
                     p-3 rounded-lg font-semibold tracking-wide 
                     shadow-lg hover:shadow-red-500/40"
        >
          Login
        </button>

        {error && (
          <p className="text-red-400 mt-4 text-sm text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}

export default Login