"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size";
import { Award, ChevronRight, LayoutDashboard, Settings, ShoppingBag, ShoppingCart, Tag, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Nav } from "../nav";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    setIsClient(true);
  }, []);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  // Prevent rendering on server-side to avoid usePathname issues
  if (!isClient) {
    return (
      <div className="min-w-[200px] h-screen border-r px-3 pb-10 pt-14 animate-pulse">
        <div className="h-6 bg-muted rounded mb-5 mx-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded mx-2"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group h-screen relative min-w-[200px] border-r px-3  pb-10 pt-14 ",isCollapsed&&"min-w-fit")}>
        <h2 className="text-center font-bold text-xl mb-5">Et-market</h2>
        <div className="h-0 border "></div>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7 opacity-0 group-hover:opacity-100">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "ghost"
          },
          {
            title: "Users",
            href: "/admin/users",
            icon: UsersRound,
            variant: "ghost"
          },
          {
            title: "Products",
            href: "/admin/products",
            icon: ShoppingBag,
            variant: "ghost"
          },
          {
            title: "Brands",
            href: "/admin/brands",
            icon: Award,
            variant: "ghost"
          },
          {
            title: "Categories",
            href: "/admin/categories",
            icon:Tag,
            variant: "ghost"
          },

          {
            title: "Orders",
            href: "/admin/orders",
            icon: ShoppingCart,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}
