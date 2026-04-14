import type {ReactNode} from "react";

import {Footer} from "@/components/shared/Footer";
import {Navbar} from "@/components/shared/Navbar";

type LegalLayoutProps = {
  children: ReactNode;
};

export default function LegalLayout({children}: LegalLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
