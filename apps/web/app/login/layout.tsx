import { ThemeProvider } from "app/components/theme-provider";

export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <body>
          <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
            {children}
          </ThemeProvider>
        </body>
    );
  }
  