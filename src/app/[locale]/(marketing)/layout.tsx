import type {ReactNode} from "react";

import {Footer} from "@/components/shared/Footer";
import {Navbar} from "@/components/shared/Navbar";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({children}: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
