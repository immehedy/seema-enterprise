import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getGalleryAlbumBySlug,
  getGalleryAlbums,
  getImageUrl,
  renderRichTextToHtml,
  hasRichTextContent,
} from "@/lib/contentful";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.fields.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) return {};
  return {
    title: `${album.fields.title} | Recent Updates`,
    description: `View photos from: ${album.fields.title}`,
  };
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);

  if (!album) notFound();

  const images = (album.fields.images || []).map((img) => getImageUrl(img));

  const descriptionHtml =
    album.fields.description && hasRichTextContent(album.fields.description)
      ? renderRichTextToHtml(album.fields.description)
      : null;

  const publishedDate = album.fields.publishedDate
    ? new Date(album.fields.publishedDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date(album.sys.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <div className="min-h-screen">

      {/* ── Top navigation bar ── */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/recent-updates"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Recent Updates
          </Link>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex items-end justify-between mb-8">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
              {album.fields.title}
            </h2>
            {descriptionHtml && (
              <p
                className="text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            )}
          </div>
        </div>

        {/* ── Photo grid ── */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
            {images.map((url, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden bg-muted">
                <img
                  src={url}
                  alt={`${album.fields.title} — ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
