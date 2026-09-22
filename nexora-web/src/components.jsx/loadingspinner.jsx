const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-gray-950/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">

        {/* Animated Spinner */}
        <div className="relative h-20 w-20">

          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-800" />

          {/* Spinning Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-400 border-r-emerald-500" />

          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold tracking-wide text-emerald-400">
            Loading
          </p>

          {/* Animated Dots */}
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* Screen Reader Text */}
        <span className="sr-only">Loading, please wait</span>

      </div>
    </div>
  );
};

export default LoadingSpinner;