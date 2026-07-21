import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Images } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/hero";
import { MachineCard } from "@/components/machine-card";
import {
  contentfulClient,
  getGalleryAlbums,
  getImageUrl,
} from "@/lib/contentful";

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

  // Sort by creation date (newest first) and show only the latest 5 featured
  const featuredProducts = machines
    .filter((machine) => machine.isFeatured === true)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // All machines, newest first — capped for homepage display
  const allMachines = [...machines]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8);

  const MachineTyupes = [
    {
      image: "/press.jpeg",
      alt: "PRESS MACHINE",
      title: "PRESS",
      url: "/press",
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
    { number: "500+", label: "Machines Sold per Year" },
    { number: "25+", label: "Years Experience" },
    { number: "50+", label: "Supplier countries involved" },
    { number: "98%", label: "Customer Satisfaction" },
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

      {/* All Machines */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
                All Machines
              </h2>
              <p className="text-muted-foreground text-sm">
                Explore our full range of printing and paper-converting
                machinery
              </p>
            </div>
            <Link href="/press">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All
              </Button>
            </Link>
          </div>

          {allMachines.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {allMachines.map((machine, index) => (
                  <MachineCard key={machine.slug || index} machine={machine} />
                ))}
              </div>
              <div className="text-center sm:hidden">
                <Link href="/press">
                  <Button variant="outline" className="gap-2">
                    View All Machines
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>No machines available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Updates Gallery Section */}
      <section className="pb-16 sm:pb-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
                Recent Updates
              </h2>
              <p className="text-muted-foreground text-sm">
                Latest loading &amp; unloading machine arrivals
              </p>
            </div>
            <Link href="/recent-updates">
              <Button variant="outline" className="hidden sm:flex gap-2">
                <Images className="h-4 w-4" />
                View All
              </Button>
            </Link>
          </div>

          {galleryAlbums.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {galleryAlbums.map((album) => {
                  const cover = album.fields.images?.[0];
                  const coverUrl = cover
                    ? getImageUrl(cover)
                    : "/placeholder.svg";
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
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 flex flex-col justify-end p-4">
                        <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-1">
                            {album.fields.title}
                          </p>
                          {album.fields.images?.length > 1 && (
                            <p className="text-white/70 text-xs">
                              {album.fields.images.length} photos
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-6 sm:hidden">
                <Link href="/recent-updates">
                  <Button variant="outline" className="gap-2">
                    <Images className="h-4 w-4" />
                    View All Updates
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Images className="h-12 w-12 mx-auto mb-4 opacity-30" />
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
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Find Your Perfect Machinery?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Get in touch with our experts today. We'll help you find the
                right equipment for your specific needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base sm:text-lg px-6 sm:px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +880 1711-871147
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-6 sm:px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Enquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
