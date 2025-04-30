import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const sidebarVariants = cva(
  "relative flex flex-col h-full bg-background border-r transition-all duration-300 ease-in-out",
  {
    variants: {
      size: {
        sm: "w-16",
        default: "w-64",
        lg: "w-80",
      },
      collapsed: {
        true: "w-16",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      collapsed: false,
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      size,
      collapsed: controlledCollapsed,
      collapsible = false,
      defaultCollapsed = false,
      onCollapsedChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState<boolean>(
      defaultCollapsed
    )

    const collapsed = controlledCollapsed ?? internalCollapsed

    const handleToggle = () => {
      const newCollapsed = !collapsed
      setInternalCollapsed(newCollapsed)
      onCollapsedChange?.(newCollapsed)
    }

    return (
      <div
        ref={ref}
        className={cn(
          sidebarVariants({ size, collapsed, className })
        )}
        {...props}
      >
        {children}
        {collapsible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
            onClick={handleToggle}
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
            <span className="sr-only">
              {collapsed ? "Expand sidebar" : "Collapse sidebar"}
            </span>
          </Button>
        )}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto p-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean
    icon?: React.ReactNode
    collapsed?: boolean
  }
>(({ className, active, icon, collapsed, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
      active
        ? "bg-accent text-accent-foreground"
        : "hover:bg-accent hover:text-accent-foreground",
      collapsed && "justify-center px-0",
      className
    )}
    {...props}
  >
    {icon && (
      <span className={cn("h-5 w-5", collapsed ? "h-5 w-5" : "h-4 w-4")}>
        {icon}
      </span>
    )}
    {!collapsed && children}
  </a>
))
SidebarNavItem.displayName = "SidebarNavItem"

const SidebarSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string
    collapsed?: boolean
  }
>(({ className, title, collapsed, children, ...props }, ref) => (
  <div ref={ref} className={cn("py-2", className)} {...props}>
    {title && !collapsed && (
      <h3 className="mb-2 px-3 text-xs font-medium text-muted-foreground">
        {title}
      </h3>
    )}
    {title && collapsed && <Separator className="mb-2 mt-2" />}
    {children}
  </div>
))
SidebarSection.displayName = "SidebarSection"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarSection,
}
