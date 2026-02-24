import {Link} from 'react-router-dom'

const MovieCard = ({movie}) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

    const getRatingColor = rating => {
  if (rating >= 7) return 'text-green-500'
  if (rating >= 5) return 'text-yellow-400'
  return 'text-red-500'
}
//   return (
//     <Link to={`/movie/${movie.id}`}>
//     <div className="relative min-w-[160px] group transform transition duration-300 cursor-pointer">
//         <img
//           src={imageUrl}
//           alt={movie.title}
//           className="rounded-xl shadow-lg "
//         />



//         {/* Overlay */}
//         {/* <div className="absolute bottom-0  left-0 right-0 bg-black bg-opacity-70 p-1 rounded-b-xl opacity-0 hover:opacity-100 transition">
//           <div className='m-2'>
//             <p className="text-sm font-semibold truncate text-white">
//             {movie.title || movie.name}
//           </p>
//           <p className={`text-sm font-bold text-yellow-400 ${getRatingColor(movie.vote_average)}`}>
//   ⭐ {movie.vote_average.toFixed(1)}
// </p>
//           </div>
//         </div> */}

//          <div className={`absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300`}>
//                                     <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3'>
//                                         <div className='flex items-center justify-between'>
//                                             <div className='flex items-center space-x-1'>
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="h-4 w-4 text-yellow-400"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                     >
//                                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                                 </svg>
//                                                 <span className='text-yellow-400 text-sm font-medium'>
//                                                      {movie.vote_average.toFixed(1)}
//                                                 </span>
//                                             </div>
//                                             <span className='text-neutral-400 text-sm'>
//                                                 Movies Release Date
//                                             </span>
//                                         </div>
//                                         <button className='w-full bg-red-600 hover:bg-red-700 text-white px-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm'>
//                                             View Details
//                                         </button>
//                                     </div>
//                                 </div>
//       </div>
//     </Link>
//   )
// return (
//     <Link to={`/movie/${movie.id}`}>
//       <div className="relative min-w-[160px] group cursor-pointer">

//         <img
//           src={imageUrl}
//           alt={movie.title}
//           className="rounded-xl shadow-lg w-full transition-transform duration-300 group-hover:scale-110"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
          
//           <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
//              <p className="text-sm font-semibold truncate text-white">
//            {movie.title || movie.name}
//            </p>
//             <div className="flex items-center justify-between">
             
//               <div className="flex items-center space-x-1">
//                 ⭐
//                 <span className="text-yellow-400 text-sm font-medium">
//                   {movie.vote_average?.toFixed(1)}
//                 </span>
//               </div>

//               <span className="text-neutral-300 text-sm">
//                 {(movie.release_date || movie.first_air_date)?.slice(0, 4)}
//               </span>
//             </div>

//             <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm">
//               View Details
//             </button>

//           </div>
//         </div>

//       </div>
//     </Link>
//   )
return (
  <Link to={`/movie/${movie.id}`}>
    <div className="relative min-w-[180px] group cursor-pointer transition-all duration-500">

      {/* Poster */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-[270px] object-cover 
                     transition-transform duration-500 
                     group-hover:scale-110"
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>


        {/* Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t 
                        from-black/95 via-black/50 to-transparent 
                        flex flex-col justify-end 
                        p-4 opacity-0 group-hover:opacity-100 
                        transition-all duration-500">

          <div className="translate-y-6 group-hover:translate-y-0 
                          transition-transform duration-500 space-y-2">

            <h3 className="text-sm font-semibold truncate text-white">
              {movie.title || movie.name}
            </h3>
            
        {/* Rating Badge */}
        <div className={`absolute top-3 right-3 text-yellow-400 px-2 py-1 rounded-lg text-xs font-bold  ${getRatingColor(movie.vote_average)}`}>
          ⭐ {movie.vote_average?.toFixed(1)}
        </div>

            <p className="text-xs text-gray-300">
              {(movie.release_date || movie.first_air_date)?.slice(0, 4)}
            </p>

            <button className="mt-2 w-full bg-red-600 hover:bg-red-700 
                               text-white text-xs py-2 rounded-lg 
                               transition-all duration-300 
                               shadow-lg hover:shadow-red-500/40">
              ▶ View Details
            </button>

          </div>
        </div>
      </div>

    </div>
  </Link>
)
}

export default MovieCard