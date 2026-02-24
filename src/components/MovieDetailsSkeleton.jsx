const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse">

      {/* Hero Skeleton */}
      <div className="relative h-[80vh] bg-neutral-800 flex items-end">
        <div className="p-10 flex gap-10">
          <div className="w-72 h-[400px] bg-neutral-700 rounded-2xl"></div>

          <div className="space-y-4">
            <div className="h-10 w-80 bg-neutral-700 rounded"></div>
            <div className="h-6 w-32 bg-neutral-700 rounded"></div>
            <div className="h-6 w-40 bg-neutral-700 rounded"></div>
            <div className="h-24 w-[500px] bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Cast Skeleton */}
      <div className="px-10 mt-16">
        <div className="h-8 w-40 bg-neutral-700 rounded mb-6"></div>
        <div className="flex gap-6">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="w-32 h-48 bg-neutral-700 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Similar Skeleton */}
      <div className="px-10 mt-16">
        <div className="h-8 w-60 bg-neutral-700 rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="h-64 bg-neutral-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default MovieDetailsSkeleton