import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
    >
      <g fill="currentColor">
        <path d="M20,20 L20,80 L40,80 L40,40 L60,40 L60,20 L20,20 Z" />
        <path d="M80,20 C60,20 60,50 80,50 C100,50 100,20 80,20 Z M80,40 C70,40 70,30 80,30 C90,30 90,40 80,40 Z" />
        <path d="M80,60 C60,60 60,90 80,90 C100,90 100,60 80,60 Z M80,80 C70,80 70,70 80,70 C90,70 90,80 80,80 Z" />
      </g>
    </svg>
  );
}
