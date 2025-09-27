"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  MapPin,
  Settings,
  Zap,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data - in a real app, this would come from an API
const machineData = {
  1: {
    id: 1,
    name: "Heidelberg Speedmaster SM 74-4",
    brand: "Heidelberg",
    model: "SM 74-4",
    category: "Offset Printing Press",
    year: 2018,
    condition: "Excellent",
    price: 450000,
    location: "Mumbai, India",
    images: [
      "/heidelberg-offset-printing-press-machine-industria.jpg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    features: [
      "4-Color",
      "Auto Plate Loading",
      "CIP4 Compatible",
      "Perfecting",
      "Alcohol Dampening",
      "Remote Control",
    ],
    specifications: {
      "Max Sheet Size": "520 x 740 mm",
      "Min Sheet Size": "210 x 297 mm",
      "Max Speed": "15,000 sheets/hour",
      Colors: "4",
      "Plate Size": "530 x 750 mm",
      "Paper Weight": "40-400 gsm",
      "Power Consumption": "45 kW",
      "Machine Weight": "18,500 kg",
      "Installation Space": "12 x 8 x 3.5 m",
    },
    description:
      "This Heidelberg Speedmaster SM 74-4 is a premium 4-color offset printing press in excellent condition. Known for its reliability and print quality, this machine features automatic plate loading, CIP4 compatibility, and perfecting capabilities. Perfect for commercial printing operations requiring high-quality output and efficient production.",
    advantages: [
      "Exceptional print quality with consistent color reproduction",
      "High-speed production up to 15,000 sheets per hour",
      "Automatic plate loading reduces setup time",
      "CIP4 compatibility for seamless workflow integration",
      "Perfecting unit for double-sided printing",
      "Low maintenance requirements",
    ],
    technicalDetails: {
      "Printing Technology": "Offset Lithography",
      "Feeding System": "Stream feeder with pre-separation",
      "Dampening System": "Alcohol dampening with continuous circulation",
      "Inking System": "Film inking with ductor roller",
      Registration: "Automatic register adjustment",
      "Control System": "CP2000 Center console with touch screen",
    },
    isAvailable: true,
    isFeatured: true,
    seller: {
      name: "Seema Enterprise",
      contact: "+880 1711-871147",
      email: "info@seemaenterprise.com",
      location: "Mumbai, India",
    },
  },
  // Add more machines as needed
};

export default function ProductDetailPage() {
  const params = useParams();
  const machineId = Number.parseInt(params.id as string);
  const machine = machineData[machineId as keyof typeof machineData];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  if (!machine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Machine Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The requested machine could not be found.
            </p>
            <Button asChild>
              <Link href="/stock">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Stock
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % machine.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + machine.images.length) % machine.images.length
    );
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Enquiry submitted:", enquiryForm);
    setIsEnquiryOpen(false);
    // Reset form
    setEnquiryForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/stock" className="hover:text-primary">
          Stock
        </Link>
        <span>/</span>
        <span className="text-foreground">{machine.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="outline" className="mb-6 bg-transparent" asChild>
        <Link href="/stock">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stock
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={machine.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${machine.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-t-lg"
                />

                {/* Image Navigation */}
                {machine.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {machine.images.length}
                </div>

                {/* Expand Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <img
                      src={
                        machine.images[currentImageIndex] || "/placeholder.svg"
                      }
                      alt={`${machine.name} - Full Size`}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Thumbnail Gallery */}
              {machine.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {machine.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-accent"
                            : "border-border"
                        }`}>
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Product Info Sidebar */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {machine.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {machine.category}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {machine.isFeatured && (
                  <Badge className="bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline">{machine.year}</Badge>
                <Badge variant="secondary">{machine.condition}</Badge>
                {machine.isAvailable ? (
                  <Badge className="bg-green-500 text-white">Available</Badge>
                ) : (
                  <Badge variant="destructive">Sold</Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">
                  {formatPrice(machine.price)}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{machine.location}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold">Key Features</h4>
                <div className="flex flex-wrap gap-1">
                  {machine.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Interested in this machine?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={isEnquiryOpen} onOpenChange={setIsEnquiryOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Enquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Send Enquiry</DialogTitle>
                    <DialogDescription>
                      Get in touch with us about this machine. We'll respond
                      within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={enquiryForm.name}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={enquiryForm.email}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={enquiryForm.phone}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={enquiryForm.company}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            company: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        value={enquiryForm.message}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            message: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Enquiry
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Call: {machine.seller.contact}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Response time: Within 24 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Specs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Brand:</span>
                  <p className="font-medium">{machine.brand}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Model:</span>
                  <p className="font-medium">{machine.model}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <p className="font-medium">{machine.year}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Condition:</span>
                  <p className="font-medium">{machine.condition}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
            <TabsTrigger value="advantages">Advantages</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Machine Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {machine.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(machine.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Technical Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(machine.technicalDetails).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:justify-between py-3 border-b">
                        <span className="font-medium mb-1 sm:mb-0">{key}:</span>
                        <span className="text-muted-foreground sm:text-right">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advantages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Key Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {machine.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Machines */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Similar Machines</CardTitle>
            <CardDescription>
              You might also be interested in these machines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Related machines will be displayed here</p>
              <Button variant="outline" className="mt-4 bg-transparent" asChild>
                <Link href="/stock">Browse All Stock</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
