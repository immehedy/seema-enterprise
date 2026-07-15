"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  Eye,
  Heart,
  Phone,
} from "lucide-react";
import { contentfulClient } from "@/lib/contentful";
import Image from "next/image";

// ----------- TypeScript interface for a Machine ----------
interface Machine {
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
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

export default function StockPage() {
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

  console.log({ machines });

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
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Stock Catalogue</h1>
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
            Showing {machines.length} of {machines.length} machines
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
      {machines.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No machines found</h3>
              <p>Try adjusting your search criteria or filters</p>
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
          {machines.map((machine, idx) => (
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
            <div className="relative w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={machine.name}
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-lg"
                style={{ objectFit: "cover" }}
              />
              {!machine.isAvailable && (
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-lg pointer-events-none">
                  <div className="absolute top-4 -right-5 w-28 bg-red-600/80 py-1 rotate-45 text-center">
                    <span className="text-white/90 text-[9px] font-bold tracking-widest uppercase">Sold Out</span>
                  </div>
                </div>
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
      <div className="relative overflow-hidden rounded-t-lg -mx-0 -mt-6">
        <Image
          src={imageUrl}
          alt={machine.name}
          width={800}
          height={192}
          className="w-full h-48 object-cover rounded-t-lg"
          style={{ objectFit: "cover" }}
        />
        {!machine.isAvailable && (
          <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden rounded-tr-lg pointer-events-none">
            <div className="absolute top-5 -right-6 w-36 bg-red-600/80 py-1.5 rotate-45 text-center">
              <span className="text-white/90 text-[10px] font-bold tracking-widest uppercase">Sold Out</span>
            </div>
          </div>
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
            <Link href={`/stock/${machine.slug}`} className="flex-1">
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent w-full">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
