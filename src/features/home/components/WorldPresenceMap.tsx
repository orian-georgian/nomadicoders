"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, MapPin as MapPinIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import worldGeography from "world-atlas/countries-110m.json";

import { cn } from "@/lib/utils";

type MapTab = "workedFrom" | "clientsFrom";

type MapPin = {
  coordinates: [longitude: number, latitude: number];
  key:
    | "argentina"
    | "belgium"
    | "china"
    | "egypt"
    | "france"
    | "germany"
    | "greece"
    | "indonesia"
    | "israel"
    | "italy"
    | "japan"
    | "malaysia"
    | "poland"
    | "romania"
    | "southKorea"
    | "spain"
    | "sweden"
    | "thailand"
    | "uae"
    | "uk"
    | "usa"
    | "vietnam";
};

// Add pins using real [longitude, latitude] coordinates.
const pinSets: Record<MapTab, MapPin[]> = {
  workedFrom: [
    { coordinates: [138.25, 36.2], key: "japan" },
    { coordinates: [127.77, 35.91], key: "southKorea" },
    { coordinates: [104.2, 35.86], key: "china" },
    { coordinates: [100.99, 15.87], key: "thailand" },
    { coordinates: [113.92, -0.79], key: "indonesia" },
    { coordinates: [108.28, 14.06], key: "vietnam" },
    { coordinates: [101.98, 4.21], key: "malaysia" },
    { coordinates: [24.97, 45.94], key: "romania" },
    { coordinates: [10.45, 51.17], key: "germany" },
    { coordinates: [-3.75, 40.46], key: "spain" },
    { coordinates: [12.57, 41.87], key: "italy" },
    { coordinates: [-3.44, 55.38], key: "uk" },
    { coordinates: [19.15, 51.92], key: "poland" },
    { coordinates: [53.85, 23.42], key: "uae" },
    { coordinates: [18.64, 60.13], key: "sweden" },
    { coordinates: [30.8, 26.82], key: "egypt" },
    { coordinates: [2.21, 46.23], key: "france" },
    { coordinates: [34.85, 31.05], key: "israel" },
    { coordinates: [21.82, 39.07], key: "greece" },
  ],
  clientsFrom: [
    { coordinates: [138.25, 36.2], key: "japan" },
    { coordinates: [-98.58, 39.83], key: "usa" },
    { coordinates: [10.45, 51.17], key: "germany" },
    { coordinates: [2.21, 46.23], key: "france" },
    { coordinates: [24.97, 45.94], key: "romania" },
    { coordinates: [4.47, 50.5], key: "belgium" },
    { coordinates: [-63.62, -38.42], key: "argentina" },
  ],
};

export function WorldPresenceMap() {
  const t = useTranslations("Home.worldMap");
  const reducedMotion = Boolean(useReducedMotion());
  const [activeTab, setActiveTab] = useState<MapTab>("workedFrom");
  const tabs = [
    {
      compactLabel: t("tabs.workedCompact"),
      icon: MapPinIcon,
      id: "workedFrom" as const,
      label: t("tabs.worked"),
    },
    {
      compactLabel: t("tabs.clientsCompact"),
      icon: Building2,
      id: "clientsFrom" as const,
      label: t("tabs.clients"),
    },
  ];

  return (
    <section
      aria-label={t("title")}
      className="relative w-full overflow-hidden bg-background"
    >
      <div
        aria-label={t("tabs.label")}
        className="relative z-20 mx-auto mb-6 mt-8 flex w-fit rounded-2xl border border-white/10 bg-slate-950/70 p-1.5 sm:mb-12 sm:mt-12"
        role="tablist"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              aria-controls="world-map-panel"
              aria-selected={isActive}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-300/70 sm:px-5",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200",
              )}
              id={`${tab.id}-map-tab`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              <Icon className="h-4 w-4" strokeWidth={1.9} />
              <span className="max-[479px]:hidden">{tab.label}</span>
              <span className="hidden max-[479px]:inline">{tab.compactLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="relative h-[25rem] w-full sm:h-[44rem]">
        <motion.div
          aria-labelledby={`${activeTab}-map-tab`}
          className="absolute inset-y-0 left-1/2 w-full max-w-[1400px] -translate-x-1/2"
          id="world-map-panel"
          initial={{ opacity: 0 }}
          role="tabpanel"
          transition={{ delay: 0.12, duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <ComposableMap
            className="h-full w-full"
            height={520}
            projection="geoEqualEarth"
            projectionConfig={{
              center: [0, 4],
              rotate: [-2, 0, 0],
              scale: 218,
            }}
            width={1200}
          >
            <defs>
              <filter height="180%" id="map-pin-glow" width="180%" x="-40%" y="-40%">
                <feGaussianBlur result="blur" stdDeviation="3" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <Geographies geography={worldGeography}>
              {({ geographies }) =>
                geographies.map((geography) => (
                  <Geography
                    geography={geography}
                    key={geography.rsmKey}
                    style={{
                      default: {
                        fill: "rgba(148, 163, 184, 0.12)",
                        outline: "none",
                        stroke: "rgba(148, 163, 184, 0.24)",
                        strokeWidth: 0.45,
                      },
                      hover: {
                        fill: "rgba(125, 211, 252, 0.16)",
                        outline: "none",
                        stroke: "rgba(125, 211, 252, 0.38)",
                        strokeWidth: 0.55,
                      },
                      pressed: {
                        fill: "rgba(125, 211, 252, 0.16)",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            <AnimatePresence initial={false} mode="wait">
            <motion.g
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={activeTab}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
            >
              {pinSets[activeTab].map((pin, index) => {
                const label = t(`locations.${pin.key}`);
                const labelWidth = Math.max(48, label.length * 6.5 + 18);

                return (
                  <Marker coordinates={pin.coordinates} key={pin.key}>
                    <motion.g
                      aria-label={label}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group cursor-default outline-none"
                      initial={{ opacity: 0, scale: 0.7 }}
                      role="img"
                      tabIndex={0}
                      transition={{ delay: index * 0.07, duration: reducedMotion ? 0 : 0.4 }}
                    >
                      {!reducedMotion ? (
                        <motion.circle
                          animate={{ opacity: [0.4, 0], r: [4, 11] }}
                          cx="0"
                          cy="0"
                          fill="none"
                          stroke={activeTab === "clientsFrom" ? "rgba(192,132,252,0.85)" : "rgba(125,211,252,0.8)"}
                          strokeWidth="1.2"
                          transition={{
                            delay: index * 0.16,
                            duration: 2.2,
                            ease: "easeOut",
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      ) : null}
                      <circle
                        cx="0"
                        cy="0"
                        fill={activeTab === "clientsFrom" ? "#c084fc" : "#7dd3fc"}
                        filter="url(#map-pin-glow)"
                        r="3"
                        stroke="#0b0f19"
                        strokeWidth="1.5"
                      />
                      <g
                        className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100"
                        transform="translate(0 12)"
                      >
                        <rect
                          fill="rgba(11,17,32,0.96)"
                          height="22"
                          rx="11"
                          stroke="rgba(255,255,255,0.12)"
                          width={labelWidth}
                          x={-labelWidth / 2}
                        />
                        <text
                          dominantBaseline="middle"
                          fill="#e2e8f0"
                          fontSize="10"
                          fontWeight="600"
                          textAnchor="middle"
                          x="0"
                          y="11.5"
                        >
                          {label}
                        </text>
                      </g>
                    </motion.g>
                  </Marker>
                );
              })}
            </motion.g>
            </AnimatePresence>
          </ComposableMap>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        />
      </div>
    </section>
  );
}
