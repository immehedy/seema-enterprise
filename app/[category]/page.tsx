"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
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
  Search,
  Grid,
  List,
  Eye,
} from "lucide-react";
import { contentfulClient } from "@/lib/contentful";
import Image from "next/image";

// ----------- TypeScript interface for a Machine ----------
interface Machine {
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: {
    fields: {
      name: string;
    };
  };
  year: number;
  condition: string;
  price: number;
  location: string;
  features: string[];
  specifications: Record<string, any>;
  isAvailable: boolean;
  isFeatured: boolean;
  images?: { url: string }[];
}

// Map slug to categories
const SLUG_TO_CATEGORIES: Record<string, string[]> = {
  "press-one": ["ONE COLOUR"],
  "press-two": ["TWO COLOUR"],
  "press-four": ["FOUR COLOUR +"],
  "die-cutting": ["DIE CUTTING"],
  "paper-cutting": ["PAPER CUTTING"],
  "post-press": ["POST PRESS"],
};

// Map slug to display name
const SLUG_TO_DISPLAY_NAME: Record<string, string> = {
  "press-one": "One Colour Press",
  "press-two": "Two Colour Press",
  "press-four": "Four Colour + Press",
  "die-cutting": "Die Cutting",
  "paper-cutting": "Paper Cutting",
  "post-press": "Post Press",
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);
  
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch machines from Contentful
  useEffect(() => {
    const fetchMachines = async () => {
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
          };
        }) as Machine[];

        setMachines(mapped);
      } catch (error) {
        console.error("Error fetching machines from Contentful:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  // Filter machines based on slug
  const filteredMachines = machines.filter((machine) => {
    if (!slug) return true;
    
    const categories = SLUG_TO_CATEGORIES[slug];
    console.log("categories", categories)
    if (!categories) return true;
    
    const machineCategoryName = machine.category?.fields?.name;
    console.log({machineCategoryName})
    return machineCategoryName && categories.includes(machineCategoryName);
  });

  const categoryDisplayName = slug ? SLUG_TO_DISPLAY_NAME[slug] || "Stock Catalogue" : "Stock Catalogue";

  console.log({machines, filteredMachines, slug});

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading machines from Contentful...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{categoryDisplayName}</h1>
        <p className="text-xl text-muted-foreground">
          Browse our extensive collection of printing and paper-converting
          machinery
        </p>
      </div>

      {/* Search and Filters */}

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Showing {filteredMachines.length} of {machines.length} machines
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none">
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredMachines.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No machine data found</h3>
              <p>There are currently no machines available in this category</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
          {filteredMachines.map((machine, idx) => (
            <MachineCard key={idx} machine={machine} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

// ------------- MachineCard -------------
function MachineCard({
  machine,
  viewMode,
}: {
  machine: Machine;
  viewMode: "grid" | "list";
}) {

  const imageUrl = machine.images?.[0]?.url || "/placeholder.jpg";

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-48 h-32 flex-shrink-0">
              <Image
                src={imageUrl}
                alt={machine.name}
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-lg -mt-6"
                style={{ objectFit: "cover" }}
              />
              {!machine.isAvailable && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Sold
                </Badge>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold hover:text-accent transition-colors">
                    <Link href={`/stock/${machine.slug}`}>{machine.name}</Link>
                  </h3>
                </div>
                
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/stock/${machine.slug}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={machine.name}
          width={800}
          height={192}
          className="w-full h-48 object-cover rounded-t-lg -mt-6"
          style={{ objectFit: "cover" }}
        />
        {!machine.isAvailable && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Sold
          </Badge>
        )}
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
              <Link href={`/stock/${machine.slug}`}>{machine.name}</Link>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/stock/${machine.slug}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}