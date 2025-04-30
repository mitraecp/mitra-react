import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode
  fallbackClassName?: string
}

const ImageRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
))
ImageRoot.displayName = "ImageRoot"

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, src, fallback, fallbackClassName, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const handleLoad = React.useCallback(() => {
      setIsLoaded(true)
    }, [])

    const handleError = React.useCallback(() => {
      setHasError(true)
    }, [])

    return (
      <>
        {(!isLoaded || hasError) && fallback && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-muted",
              fallbackClassName
            )}
          >
            {fallback}
          </div>
        )}
        <img
          ref={ref}
          className={cn(
            "h-auto w-full transition-opacity",
            isLoaded && !hasError ? "opacity-100" : "opacity-0",
            className
          )}
          alt={alt}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </>
    )
  }
)
Image.displayName = "Image"

const ImageFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-md bg-muted",
      className
    )}
    {...props}
  />
))
ImageFallback.displayName = "ImageFallback"

export { ImageRoot, Image, ImageFallback }
