"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, LayoutDashboard, UsersRound, Settings, ChevronRight, ShoppingBag } from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "../nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  if (!isClient) {
    return null;  
  }

  return (
    <div className={cn("relative min-w-[200px] border-r px-3  pb-10 pt-14 ",isCollapsed&&"min-w-fit")}>
        <h2 className="text-center font-bold text-xl mb-5">Et-market</h2>
        <div className="h-0 border "></div>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
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
            variant: "default"
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
