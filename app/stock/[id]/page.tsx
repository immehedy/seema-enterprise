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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  getMachineBySlug,
  getImageUrl,
} from "@/lib/contentful";
import type { MachineEntry } from "@/types/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function ProductDetailPage() {
  const params = useParams();
  const machineSlug = params.id as string;

  const [machine, setMachine] = useState<MachineEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            <h1 className="text-2xl font-bold mb-4">
              Loading Machine Details...
            </h1>
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
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = machine.fields.images?.map(getImageUrl) || [
    "/placeholder.svg",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt={`${machine.fields.name} - Image ${
                    currentImageIndex + 1
                  }`}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-t-lg -mt-10"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
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
                  <DialogTitle></DialogTitle>
                  <DialogContent className="max-w-[98vw] w-auto h-auto max-h-[98vh] p-1">
                    <DialogTitle className="sr-only">
                      Full Size Image
                    </DialogTitle>
                    <img
                      src={images[currentImageIndex]}
                      alt={`${machine.fields.name} - Full Size`}
                      className="w-full h-full max-h-[95vh] object-contain"
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
                            e.currentTarget.src = "/placeholder.svg";
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

        {/* Product Info */}
        <div className="space-y-6">
          {/* Machine Name and Heart Icon */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold">
              {machine.fields.name}
            </h1>
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent"
              onClick={() => {
                /* Add to favorites functionality */
              }}
              aria-label="Add to favorites">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Specification Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Specification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Type */}
                {machine.fields.type && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Type</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.type}
                    </span>
                  </div>
                )}

                {/* Ref No */}
                {machine.fields.refNo && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Ref. No.</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.refNo}
                    </span>
                  </div>
                )}

                {/* Brand */}
                {machine.fields.brand && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Brand</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.brand}
                    </span>
                  </div>
                )}
                 {/* Series */}
                 {machine.fields.series && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Series</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.series}
                    </span>
                  </div>
                )}

                {/* Model */}
                {machine.fields.model && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Model</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.model}
                    </span>
                  </div>
                )}

                {/* Size */}
                {machine.fields.size && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Size</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.size}
                    </span>
                  </div>
                )}

                {/* Year */}
                {machine.fields.year && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Year</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.year}
                    </span>
                  </div>
                )}
                {/* Speed */}
                {machine.fields.speed && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Speed</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.speed}
                    </span>
                  </div>
                )}
                {/* Origin */}
                {machine.fields.origin && (
                  <div className="flex py-3 border-b">
                    <span className="font-medium w-32">Origin</span>
                    <span className="text-muted-foreground flex-1">
                      {machine.fields.origin}
                    </span>
                  </div>
                )}

                {/* Availability */}
                <div className="flex py-3">
                  <span className="font-medium w-32">Available</span>
                  <span className="flex-1">
                      {machine.fields.availableBy}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Specification Section */}
      {machine.fields.specification && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Technical Specification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:my-4
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:my-4
                  [&>p]:mb-4 [&>p]:leading-7
                  [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:text-foreground
                  [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:text-foreground
                  [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:text-foreground
                  [&>strong]:font-semibold [&>strong]:text-foreground
                  [&>li]:mb-1"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(machine.fields.specification),
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
