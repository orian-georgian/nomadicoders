"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, LayoutPanelTop } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

import { RefactorExperience } from "./RefactorExperience";
import { UIFixExperience } from "./UIFixExperience";

type TransformationTab = "code" | "interface";

export function TransformationsSection() {
  const [activeTab, setActiveTab] = useState<TransformationTab>("code");
  const t = useTranslations("Home.transformations");

  const tabs = [
    { icon: Code2, id: "code" as const, label: t("tabs.code") },
    { icon: LayoutPanelTop, id: "interface" as const, label: t("tabs.interface") },
  ];

  return (
    <AnimatedSection className="relative overflow-hidden" id="transformations">
      <Container>
        <div
          aria-label={t("label")}
          className="mx-auto mb-8 flex w-fit rounded-2xl border border-white/10 bg-slate-950/70 p-1.5"
          role="tablist"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                aria-controls={`${tab.id}-transformation-panel`}
                aria-selected={isActive}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-300/70 sm:px-5",
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200",
                )}
                id={`${tab.id}-transformation-tab`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                type="button"
              >
                <Icon className="h-4 w-4" strokeWidth={1.9} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Container>

      <div
        aria-labelledby={`${activeTab}-transformation-tab`}
        className="mt-0"
        id={`${activeTab}-transformation-panel`}
        role="tabpanel"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 10 }}
            key={activeTab}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === "code" ? (
              <RefactorExperience embedded />
            ) : (
              <UIFixExperience embedded />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
