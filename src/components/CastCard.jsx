import { useNavigate } from "react-router-dom"
const CastCard = ({cast}) => {
   const navigate = useNavigate()

  const imageUrl = cast.profile_path
    ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

 return (
  <div  onClick={() => navigate(`/actor/${cast.id}`)} className="relative w-[170px] flex-shrink-0 group cursor-pointer">

    {/* Card Container */}
    <div className="
      relative overflow-hidden rounded-2xl shadow-xl
      bg-gradient-to-b from-gray-900 to-gray-800
      transition-all duration-500
      group-hover:shadow-2xl group-hover:shadow-red-500/20
    ">

      {/* Image */}
      <img
        src={imageUrl}
        alt={cast.name}
        className="
          w-full 
          h-[180px] 
          sm:h-[220px] 
          md:h-[250px] 
          object-cover
          transition-transform duration-500
          group-hover:scale-110
        "
      />

      {/* Dark Overlay */}
      <div className="
        absolute inset-0 bg-black/40
        sm:group-hover:bg-black/60
        transition duration-500
      " />

      {/* Info Section */}
      <div className="
        absolute inset-0 flex flex-col justify-end
        p-2 sm:p-4
        bg-gradient-to-t from-black/90 via-black/40 to-transparent
        opacity-100 sm:opacity-0
        sm:group-hover:opacity-100
        transition-all duration-500
      ">

        <div className="
          translate-y-0 sm:translate-y-6
          sm:group-hover:translate-y-0
          transition-transform duration-500
          space-y-1 sm:space-y-2
        ">

          <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
            {cast.name}
          </h3>

          <p className="
            text-[10px] sm:text-xs
            text-gray-300
            bg-white/10 backdrop-blur-md
            px-2 py-1 rounded-md inline-block
          ">
            🎭 {cast.character}
          </p>

        </div>
      </div>

    </div>
  </div>
)
}

export default CastCard