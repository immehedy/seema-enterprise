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
    {
      image: "/banner3.png",
      mobileImage: "/mobile-banner-2.png",
      alt: "Heidelberg CD 74-5+L-F",
    },
    {
      image: "/banner4.png",
      mobileImage: "/mobile-banner-3.png",
      alt: "Heidelberg CD 74-6LX",
    },
  ];

  return (
    <section className="relative mb-6">
      <ImageCarousel slides={slides}></ImageCarousel>
    </section>
  );
}
