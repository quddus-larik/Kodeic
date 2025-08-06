"use client"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/toggles/mode-toggle"

type PageProps = {
  children: ReactNode
}

export function CoreUI({ children }: PageProps) {
  const pathname = usePathname()

  const segments = pathname
    .split("/")
    .filter(Boolean) // remove empty strings
    .map((segment) =>
      decodeURIComponent(segment.replace(/-/g, " "))
    )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-2">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-0">
            <SidebarTrigger className="ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => {
                  const href = "/" + segments.slice(0, index + 1).join("/").replace(/ /g, "-")
                  const isLast = index === segments.length - 1
                  return (
                    <div key={index} className="flex items-center">
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{segment}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{segment}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </div>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <ModeToggle className={"absolute top-3 right-3"} />
        <div className="flex flex-col gap-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
