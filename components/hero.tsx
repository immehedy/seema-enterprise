import ImageCarousel from "./ImageCarousel";

export default function HeroSection() {
  const slides = [
    {
      image: "/banner1.png",
      mobileImage: "/mobile-banner.png",
      alt: "Heildelberg CD 102-4LX",
    },
    {
      image: "/seema-hero.jpg",
      alt: "KOMFI Building exterior",
    },
  ];

  return (
    <section className="relative mb-6">
      <ImageCarousel slides={slides}></ImageCarousel>
    </section>
  );
}
