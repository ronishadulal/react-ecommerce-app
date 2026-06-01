import { AppSidebar } from "@/components/sidebar/page"
import { Menubar } from "@/components/ui/menubar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <nav className="border-b bg-white sticky top-0 z-50">
          <div className="flex items-center justify-between px-4 py-3">
            <SidebarTrigger />
            <Menubar />
          </div>
        </nav>
        <main className="flex-1 overflow-auto">
         {children}
        </main>
      </div>
    </SidebarProvider>
  )
}