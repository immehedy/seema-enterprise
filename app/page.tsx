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

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Heidelberg Speedmaster SM 74-4",
      category: "Offset Printing Press",
      year: "2018",
      condition: "Excellent",
      price: "Contact for Price",
      image: "/placeholder.jpg",
      features: ["4-Color", "Auto Plate Loading", "CIP4 Compatible"],
      isNew: false,
    },
    {
      id: 2,
      name: "Komori Lithrone L540",
      category: "Sheet-fed Press",
      year: "2020",
      condition: "Like New",
      price: "Contact for Price",
      image: "/placeholder.jpg",
      features: ["5-Color", "UV Capability", "High Speed"],
      isNew: true,
    },
    {
      id: 3,
      name: "Bobst Die Cutter SP 102-E",
      category: "Die Cutting Machine",
      year: "2019",
      condition: "Very Good",
      price: "Contact for Price",
      image: "/placeholder.jpg",
      features: ["Automatic", "Stripping Unit", "High Precision"],
      isNew: false,
    },
    {
      id: 4,
      name: "Stahl Folder KH 82",
      category: "Folding Machine",
      year: "2021",
      condition: "Excellent",
      price: "Contact for Price",
      image: "/placeholder.jpg",
      features: ["8 Fold Plates", "Touch Screen", "Auto Setup"],
      isNew: true,
    },
  ];

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
      <section className="relative bg-gradient-to-br from-muted/30 to-muted/60 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Trusted Since 1992
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Premium Printing & Paper Converting{" "}
                  <span className="text-accent">Machinery</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Your trusted partner for high-quality printing and
                  paper-converting equipment. From offset presses to finishing
                  machines, we supply the industry's best machinery worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/stock" passHref>
                  <Button size="lg" className="text-lg px-8">
                    Browse Stock Catalogue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/contact" passHref>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 bg-transparent">
                    Request Quote
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">
                    Quality Guaranteed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Global Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Expert Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/seema-hero.jpg"
                  alt="Modern printing machinery in operation"
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent"></div>
                    <div className="w-8 h-8 rounded-full bg-primary"></div>
                    <div className="w-8 h-8 rounded-full bg-secondary"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      1000+ Happy Customers
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        4.9/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Featured Equipment
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Latest Arrivals & Premium Machinery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover our carefully selected collection of high-quality
              printing and paper-converting equipment from leading
              manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={800} // or actual image width
                    height={400} // or actual image height
                    className="w-full h-48 object-cover rounded-t-lg"
                    style={{ objectFit: "cover" }}
                    priority // optional for above-the-fold content
                  />
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      New Arrival
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-background/90 text-foreground">
                    {product.condition}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
                        <Link href={`/stock/${product.id}`}>
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {product.category}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-accent">
                        {product.price}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="bg-transparent">
              View All Stock
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Complete Solutions for Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Beyond equipment sales, we provide comprehensive services to
              ensure your success in the printing and packaging industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit text-accent">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Ready to Find Your Perfect Machinery?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-pretty">
                Get in touch with our experts today. We'll help you find the
                right equipment for your specific needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +880 1711-871147
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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
