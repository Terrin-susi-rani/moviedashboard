import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  useEffect(() => {
    const root = document.documentElement
    dark ? root.classList.add("dark") : root.classList.remove("dark")
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded bg-transparent transition"
    >
      {dark ? "☀" : "🌙 "}
    </button>
  )
}

export default ThemeToggle