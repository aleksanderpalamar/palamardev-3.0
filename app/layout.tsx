import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import NextAuthProvider from "@/provider/session-provider";
import { SocialLinks } from "@/components/social-links";

const poppinsFonts = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aleksander Palamar",
  description: "aleksanderpalamar.dev | Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-950 text-zinc-50 ${poppinsFonts.className} antialiased`}
      >
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <div className="container mx-auto px-4 py-8">
              <SocialLinks />
            </div>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}