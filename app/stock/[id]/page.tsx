"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getMachineBySlug, richTextToPlainText, getImageUrl } from "@/lib/contentful";
import type { MachineEntry } from "@/types/contentful";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const machineSlug = params.id as string;

  console.log("slug", machineSlug)
  
  const [machine, setMachine] = useState<MachineEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    async function fetchMachine() {
      if (!machineSlug) {
        setError("No machine slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const machineData = await getMachineBySlug(machineSlug);
        
        if (machineData) {
          setMachine(machineData);
        } else {
          setError("Machine not found");
        }
      } catch (err) {
        console.error("Error fetching machine:", err);
        setError("Failed to load machine data");
      } finally {
        setLoading(false);
      }
    }

    fetchMachine();
  }, [machineSlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Loading Machine Details...</h1>
            <p className="text-muted-foreground">
              Please wait while we fetch the machine information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !machine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {error || "Machine Not Found"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error === "Machine not found"
                ? "The requested machine could not be found."
                : "There was an error loading the machine data. Please try again later."}
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

  const images = machine.fields.images?.map(getImageUrl) || ['/placeholder.svg'];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEnquirySubmitting(true);
    
    try {
      const enquiryData = {
        ...enquiryForm,
        machine: machine.fields.name,
        machineId: machine.sys.id,
        machineSlug: machine.fields.slug,
        timestamp: new Date().toISOString(),
      };
      
      console.log("Enquiry submitted:", enquiryData);
      
      // Here you would typically send the data to your backend API
      // Example:
      // const response = await fetch('/api/enquiry', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(enquiryData)
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit enquiry');
      // }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEnquiryOpen(false);
      
      // Reset form
      setEnquiryForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      
      // You could show a success toast here
      alert('Enquiry sent successfully! We will contact you soon.');
      
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to send enquiry. Please try again.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: machine.fields.name,
      text: `Check out this ${machine.fields.category}: ${machine.fields.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  const handlePhoneCall = () => {
    if (machine.fields.seller?.contact) {
      window.location.href = `tel:${machine.fields.seller.contact}`;
    }
  };

  const specifications = machine.fields.specifications || {};
  const technicalDetails = machine.fields.technicalDetails || {};
  const features = machine.fields.features || [];
  const advantages = machine.fields.advantages || [];
  const description = machine.fields.description 
    ? richTextToPlainText(machine.fields.description)
    : "No description available for this machine.";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/stock" className="hover:text-primary">
          Stock
        </Link>
        <span>/</span>
        <span className="text-foreground">{machine.fields.name}</span>
      </nav>

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
                  src={images[currentImageIndex]}
                  alt={`${machine.fields.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                      aria-label="Previous image">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                      aria-label="Next image">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Expand Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4"
                      aria-label="View full size image">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${machine.fields.name} - Full Size`}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-accent"
                            : "border-border"
                        }`}
                        aria-label={`View image ${index + 1}`}>
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
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
                    {machine.fields.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {machine.fields.category}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => {/* Add to favorites functionality */}}
                    aria-label="Add to favorites">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={handleShare}
                    aria-label="Share machine">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {machine.fields.isFeatured && (
                  <Badge className="bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
                {machine.fields.year && (
                  <Badge variant="outline">{machine.fields.year}</Badge>
                )}
                {machine.fields.condition && (
                  <Badge variant="secondary">{machine.fields.condition}</Badge>
                )}
                {machine.fields.isAvailable ? (
                  <Badge className="bg-green-500 text-white">Available</Badge>
                ) : (
                  <Badge variant="destructive">Sold</Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">
                  {formatPrice(machine.fields.price)}
                </div>
                {machine.fields.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{machine.fields.location}</span>
                  </div>
                )}
              </div>

              <Separator />

              {features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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
                  <Button className="w-full" size="lg" disabled={!machine.fields.isAvailable}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Enquiry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Send Enquiry</DialogTitle>
                    <DialogDescription>
                      Get in touch with us about {machine.fields.name}. We'll respond within 24 hours.
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
                        disabled={enquirySubmitting}
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
                        disabled={enquirySubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={enquiryForm.phone}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            phone: e.target.value,
                          })
                        }
                        disabled={enquirySubmitting}
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
                        disabled={enquirySubmitting}
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
                        disabled={enquirySubmitting}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={enquirySubmitting}>
                      {enquirySubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Enquiry'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              {machine.fields.seller?.contact && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                  onClick={handlePhoneCall}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call: {machine.fields.seller.contact}
                </Button>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p>Response time: Within 24 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Specs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {machine.fields.brand && (
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <p className="font-medium">{machine.fields.brand}</p>
                  </div>
                )}
                {machine.fields.model && (
                  <div>
                    <span className="text-muted-foreground">Model:</span>
                    <p className="font-medium">{machine.fields.model}</p>
                  </div>
                )}
                {machine.fields.year && (
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <p className="font-medium">{machine.fields.year}</p>
                  </div>
                )}
                {machine.fields.condition && (
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <p className="font-medium">{machine.fields.condition}</p>
                  </div>
                )}
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
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {description}
                </div>
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
                {Object.keys(specifications).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No specifications available for this machine.
                  </p>
                )}
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
                {Object.keys(technicalDetails).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(technicalDetails).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:justify-between py-3 border-b">
                        <span className="font-medium mb-1 sm:mb-0">{key}:</span>
                        <span className="text-muted-foreground sm:text-right">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No technical details available for this machine.
                  </p>
                )}
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
                {advantages.length > 0 ? (
                  <ul className="space-y-3">
                    {advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No advantages listed for this machine.
                  </p>
                )}
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