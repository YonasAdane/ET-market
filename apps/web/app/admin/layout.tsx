/** @format */
import SideNavbar from "@/widgets/adminComponents/SideNavbar";
import { ThemeProvider } from "@/widgets/theme-provider";
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
              <SideNavbar />
              <div className="p-8 w-full">{children}</div>
            </main>

        </ThemeProvider>
    </>
  );
}
