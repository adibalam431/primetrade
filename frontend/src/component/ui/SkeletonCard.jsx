function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`rounded-2xl p-6 glass ${className}`}
    >
      <div className="space-y-4">
        <div className="h-6 w-3/4 rounded shimmer" />
        <div className="h-4 w-1/2 rounded shimmer" />
        <div className="h-4 w-full rounded shimmer" />
      </div>
    </div>
  );
}

export default SkeletonCard;