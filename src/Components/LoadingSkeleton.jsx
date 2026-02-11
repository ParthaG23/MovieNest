// src/Components/UI/LoadingSkeleton.jsx

const LoadingSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            h-[260px]
            rounded-xl
            bg-gradient-to-r
            from-[#2a0000]
            via-red-700
            to-[#2a0000]
            animate-pulse
          "
        >
          {/* Optional inner shimmer blocks */}
          <div className="h-full w-full bg-black/20 rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
