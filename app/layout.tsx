import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "NoteHub", template: "%s | NoteHub" },
  description: "A simple, focused place to keep your notes organized.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <div className="app-shell">
            <Header />
            {children}
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
