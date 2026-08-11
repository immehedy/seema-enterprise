"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Search, Grid, List, Eye } from "lucide-react";
import { contentfulClient } from "@/lib/contentful";
import Image from "next/image";
import { MachineCard } from "@/components/machine-card";

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

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = use(params);

  // The combined "All" press page has been removed; redirect old /press URL.
  if (slug === "press") {
    notFound();
  }

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
  const filteredMachines = machines
    .filter((machine) => {
      if (!slug) return true;

      const categories = SLUG_TO_CATEGORIES[slug];
      if (!categories) return true;

      const machineCategoryName = machine.category?.fields?.name?.replace(
        /\s+/g,
        ""
      );
      return (
        machineCategoryName &&
        categories.some(
          (cat) => cat.replace(/\s+/g, "") === machineCategoryName
        )
      );
    })
    .sort((a, b) => {
      // Available machines first, sold out last
      const aAvailable = a.isAvailable ? 0 : 1;
      const bAvailable = b.isAvailable ? 0 : 1;
      return aAvailable - bAvailable;
    });

  const categoryDisplayName = slug
    ? SLUG_TO_DISPLAY_NAME[slug] || "Stock Catalogue"
    : "Stock Catalogue";

  // Check if current page is a press category
  const isPressCategory = ["press-one", "press-two", "press-four"].includes(
    slug
  );

  if (loading) {
    return <Loader label="Loading machines from Contentful..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1
          className="text-3xl lg:text-4xl font-bold mb-2 uppercase tracking-wide"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
          {categoryDisplayName}
        </h1>
      </div>

      {/* Search and Filters */}

      {/* Tabs for press categories */}
      {isPressCategory && (
        <div className="mb-6 sticky top-16 z-30">
          <div
            className="flex flex-wrap gap-2 sm:flex-nowrap rounded-lg px-2 py-2 sm:py-1
                 bg-[#4043a6]/30 backdrop-blur-md backdrop-saturate-150
                 border border-white/20 shadow-lg shadow-black/5
                 text-white font-semibold">
            <Link href="/press-one" className="flex-1 min-w-[110px] sm:flex-none sm:min-w-0">
              <Button
                variant={slug === "press-one" ? "underline" : "ghost"}
                className={
                  "w-full justify-center sm:w-auto " +
                  (slug === "press-one"
                    ? "rounded-md bg-white/25 hover:bg-white/30"
                    : "rounded-md hover:bg-white/10")
                }>
                ONE COLOUR
              </Button>
            </Link>
            <Link href="/press-two" className="flex-1 min-w-[110px] sm:flex-none sm:min-w-0">
              <Button
                variant={slug === "press-two" ? "underline" : "ghost"}
                className={
                  "w-full justify-center sm:w-auto " +
                  (slug === "press-two"
                    ? "rounded-md bg-white/25 hover:bg-white/30"
                    : "rounded-md hover:bg-white/10")
                }>
                TWO COLOUR
              </Button>
            </Link>
            <Link href="/press-four" className="flex-1 min-w-[110px] sm:flex-none sm:min-w-0">
              <Button
                variant={slug === "press-four" ? "underline" : "ghost"}
                className={
                  "w-full justify-center sm:w-auto " +
                  (slug === "press-four"
                    ? "rounded-md bg-white/25 hover:bg-white/30"
                    : "rounded-md hover:bg-white/10")
                }>
                FOUR COLOUR +
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-muted-foreground">
            Showing {filteredMachines.length} of {machines.length} machines
          </p>
        </div>
      </div>

      {/* Results */}
      {filteredMachines.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No machine data found
              </h3>
              <p>There are currently no machines available in this category</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map((machine, idx) => (
            <MachineCard key={idx} machine={machine} />
          ))}
        </div>
      )}
    </div>
  );
}
