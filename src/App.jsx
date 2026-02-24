import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import ActorDetails from "./pages/ActorDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import Search from "./pages/Search"

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-black dark:bg-neutral-900 dark:text-white transition-colors duration-300">

      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/actor/:id"
            element={
              <ProtectedRoute>
                <ActorDetails />
              </ProtectedRoute>
            }
          />

          {/* ✅ MOVE SEARCH INSIDE ROUTES */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App