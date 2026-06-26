export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="w-full h-64 sm:h-80 lg:h-[480px] bg-muted animate-pulse" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto mb-12 space-y-3">
          <div className="h-5 bg-muted animate-pulse rounded w-full" />
          <div className="h-5 bg-muted animate-pulse rounded w-5/6" />
          <div className="h-5 bg-muted animate-pulse rounded w-4/6" />
        </div>
        <div className="h-7 w-40 bg-muted animate-pulse rounded mb-6" />
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-3 rounded-xl bg-muted animate-pulse"
              style={{ height: `${160 + (i % 4) * 70}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
