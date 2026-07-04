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

const leaders = [
  {
    name: "Abdul Hannan Mridha",
    designation: "Chairman",
    image: "/team/chairman.jpg",
  },
  {
    name: "Tanvir Ahmed",
    designation: "CEO",
    image: "/team/ceo.jpg",
  },
];

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Mobile",
      details: ["+80 17 1187 1147"],
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
      city: "Headquarters & Showroom",
      address: "55/2, Farm'r Mor, Paradogair, Matuail, Jatrabari, Dhaka 1362",
      phone: "+880 19 0289 3205",
      email: "info@seemaenterprisebd.com",
      isHeadquarters: true,
    },
    {
      city: "Head Office",
      address: "23, 3H Distilary Rd, Dhaka 1204",
      phone: "+880 17 1101 6584",
      email: "info@seemaenterprisebd.com",
      isHeadquarters: false,
    },
  ];

  return (
    <div className="flex flex-col pt-10">
      {/* Map and Info */}
      <section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Google Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Location</CardTitle>
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

      {/* Leadership Section */}
      {/* <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-primary pl-4 mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
              Our Leadership
            </h2>
            <p className="text-muted-foreground text-sm">
              Meet the people leading Seema Enterprise
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-muted border">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/placeholder.svg";
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{leader.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {leader.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
