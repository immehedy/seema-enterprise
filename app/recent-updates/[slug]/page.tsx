import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Images } from "lucide-react";
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
  const coverUrl = images[0] ?? "/placeholder.svg";

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

  const descriptionHtml =
    album.fields.description && hasRichTextContent(album.fields.description)
      ? renderRichTextToHtml(album.fields.description)
      : null;

  return (
    <div className="min-h-screen">

      {/* ── Top navigation bar ── */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/recent-updates"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Recent Updates
          </Link>
          <span className="text-xs text-muted-foreground hidden sm:block">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </span>
        </div>
      </div>

      {/* ── Article header ── */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-secondary-foreground/60 text-xs font-semibold uppercase tracking-widest mb-4">
              Recent Updates
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {album.fields.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-secondary-foreground/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {publishedDate}
              </span>
              <span className="w-px h-4 bg-secondary-foreground/30" />
              <span className="flex items-center gap-1.5">
                <Images className="h-4 w-4" />
                {images.length} {images.length === 1 ? "photo" : "photos"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover + Description ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">

          {/* Cover image */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={coverUrl}
                alt={album.fields.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description / sidebar */}
          <div className="lg:col-span-2 lg:pt-2">
            {descriptionHtml ? (
              <>
                <div className="w-10 h-0.5 bg-primary mb-6" />
                <div
                  className="text-foreground leading-relaxed text-sm sm:text-base
                    [&>p]:mb-4 [&>p]:leading-7
                    [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4
                    [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3
                    [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mb-2
                    [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:mb-4
                    [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ol]:mb-4
                    [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-4"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </>
            ) : (
              <div className="text-muted-foreground text-sm italic pt-4">
                No description provided.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Full photo grid ── */}
      {images.length > 1 && (
        <div className="border-t">
          {/* Section label */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              All Photos
            </h2>
            <span className="text-xs text-muted-foreground">
              {images.length} images
            </span>
          </div>

          {/* Square grid — no radius */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5">
            {images.map((url, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden bg-muted">
                <img
                  src={url}
                  alt={`${album.fields.title} — ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <span className="absolute bottom-2 right-2 text-white/80 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1} / {images.length}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
