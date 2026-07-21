"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface Machine {
  name: string;
  slug: string;
  refNo?: string;
  brand?: string;
  series?: string;
  model?: string;
  size?: string;
  year?: string | number;
  speed?: string;
  origin?: string;
  availableBy?: string;
  isAvailable: boolean;
  isFeatured?: boolean;
  category?: { fields?: { name: string } };
  images?: { url: string }[];
}

interface InfoRow {
  label: string;
  value?: string | number;
}

const MAX_ROWS = 6; // fixed number of info rows shown per card

export function MachineCard({ machine }: { machine: Machine }) {
  const imageUrl = machine.images?.[0]?.url || "/placeholder.jpg";

  const rows: InfoRow[] = [
    { label: "Reference", value: machine.refNo },
    {
      label: "Model",
      value: [machine.brand, machine.model].filter(Boolean).join(" "),
    },
    { label: "Year", value: machine.year },
    { label: "Size", value: machine.size },
    { label: "Speed", value: machine.speed },
    { label: "Origin", value: machine.origin },
    { label: "Available from", value: machine.availableBy },
  ].filter((row) => row.value && row.value !== "");

  // Always render the same number of row slots so every card is the same height,
  // padding out with empty rows if a machine has fewer fields.
  const displayRows = [...rows.slice(0, MAX_ROWS)];
  while (displayRows.length < MAX_ROWS) {
    displayRows.push({ label: "", value: "" });
  }

  return (
    <div className="flex flex-col h-[620px] rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition-shadow bg-white">
      {/* Header - fixed height */}
      <div className="h-16 flex items-center bg-[#4043a6] px-5">
        <h3 className="text-white font-bold uppercase tracking-tight text-base leading-snug line-clamp-2">
          {machine.name}
        </h3>
      </div>

      {/* Image - fixed height */}
      <div className="relative w-full h-56 bg-muted shrink-0">
        <Image
          src={imageUrl}
          alt={machine.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {!machine.isAvailable && (
          <div className="absolute bottom-0 left-0">
            <span className="inline-block bg-orange-500 text-white text-sm font-bold tracking-wide uppercase px-6 py-2">
              Sold
            </span>
          </div>
        )}
      </div>

      {/* Info panel - fixed height, same row count every card */}
      <div className="bg-gray-100 px-5 py-4 h-[224px] overflow-hidden">
        <dl className="space-y-2">
          {displayRows.map((row, i) => (
            <div key={i} className="flex justify-between gap-4 text-sm h-5">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-semibold text-[#0a1f44] text-right truncate">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CTA - fixed height, pinned to bottom */}
      <div className="p-4 bg-white border-t mt-auto">
        <Button asChild variant="outline" className="w-full font-semibold">
          <Link href={`/stock/${machine.slug}`}>View details and video</Link>
        </Button>
      </div>
    </div>
  );
}
