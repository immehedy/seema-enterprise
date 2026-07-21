"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
  press: ["ONE COLOUR", "TWO COLOUR", "FOUR COLOUR +"],
  "press-one": ["ONE COLOUR"],
  "press-two": ["TWO COLOUR"],
  "press-four": ["FOUR COLOUR +"],
  "die-cutting": ["DIE CUTTING"],
  "paper-cutting": ["PAPER CUTTING"],
  "post-press": ["POST PRESS"],
};

// Map slug to display name
const SLUG_TO_DISPLAY_NAME: Record<string, string> = {
  press: "Printing Press - All Categories",
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
    if (!categories) return true;

    const machineCategoryName = machine.category?.fields?.name?.replace(
      /\s+/g,
      ""
    );
    return (
      machineCategoryName &&
      categories.some((cat) => cat.replace(/\s+/g, "") === machineCategoryName)
    );
  });

  const categoryDisplayName = slug
    ? SLUG_TO_DISPLAY_NAME[slug] || "Stock Catalogue"
    : "Stock Catalogue";

  // Check if current page is a press category
  const isPressCategory = [
    "press",
    "press-one",
    "press-two",
    "press-four",
  ].includes(slug);

  console.log({ machines, filteredMachines, slug });

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
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          {categoryDisplayName}
        </h1>
        <p className="text-xl text-muted-foreground">
          Browse our extensive collection of printing and paper-converting
          machinery
        </p>
      </div>

      {/* Search and Filters */}

      {/* Tabs for press categories */}
      {isPressCategory && (
        <div className="mb-6">
          <div className="flex gap-2 border-b">
            <Link href="/press">
              <Button
                variant={slug === "press" ? "default" : "ghost"}
                className="rounded-b-none">
                All
              </Button>
            </Link>
            <Link href="/press-one">
              <Button
                variant={slug === "press-one" ? "default" : "ghost"}
                className="rounded-b-none">
                ONE COLOUR
              </Button>
            </Link>
            <Link href="/press-two">
              <Button
                variant={slug === "press-two" ? "default" : "ghost"}
                className="rounded-b-none">
                TWO COLOUR
              </Button>
            </Link>
            <Link href="/press-four">
              <Button
                variant={slug === "press-four" ? "default" : "ghost"}
                className="rounded-b-none">
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


