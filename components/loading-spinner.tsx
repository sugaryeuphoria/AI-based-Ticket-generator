import { Loader2 } from "lucide-react"

export function LoadingSpinner({
  size = "default",
  text = "Loading...",
}: { size?: "sm" | "default" | "lg"; text?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-16 w-16",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full border-4 border-muted-foreground/20 ${size === "sm" ? "h-8 w-8" : size === "lg" ? "h-32 w-32" : "h-16 w-16"}`}
          ></div>
          <div
            className={`absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary ${size === "sm" ? "h-8 w-8" : size === "lg" ? "h-32 w-32" : "h-16 w-16"}`}
          ></div>
        </div>
        <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      </div>
      {text && <p className="text-sm text-muted-foreground mt-4">{text}</p>}
    </div>
  )
}
