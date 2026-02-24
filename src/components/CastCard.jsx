const CastCard = ({cast}) => {
  const imageUrl = cast.profile_path
    ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  return (
    <div className="relative min-w-[170px] group cursor-pointer">

      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl 
                      bg-gradient-to-b from-gray-900 to-gray-800 
                      transition-all duration-500 
                      group-hover:shadow-2xl group-hover:shadow-red-500/20">

        {/* Image */}
        <img
          src={imageUrl}
          alt={cast.name}
          className="h-56 w-full object-cover 
                     transition-transform duration-500 
                     group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 
                        group-hover:bg-black/60 
                        transition duration-500"></div>

        {/* Info Section */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 
                        bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                        opacity-0 group-hover:opacity-100 
                        transition-all duration-500">

          <div className="translate-y-6 group-hover:translate-y-0 
                          transition-transform duration-500 space-y-2">

            <h3 className="text-sm font-semibold text-white truncate">
              {cast.name}
            </h3>

            <p className="text-xs text-gray-300 bg-white/10 
                          backdrop-blur-md px-2 py-1 
                          rounded-md inline-block">
              🎭 {cast.character}
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CastCard