"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
  { title: "Orders", icon: ShoppingCart, url: "/admin/orders" },
  { title: "Products", icon: Package, url: "/admin/products" },
  { title: "Users", icon: Users, url: "/admin/users" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-white text-slate-900">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold tracking-wide">ShopSphere</h1>
        <p className="text-sm text-slate-500">Admin Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="rounded-lg transition-all duration-200 hover:bg-slate-100"
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 p-3 text-slate-900"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4 text-sm text-slate-500">
        © 2026 ShopSphere
      </SidebarFooter>
    </Sidebar>
  )
}