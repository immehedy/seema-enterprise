"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Mobile",
      details: ["01711-871147"],
      description: "Call us for immediate assistance",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@seemaenterprisebd.com"],
      description: "Send us your requirements",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: [
        "55/2, Farm'r Mor, Paradogair, Matuail, Jatrabari",
        "Dhaka, Bangladesh 1362",
      ],
      description: "Visit our facility",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Website",
      details: ["http://www.seemaenterprisebd.com/"],
      description: "Visit our website",
    },
  ];

  const offices = [
    {
      city: "Dhaka (Headquarters)",
      address: "55/2, Farm'r Mor, Paradogair, Matuail, Jatrabari, Dhaka 1362",
      phone: "01711-871147",
      email: "info@seemaenterprisebd.com",
      isHeadquarters: true,
    },
    {
      city: "Dhaka (Office)",
      address: "23, 3H Distilary Rd, Dhaka 1204",
      phone: "01711-871147",
      email: "info@seemaenterprisebd.com",
      isHeadquarters: false,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted/30 to-muted/60 pt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Let's Discuss Your{" "}
              <span className="text-accent">Machinery Requirements</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Our experts are ready to help you find the perfect printing and
              paper-converting equipment for your business. Contact us today for
              personalized assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Map and Info */}
      <section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Google Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Location</CardTitle>
                  <CardDescription>
                    Visit us at our headquarters in Dhaka
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    title="Seema Enterprise Location"
                    src="https://www.google.com/maps?q=55/2+Matuail+Dhaka+Bangladesh&output=embed"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    className="border-0 w-full"></iframe>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>Multiple ways to reach us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 p-2 border bg-muted/50 rounded-full text-accent">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-muted-foreground break-all">
                            {detail}
                          </p>
                        ))}
                        <p className="text-xs text-muted-foreground mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Office
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Visit Us Locally
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{office.city}</CardTitle>
                    {office.isHeadquarters && (
                      <Badge className="bg-accent text-accent-foreground">
                        Headquarters
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {office.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {office.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {office.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
