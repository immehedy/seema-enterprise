import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Globe, Target, Eye, Heart, Handshake, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const milestones = [
    { year: "1992", event: "Started Operations", description: "Entered used offset printing machine business" },
    { year: "2000", event: "Expanded Imports", description: "Began sourcing from Japan and Europe for superior quality" },
    { year: "2010", event: "Service Warranty Introduced", description: "6 months service warranty offered for trust" },
    { year: "2020", event: "50+ Machines Always in Stock", description: "Maintained high inventory for customer choice" },
    {
      year: "2024",
      event: "Leading Supplier",
      description: "Recognized as one of the biggest used offset printing machine suppliers in Bangladesh",
    },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Quality First",
      description: "We import superior quality machines, mostly from Japan and Europe.",
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Trust & Reliability",
      description: "We provide a 6-month service warranty for customer confidence.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "We source machines worldwide and supply them to local customers quickly.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer Focus",
      description: "We supply the machines you need within one month if not in stock.",
    },
  ]

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "Export-Import License",
    "Chamber of Commerce Member",
    "Printing Industry Association",
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted/30 to-muted/60 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Since 1992
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Providing Quality Machines for Over <span className="text-accent">30 Years</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Seema Enterprise is one of the biggest used offset printing machines importers and local suppliers,
              delivering top-quality equipment at affordable prices since 1992.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent" asChild>
                <Link href="/stock">View Our Stock</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm lg:text-base opacity-90">Machines Always in Stock</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">30+</div>
              <div className="text-sm lg:text-base opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">6 Months</div>
              <div className="text-sm lg:text-base opacity-90">Service Warranty</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">4</div>
              <div className="text-sm lg:text-base opacity-90">Showrooms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge variant="secondary" className="mb-4">
                Company History
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
                Over Three Decades of Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Seema Enterprise is a well-known name in the era of used offset printing machine business. We are
                  doing this business since 1992 and still one of the biggest used offset printing machines importer and
                  local supplier. We import machines from around the world. Our most of the machines came from Japan and
                  Europe that's why our machines quality is very good.
                </p>
                <p>
                  We provide excellent condition machines with superior quality to our customer at affordable price. We
                  can supply you every kinds of used offset printing machines that you are looking for and also others
                  related machines like cutting, die-cutting machines. If we have not any machines in our stock that you
                  are looking for, we can supply you in one month. So why you should go to another supplier for
                  machines.
                </p>
                <p>
                  Our aim is to provide quality machines at affordable price. We believe in customer satisfaction, so
                  you can rely on our machines. We also provide 6 months service warranty to our valued customer so that
                  they could understand the machine condition. Every week we buy couple of container machines. We have
                  four showrooms in different places. You will find at least 50 machines in our stock always. You are
                  always welcome in our premises.
                </p>
                <p>
                  I hope we will do good business together and make a good business relationship which will last for
                  forever. I am eagerly looking forward to your valued order. Please find out your time to visit us
                  anytime on business hour.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Seema Enterprise facility"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-background border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-semibold">Quality Machines</p>
                    <p className="text-sm text-muted-foreground">Imported from Japan & Europe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Foundation
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Mission, Vision & Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit text-accent">{value.icon}</div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Key Milestones</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A timeline of our growth and achievements over the past 30+ years
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-16 bg-border mt-4"></div>}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold">{milestone.event}</h3>
                      <Badge variant="outline">{milestone.year}</Badge>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Certifications
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Quality & Compliance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold">{cert}</h3>
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Ready to Work with Us?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-pretty">
                We invite you to visit our showrooms, explore our inventory, and experience our quality machines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us Today</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/stock">Browse Our Stock</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
