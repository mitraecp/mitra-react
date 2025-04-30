import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  disabled?: boolean
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  emptyMessage = "No results found.",
  className,
  triggerClassName,
  contentClassName,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || "")

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      const newValue = currentValue === selectedValue ? "" : currentValue
      setSelectedValue(newValue)
      onValueChange?.(newValue)
      setOpen(false)
    },
    [selectedValue, onValueChange]
  )

  const selectedOption = options.find((option) => option.value === selectedValue)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            disabled && "opacity-50 cursor-not-allowed",
            triggerClassName
          )}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0", contentClassName)}
        align="start"
        sideOffset={5}
      >
        <Command className={className}>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
                disabled={option.disabled}
                className={option.disabled ? "opacity-50 cursor-not-allowed" : ""}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValue === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
