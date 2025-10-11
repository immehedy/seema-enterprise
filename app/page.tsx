import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Search,
  Star,
  Truck,
  Shield,
  Users,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/hero";
import { MachineEntry } from "@/types/contentful";
import { contentfulClient } from "@/lib/contentful";

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
  // Fetch machines on the server
  const machines = await getMachines();

  // Sort by creation date (newest first) and show only the latest 5
  const featuredProducts = machines
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const services = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Equipment Sourcing",
      description:
        "We help you find the exact machinery you need from our extensive network of suppliers worldwide.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Assurance",
      description:
        "Every machine undergoes thorough inspection and testing before delivery to ensure optimal performance.",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Transportation & Installation",
      description:
        "Complete logistics support including safe transportation and professional installation services.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Consultation",
      description:
        "Our experienced team provides technical guidance and support throughout your purchase journey.",
    },
  ];

  const stats = [
    { number: "500+", label: "Machines Sold" },
    { number: "25+", label: "Years Experience" },
    { number: "50+", label: "Countries Served" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      {/* Featured Products */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Latest Arrivals & Premium Machinery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.slug || index}
                className="group hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative">
                  <Badge variant="secondary" className=" mx-2 absolute -mt-4">
                    New Arrivals
                  </Badge>
                  <img
                    src={
                      product.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&h=400&fit=crop"
                    }
                    alt={product.name}
                    className="w-full h-48 sm:h-56 lg:h-48 object-cover rounded-t-lg -mt-6"
                  />
                </div>

                {/* Wrapper to control flex layout */}
                <div className="flex flex-col flex-grow">
                  <CardHeader className="pb-3 flex-grow">
                    <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      <Link href={`/stock/${product.slug}`}>
                        {product.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <Link href={`/stock/${product.slug}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/stock">
              <Button size="lg" variant="outline" className="bg-transparent">
                View All Stock
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Complete Solutions for Your Business
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond equipment sales, we provide comprehensive services to
              ensure your success in the printing and packaging industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit text-accent">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-accent text-primary-foreground">
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
