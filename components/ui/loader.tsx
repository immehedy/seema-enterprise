import { cn } from "@/lib/utils";

const INK_DOTS = [
  { color: "#00AEEF", delay: "0ms" }, // Cyan
  { color: "#EC008C", delay: "160ms" }, // Magenta
  { color: "#FFB300", delay: "320ms" }, // Amber (deep yellow for visibility)
];

function Loader({
  className,
  label = "Loading...",
  size = 14,
}: {
  className?: string;
  label?: string;
  size?: number;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-20 text-center",
        className
      )}
    >
      <div className="flex items-end gap-2" aria-hidden="true">
        {INK_DOTS.map((dot, i) => (
          <span
            key={i}
            className="animate-bounce rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: dot.color,
              animationDelay: dot.delay,
              boxShadow: `0 0 0 2px rgba(255,255,255,0.4), 0 4px 10px -2px ${dot.color}99`,
            }}
          />
        ))}
      </div>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Loader };
