import React from "react";
import { Calendar, Home, Inbox, Search, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Tipo para um item de menu
export type MenuItem = {
  title: string;
  url?: string;
  icon: React.ElementType;
  disabled?: boolean;
  onClick?: () => void;
};

// Tipo para um grupo de itens
export type SidebarGroupProps = {
  label: string;
  items: MenuItem[];
};

// Props para o componente completo
export interface AppSidebarProps {
  header?: React.ReactNode;
  groups?: SidebarGroupProps[];
  footerItems?: MenuItem[];
  className?: string;
  widthClassName?: string;
}

// Itens padrão se nenhum for passado
const defaultItems: MenuItem[] = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const defaultGroups: SidebarGroupProps[] = [
  { label: "Application", items: defaultItems },
];

const defaultFooter: MenuItem[] = [
  { title: "Logout", icon: LogOut, onClick: () => console.log("Logout clicked") },
];

export function AppSidebar({
  header,
  groups = defaultGroups,
  footerItems = defaultFooter,
  className = "",
  widthClassName = "w-64",
}: AppSidebarProps) {
  return (
    <Sidebar className={`${widthClassName} ${className}`}>
      <SidebarContent className="flex flex-col h-full justify-between">

        {/* Header */}
        {header && <div className="px-4 py-3 border-b">{header}</div>}

        {/* Menu groups */}
        <div className="overflow-y-auto flex-1 p-2">
          {groups.map(group => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        {item.url ? (
                          <a
                            href={item.url}
                            onClick={e => item.disabled && e.preventDefault()}
                            aria-disabled={item.disabled}
                            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                              item.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </a>
                        ) : (
                          <button
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </button>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        {/* Footer items */}
        {footerItems.length > 0 && (
          <div className="px-2 py-3 border-t">
            <SidebarMenu>
              {footerItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={item.onClick}
                      disabled={item.disabled}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}