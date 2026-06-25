import { Search } from "lucide-react";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

export default function HeroSection() {
  const slides = [
    {
      image: "/banner1.png",
      alt: "Heildelberg CD 102-4LX",
    },
    {
      image: "/seema-hero.jpg",
      alt: "KOMFI Building exterior",
    },
  ];

  return (
    <section className="relative mb-6">
      <ImageCarousel slides={slides}>
        {/* <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Whatever you need...
              <span className="block mt-2">We have it</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed drop-shadow">
              For more than 50 years worldwide partner to the graphics industry
              for used printing and paper-converting equipment.
            </p>
            <Link
              href="/press"
              className="inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl">
              <Search className="h-5 w-5" />
              Search what you need
            </Link>
          </div>
        </div> */}
      </ImageCarousel>
    </section>
  );
}
