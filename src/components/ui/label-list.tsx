import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export interface LabelProps {
  text: string
  color?: string
  onRemove?: () => void
  className?: string
}

export interface LabelListProps extends React.HTMLAttributes<HTMLDivElement> {
  labels: LabelProps[]
  onRemoveLabel?: (index: number) => void
  variant?: "default" | "outline" | "secondary" | "destructive"
  size?: "default" | "sm"
  maxLabels?: number
  showMoreText?: string
}

const Label = React.forwardRef<
  HTMLDivElement,
  LabelProps & { variant?: "default" | "outline" | "secondary" | "destructive", size?: "default" | "sm" }
>(({ text, color, onRemove, className, variant = "default", size = "default" }, ref) => {
  // Criamos um div com ref em vez de passar a ref para o Badge
  return (
    <div ref={ref}>
      <Badge
        variant={variant}
        className={cn(
          "inline-flex items-center gap-1",
          size === "sm" ? "text-xs px-2 py-0" : "text-sm",
          color && `bg-[${color}]`,
          className
        )}
      >
        {text}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className={cn("h-3 w-3", size === "sm" ? "h-2 w-2" : "h-3 w-3")} />
            <span className="sr-only">Remove {text}</span>
          </button>
        )}
      </Badge>
    </div>
  )
})
Label.displayName = "Label"

const LabelList = React.forwardRef<HTMLDivElement, LabelListProps>(
  ({
    labels,
    onRemoveLabel,
    className,
    variant = "default",
    size = "default",
    maxLabels,
    showMoreText = "mais",
    ...props
  }, ref) => {
    const [showAll, setShowAll] = React.useState(false)

    const displayedLabels = React.useMemo(() => {
      if (!maxLabels || showAll || labels.length <= maxLabels) {
        return labels
      }
      return labels.slice(0, maxLabels)
    }, [labels, maxLabels, showAll])

    const hasMore = maxLabels && labels.length > maxLabels && !showAll

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-1", className)}
        {...props}
      >
        {displayedLabels.map((label, index) => (
          <Label
            key={`${label.text}-${index}`}
            text={label.text}
            color={label.color}
            variant={variant}
            size={size}
            onRemove={onRemoveLabel ? () => onRemoveLabel(index) : undefined}
          />
        ))}

        {hasMore && (
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer hover:bg-muted",
              size === "sm" ? "text-xs px-2 py-0" : "text-sm"
            )}
            onClick={() => setShowAll(true)}
          >
            +{labels.length - maxLabels} {showMoreText}
          </Badge>
        )}
      </div>
    )
  }
)
LabelList.displayName = "LabelList"

export { Label, LabelList }
