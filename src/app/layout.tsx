import type {ReactNode} from "react";

import "@/styles/globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text">{children}</body>
    </html>
  );
}
