import type { Metadata } from "next";
import { Lato  } from "next/font/google";
import "./globals.css"; 
import { getTitle } from "@/lib/utils";

const font = Lato({
  weight: ["400", "700", "900"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});
 

export const metadata: Metadata = {
  title: getTitle(),
  description: "Conçu par tech.cg",
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
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
