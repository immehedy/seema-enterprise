export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mb-2" />
        <div className="h-5 w-96 bg-muted animate-pulse rounded" />
      </div>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-3 rounded-xl bg-muted animate-pulse"
            style={{ height: `${180 + (i % 3) * 80}px` }}
          />
        ))}
      </div>
    </div>
  );
}
