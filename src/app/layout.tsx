import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KickStarter",
  description: "Live around Ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&family=Dancing+Script:wght@400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Satisfy&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
