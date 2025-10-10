// app/components/HeroSection.tsx (Server Component)
import { Search } from 'lucide-react';
import ImageCarousel from './ImageCarousel'; // The client component above

export default function HeroSection() {
  const slides = [
    {
      image: "/seema-hero.jpg",
      alt: "KOMFI Building exterior"
    },
    {
      image: "/seema-hero.jpg",
      alt: "Printing machinery"
    },
    {
      image: "/seema-hero.jpg",
      alt: "Paper converting equipment"
    }
  ];

  return (
    <section className="bg-white mt-10 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <div className="">
              <h1 className="text-4xl font-bold leading-tight">
                Whatever you need...
                <br />
                <span className="block mt-1">We have it</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                For more than 50 years worldwide partner to the graphics industry
                for used printing and paper-converting equipment.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              <Search className="h-5 w-5" />
              Search what you need
            </button>
          </div>

          {/* Right Side - Carousel */}
          <ImageCarousel slides={slides} />
        </div>
      </div>
    </section>
  );
}