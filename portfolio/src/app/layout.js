import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Haris Ahmad",
  description: "A showcase of my work and skills.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "icon",
      url: "/favicon/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    { rel: "apple-touch-icon", url: "/favicon/apple-touch-icon.png" },
    {
      rel: "icon",
      url: "/favicon/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon/android-chrome-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
