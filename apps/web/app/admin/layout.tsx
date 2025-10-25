/** @format */
import { ThemeProvider } from "@/widgets/theme-provider";
import dynamic from "next/dynamic";

// Dynamically import SideNavbar to avoid SSR issues with usePathname
const SideNavbar = dynamic(() => import("@/widgets/adminComponents/SideNavbar"), {
  ssr: false,
  loading: () => (
    <div className="min-w-[200px] h-screen border-r px-3 pb-10 pt-14 animate-pulse">
      <div className="h-6 bg-muted rounded mb-5 mx-4"></div>
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded mx-2"></div>
        ))}
      </div>
    </div>
  ),
});
export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
            <main className="min-h-screen w-full  flex">
              <aside className="sticky top-0 h-screen">
                <SideNavbar />
              </aside>
              <div className=" w-full">{children}</div>
            </main>
        </ThemeProvider>
    </>
  );
}
