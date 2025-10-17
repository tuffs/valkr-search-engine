import Link from "next/link"
import { cn } from "@/lib/utils"

type TitleSize = "main" | "compact" | "stamp"

interface TitleProps {
  title?: string
  subtitle?: string
  size?: TitleSize
  colorOverride?: string
}

export default function Title({
  title = "Valkr",
  subtitle = "A Merit Based Search Engine",
  size = "main",
  colorOverride,
}: TitleProps) {
  const getDimmerColor = (color: string): string => {
    const match = color.match(/text-(\w+)-(\d+)/)
    if (!match) return color

    const [, colorName, brightness] = match
    const brightnessNum = Number.parseInt(brightness)
    const dimmerBrightness = Math.max(100, brightnessNum - 200)

    return `text-${colorName}-${dimmerBrightness}`
  }

  const subtitleColor = colorOverride ? getDimmerColor(colorOverride) : ""

  const titleClasses = {
    main: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    compact: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
    stamp: "text-2xl sm:text-3xl md:text-4xl",
  }

  const subtitleClasses = {
    main: "text-base sm:text-lg md:text-xl lg:text-2xl",
    compact: "text-sm sm:text-base md:text-lg",
    stamp: "hidden",
  }

  const containerPadding = {
    main: "px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12",
    compact: "px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8",
    stamp: "px-3 py-2 sm:px-4 sm:py-3",
  }

  return (
    <Link
      href="/"
      className={`
        block
        bg-inherit
        text-center
        mx-auto
        w-fit
        ${containerPadding[size]}
        transition-opacity
        duration-300
        ease-in-out
        hover:opacity-70
      `}
    >
      <h1
        className={cn(
          titleClasses[size],
          "font-black tracking-tighter leading-none m-0 p-0",
          colorOverride || "text-white",
        )}
      >
        {title}
      </h1>
      {size !== "stamp" && (
        <h3
          className={cn(
            subtitleClasses[size],
            "font-extralight tracking-normal leading-tight m-0 p-0 mt-0",
            subtitleColor || "text-gray-300",
          )}
        >
          {subtitle}
        </h3>
      )}
    </Link>
  )
}