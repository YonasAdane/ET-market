import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ReduxProvider} from "@repo/redux-utils/libs/provider";
import { ThemeProvider } from "@/widgets/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
            {children}
          </ThemeProvider> 
        </ReduxProvider>
      </body>
    </html>
  );
}
