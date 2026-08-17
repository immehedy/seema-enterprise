import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Phone,
  Mail,
  Images,
  ArrowRight,
  CheckCircle2,
  Camera,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/hero";
import { MachineCard } from "@/components/machine-card";
import {
  contentfulClient,
  getGalleryAlbums,
  getImageUrl,
  richTextToPlainText,
} from "@/lib/contentful";
import type { GalleryAlbumEntry } from "@/types/contentful";

export const revalidate = 3600; // Revalidate content every hour

// Server-side data fetching function
async function getMachines(): Promise<any[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: "machine",
    });

    const mapped = entries.items.map((entry: any) => {
      const fields = entry.fields;
      return {
        ...fields,
        images: (fields.images || []).map((img: any) => ({
          url: img?.fields?.file?.url
            ? "https:" + img.fields.file.url
            : "/placeholder.jpg",
        })),
        category: fields?.category?.fields?.name,
        createdAt: entry?.sys?.createdAt,
      };
    }) as any[];

    return mapped;
  } catch (error) {
    console.error("Error fetching machines from Contentful:", error);
    return [];
  }
}

export default async function HomePage() {
  // Fetch machines and gallery albums on the server
  const machines = await getMachines();
  const galleryAlbums = await getGalleryAlbums(6);

  // Sort by creation date (newest first) and show only the latest 5 featured.
  // Available machines take priority over sold out ones.
  const byAvailabilityThenDate = (a: any, b: any) => {
    const aAvailable = a.isAvailable ? 0 : 1;
    const bAvailable = b.isAvailable ? 0 : 1;
    if (aAvailable !== bAvailable) return aAvailable - bAvailable;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  };

  const featuredProducts = machines
    .filter(
      (machine) => machine.isFeatured === true && machine.isAvailable !== false
    )
    .sort(byAvailabilityThenDate)
    .slice(0, 6);


  const formatDate = (dateStr?: string, fallback?: string) => {
    const d = dateStr
      ? new Date(dateStr)
      : fallback
      ? new Date(fallback)
      : null;
    if (!d || isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getExcerpt = (album: GalleryAlbumEntry, max = 160) => {
    const text = richTextToPlainText(album.fields.description);
    if (!text) {
      return "Photos and details from this machine arriving at our facility.";
    }
    return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
  };

  const MachineTyupes = [
    {
      image: "/press.jpeg",
      alt: "PRESS MACHINE",
      title: "PRESS",
      url: "/press-one",
    },
    {
      image: "/cutting-machine.png",
      alt: "PAPER CUTTING MACHINE",
      title: "PAPER CUTTING",
      url: "/paper-cutting",
    },
    {
      image: "/die-cutting.png",
      alt: "DIE CUTTING MACHINE",
      title: "DIE CUTTING",
      url: "/die-cutting",
    },
    {
      image: "/post-press.png",
      alt: "POST PRESS MACHINE",
      title: "POST PRESS",
      url: "/post-press",
    },
  ];

  const stats = [
    { number: "300+", label: "Machines Sold per Year" },
    { number: "35+", label: "Years Experience" },
    { number: "50+", label: "Supplier countries involved" },
    { number: "100+", label: "Available stock of machines" },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Hero Section */}
      <HeroSection />

      {/* Machine Types  */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
                Types of machinery
              </h2>
              <p className="text-muted-foreground text-sm">
                There are different types of machinery available in seema
                enterprise
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {MachineTyupes.map((machine, index) => (
              <Card
                key={machine.url || index}
                className="group hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative">
                  <img
                    src={
                      machine.image ||
                      "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&h=400&fit=crop"
                    }
                    alt={machine.alt}
                    className="w-full h-48 sm:h-56 lg:h-48 object-contain rounded-t-lg -mt-6"
                  />
                </div>

                <div className="flex flex-col flex-grow text-center">
                  <div className="flex-grow p-6">
                    <h3 className="text-base sm:text-lg leading-tight font-semibold group-hover:text-blue-600 transition-colors">
                      <Link href={machine.url}>{machine.title}</Link>
                    </h3>
                  </div>

                  <div className="pt-2 p-6">
                    <Link href={machine.url}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent w-full">
                        Visit Page
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
                Featured Machines
              </h2>
              <p className="text-muted-foreground text-sm">
                Featured Machines available in seema enterprise
              </p>
            </div>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((machine, index) => (
                <MachineCard key={machine.slug || index} machine={machine} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground mb-12">
              <p>No featured machines available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Updates Gallery Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                From the warehouse floor
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 uppercase">
                Recent Updates
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Fresh arrivals of printing presses, paper cutters, die cutters
                and post-press machinery — documented as they are loaded and
                unloaded at our facility.
              </p>
            </div>
            <Link href="/recent-updates" className="hidden sm:inline-flex shrink-0">
              <Button variant="outline" className="gap-2">
                View all updates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {galleryAlbums.length > 0 ? (
            (() => {
              const [featuredAlbum, ...rest] = galleryAlbums;
              const railAlbums = rest.slice(0, 3);
              const hasRail = railAlbums.length > 0;
              const featuredCover = featuredAlbum.fields.images?.[0];
              const featuredUrl = featuredCover
                ? getImageUrl(featuredCover)
                : "/placeholder.svg";
              const featuredDate = formatDate(
                featuredAlbum.fields.publishedDate,
                featuredAlbum.sys.createdAt
              );

              return (
                <>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Featured album */}
                    <Link
                      href={`/recent-updates/${featuredAlbum.fields.slug}`}
                      className={`group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border hover:shadow-lg transition-shadow ${
                        hasRail ? "lg:col-span-2" : "lg:col-span-3"
                      }`}>
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={featuredUrl}
                          alt={featuredAlbum.fields.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                          <Sparkles className="h-3.5 w-3.5" />
                          Latest arrival
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-primary transition-colors mb-2">
                          {featuredAlbum.fields.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                          {getExcerpt(featuredAlbum, 180)}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          {featuredDate && (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {featuredDate}
                            </span>
                          )}
                          {featuredAlbum.fields.images?.length > 0 && (
                            <span className="inline-flex items-center gap-1.5">
                              <Camera className="h-3.5 w-3.5" />
                              {featuredAlbum.fields.images.length} photos
                            </span>
                          )}
                          <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-primary">
                            View album
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Rail of compact cards */}
                    {hasRail && (
                      <div className="flex flex-col gap-4">
                        {railAlbums.map((album) => {
                          const cover = album.fields.images?.[0];
                          const coverUrl = cover
                            ? getImageUrl(cover)
                            : "/placeholder.svg";
                          const date = formatDate(
                            album.fields.publishedDate,
                            album.sys.createdAt
                          );
                          return (
                            <Link
                              key={album.sys.id}
                              href={`/recent-updates/${album.fields.slug}`}
                              className="group flex gap-4 rounded-xl bg-white p-3 shadow-sm ring-1 ring-border hover:shadow-md transition-shadow">
                              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={coverUrl}
                                  alt={album.fields.title}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <div className="flex min-w-0 flex-1 flex-col justify-center">
                                <h4 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                                  {album.fields.title}
                                </h4>
                                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                                  {date && (
                                    <span className="inline-flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {date}
                                    </span>
                                  )}
                                  {album.fields.images?.length > 0 && (
                                    <span className="inline-flex items-center gap-1">
                                      <Camera className="h-3 w-3" />
                                      {album.fields.images.length}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-center sm:hidden">
                    <Link href="/recent-updates">
                      <Button variant="outline" className="gap-2">
                        <Images className="h-4 w-4" />
                        View All Updates
                      </Button>
                    </Link>
                  </div>
                </>
              );
            })()
          ) : (
            <div className="rounded-xl bg-white py-16 text-center text-muted-foreground shadow-sm ring-1 ring-border">
              <Images className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p>No updates available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      {/* <TeamSection /> */}

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border grid lg:grid-cols-5">
            {/* Left: SEO content */}
            <div className="lg:col-span-3 p-8 sm:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                <Wrench className="h-3.5 w-3.5" />
                Your machinery partner
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Source Reliable Printing &amp; Paper-Converting Machinery in
                Bangladesh
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                From single to multi-colour printing presses, paper cutters,
                die cutters and complete post-press lines, Seema Enterprise
                supplies inspected, ready-to-run equipment backed by 25+ years
                of industry experience. Browse our stock or tell us what you
                need and our team will recommend the right machine for your
                budget and output.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Inspected, ready-to-run machines",
                  "One-colour to four-colour+ printing presses",
                  "Paper cutting, die cutting & post-press",
                  "Expert guidance and after-sales support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: contact panel */}
            <div className="lg:col-span-2 bg-secondary text-secondary-foreground p-8 sm:p-12 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-1">Talk to an expert</h3>
              <p className="text-sm opacity-80 mb-6">
                Get a fast response on pricing, availability and
                specifications.
              </p>
              <div className="space-y-3">
                <Button asChild size="lg" className="w-full text-base font-semibold">
                  <Link href="tel:+8801711871147">
                    <Phone className="mr-2 h-5 w-5" />
                    +880 1711-871147
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full text-base font-semibold bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                  <Link href="mailto:info@seemaenterprisebd.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Send an enquiry
                  </Link>
                </Button>
              </div>
              <div className="mt-6 space-y-2 text-xs opacity-80">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Dhaka, Bangladesh
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" /> Sat–Thu, 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
