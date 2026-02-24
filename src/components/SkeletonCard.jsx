const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-800 rounded-xl overflow-hidden">
      <div className="h-72 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export default SkeletonCard