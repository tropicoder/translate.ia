import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { getTitle } from "@/lib/utils";

const font = Lato({
  weight: ["400", "700", "900"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});
const title = getTitle();
const description = title + " conçu par tech.cg";
export const metadata: Metadata = {
  title,
  description,

  openGraph: {
    title,
    description,
    url: "https:/traducteur.tech.cg",
    images: [
      {
        url: "/screenshot.png",
        width: 800,
        height: 500,
        alt: title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@useDraft",
    images: ["/screenshot.png"],
  },
  metadataBase: new URL("https://traducteur.tech.cg"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
