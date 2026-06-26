import Link from "next/link";
import { Images } from "lucide-react";
import { getGalleryAlbums, getImageUrl } from "@/lib/contentful";

export const revalidate = 3600;

export default async function RecentUpdatesPage() {
  const albums = await getGalleryAlbums();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-10 border-l-4 border-primary pl-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
          Recent Updates
        </h1>
        <p className="text-muted-foreground text-sm">
          Latest loading &amp; unloading machine arrivals
        </p>
      </div>

      {albums.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1">
          {albums.map((album) => {
            const cover = album.fields.images?.[0];
            const coverUrl = cover ? getImageUrl(cover) : "/placeholder.svg";
            const date = album.fields.publishedDate
              ? new Date(album.fields.publishedDate).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" }
                )
              : new Date(album.sys.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

            return (
              <Link
                key={album.sys.id}
                href={`/recent-updates/${album.fields.slug}`}
                className="group relative aspect-square overflow-hidden bg-muted block">
                <img
                  src={coverUrl}
                  alt={album.fields.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 flex flex-col justify-end p-4">
                  <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-1">
                      {album.fields.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-xs">{date}</span>
                      {album.fields.images?.length > 1 && (
                        <>
                          <span className="text-white/40 text-xs">·</span>
                          <span className="text-white/70 text-xs">
                            {album.fields.images.length} photos
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 text-muted-foreground">
          <Images className="h-16 w-16 mx-auto mb-4 opacity-25" />
          <h2 className="text-xl font-medium mb-2">No updates yet</h2>
          <p className="text-sm">Check back soon for the latest arrivals.</p>
        </div>
      )}
    </div>
  );
}
