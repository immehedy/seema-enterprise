import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const leadership = [
  {
    name: "Abdul Hannan Mridha",
    designation: "Chairman",
    image: "/placeholder.jpg",
    tier: "chairman",
  },
  {
    name: "Tanvir Ahmed",
    designation: "CEO",
    image: "/placeholder.jpg",
    tier: "ceo",
  },
];

const management = [
  {
    name: "Anonto Biswas",
    designation: "Service Manager",
    image: "/placeholder.jpg",
  },
  {
    name: "Moshiur Rahman",
    designation: "Warehouse In Charge",
    image: "/placeholder.jpg",
  },
  {
    name: "MD. Sohel",
    designation: "Sr. Manager (Accounts)",
    image: "/placeholder.jpg",
  },
  {
    name: "MD. Hafizur Rahman",
    designation: "Asst. Manager (Accounts)",
    image: "/placeholder.jpg",
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-muted/30 to-muted/60 py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            Our People
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Meet the <span className="text-accent">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            The dedicated professionals behind Seema Enterprise — driving
            excellence in every machine we source, sell, and support.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3">
              Leadership
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Executive Leadership
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-10 max-w-2xl mx-auto">
            {leadership.map((person) => (
              <div key={person.name} className="flex flex-col items-center flex-1">
                <div
                  className={`relative rounded-full overflow-hidden border-4 shadow-xl mb-5 ${
                    person.tier === "chairman"
                      ? "w-44 h-44 border-accent"
                      : "w-36 h-36 border-primary"
                  }`}
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className={`font-bold text-center ${
                    person.tier === "chairman" ? "text-2xl" : "text-xl"
                  }`}
                >
                  {person.name}
                </h3>
                <span
                  className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                    person.tier === "chairman"
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {person.designation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="border-t border-dashed" />
      </div>

      {/* Management Team */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3">
              Management
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Management Team
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-pretty">
              Our management team ensures smooth daily operations, quality
              service, and customer satisfaction across all departments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {management.map((person) => (
              <Card
                key={person.name}
                className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-square bg-muted">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="text-lg font-bold">{person.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-medium">
                    {person.designation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
