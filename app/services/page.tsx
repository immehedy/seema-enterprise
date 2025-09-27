import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Search, DollarSign, Truck, Wrench, Shield, Users, Clock, Globe, Phone } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: <Search className="h-12 w-12" />,
      title: "Equipment Sourcing",
      description: "We help you find the exact machinery you need from our extensive global network.",
      features: [
        "Global supplier network",
        "Custom requirement matching",
        "Quality pre-screening",
        "Competitive pricing",
      ],
      process: [
        "Share your requirements",
        "We source matching equipment",
        "Present options with details",
        "Facilitate purchase process",
      ],
    },
    {
      icon: <DollarSign className="h-12 w-12" />,
      title: "Equipment Valuation",
      description: "Professional machinery appraisal services for insurance, sale, or purchase decisions.",
      features: ["Certified appraisers", "Market-based valuations", "Detailed reports", "Insurance documentation"],
      process: ["Schedule inspection", "Comprehensive evaluation", "Market analysis", "Detailed valuation report"],
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Transportation & Logistics",
      description: "Complete logistics solutions for safe and efficient machinery transportation worldwide.",
      features: ["Global shipping network", "Specialized packaging", "Insurance coverage", "Real-time tracking"],
      process: ["Logistics planning", "Professional packaging", "Secure transportation", "Delivery coordination"],
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "Installation & Setup",
      description: "Professional installation services to ensure your machinery operates at peak performance.",
      features: ["Certified technicians", "Complete setup service", "Performance testing", "Operator training"],
      process: [
        "Site preparation guidance",
        "Professional installation",
        "System calibration",
        "Training and handover",
      ],
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Quality Assurance",
      description: "Rigorous inspection and testing to ensure every machine meets our quality standards.",
      features: ["Multi-point inspection", "Performance testing", "Quality certification", "Warranty coverage"],
      process: ["Initial assessment", "Detailed inspection", "Performance testing", "Quality certification"],
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Consultation & Support",
      description: "Expert guidance throughout your machinery purchase and operation journey.",
      features: ["Technical consultation", "Ongoing support", "Spare parts supply", "Maintenance guidance"],
      process: ["Requirement analysis", "Expert recommendations", "Purchase support", "Ongoing assistance"],
    },
  ]

  const whyChooseUs = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "25+ Years Experience",
      description: "Decades of industry expertise and proven track record",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Worldwide supplier and customer network for best deals",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guaranteed",
      description: "Every machine inspected and certified before delivery",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Team",
      description: "Skilled professionals with deep industry knowledge",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted/30 to-muted/60 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Our Services
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Complete Solutions for Your <span className="text-accent">Machinery Needs</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              From sourcing and valuation to transportation and installation, we provide comprehensive services to
              ensure your success in the printing industry.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Comprehensive Service Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              We offer end-to-end solutions to support your machinery requirements at every stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 p-3 bg-accent/10 rounded-full w-fit text-accent">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-pretty">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Our Process:</h4>
                    <ol className="space-y-2">
                      {service.process.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="flex-shrink-0 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Your Trusted Partner in Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              We combine industry expertise with personalized service to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit text-accent">{item.icon}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              How We Work
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Simple, Transparent Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              From initial consultation to final delivery, we ensure a smooth experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Initial Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  We understand your requirements and provide expert recommendations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Solution Design</h3>
                <p className="text-sm text-muted-foreground">
                  We create a customized solution that fits your needs and budget
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                <p className="text-sm text-muted-foreground">
                  Professional execution with quality assurance at every step
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
                <p className="text-sm text-muted-foreground">Continued assistance to ensure your long-term success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-pretty">
                Contact our experts today to discuss your machinery requirements and discover how we can help your
                business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/stock">Browse Equipment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
