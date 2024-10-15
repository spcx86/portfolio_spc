import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Subhaprada Chand  ",
  description:
    "Subhaprada Chand is an experienced software engineer on the lookout for my next challenge in the startup world.",
  openGraph: {
    title: "Subhaprada Chand",
    description:
      "Subhaprada Chand is an experienced software engineer on the lookout for my next challenge in the startup world.",
    siteName: "Subhaprada Chand",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shooooobh",
    creator: "@shooooobh",
  },
  metadataBase: new URL("https://subhapradachand.com"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
