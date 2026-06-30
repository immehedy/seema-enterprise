import { User } from "lucide-react";

const teamGroups = [
  {
    group: "Leadership",
    members: [
      { name: "MD. Rafiqul Islam", role: "Chairman & CEO" },
    ],
  },
  {
    group: "Management",
    members: [
      { name: "Manager Name", role: "Manager" },
      { name: "Manager Name", role: "Manager" },
      { name: "Junior Manager Name", role: "Junior Manager" },
      { name: "Junior Manager Name", role: "Junior Manager" },
    ],
  },
  {
    group: "Operations",
    members: [
      { name: "Incharge Name", role: "Warehouse Incharge" },
      { name: "Technician Name", role: "Head Technician" },
      { name: "Technician Name", role: "Dedicated Technician" },
      { name: "Technician Name", role: "Dedicated Technician" },
    ],
  },
  {
    group: "Technical",
    members: [
      { name: "Engineer Name", role: "Mechanical Engineer" },
      { name: "Engineer Name", role: "Mechanical Engineer" },
    ],
  },
  {
    group: "Other Staff",
    members: [
      { name: "Staff Name", role: "Staff" },
      { name: "Staff Name", role: "Staff" },
      { name: "Staff Name", role: "Staff" },
    ],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 uppercase">
              Our Team
            </h2>
            <p className="text-muted-foreground text-sm">
              The people behind Seema Enterprise
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {teamGroups.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 border-b pb-2">
                {group.group}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {group.members.map((member, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center gap-3 p-4 border bg-background">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-base font-semibold text-muted-foreground">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm leading-snug">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
