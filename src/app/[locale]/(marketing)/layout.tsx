import type {ReactNode} from "react";

import {Footer} from "@/components/shared/Footer";
import {Navbar} from "@/components/shared/Navbar";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({children}: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
