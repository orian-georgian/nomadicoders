"use client";

import { useMemo, useState } from "react";

import { motion } from "framer-motion";

export type TimelinePoint = {
  year: number;
  experienceLevel: number;
  skillScore: number;
  label?: string;
  details?: string;
};

export type GrowthChartProps = {
  data: TimelinePoint[];
  title?: string;
  height?: number;
  theme?: "dark" | "light";
};

type CurvePoint = TimelinePoint & {
  x: number;
  y: number;
  score: number;
};

const viewBox = {
  height: 240,
  width: 900,
};

function clampScore(value: number) {
  return Math.min(100, Math.max(0, value));
}

function sortTimelineData(data: TimelinePoint[]) {
  return [...data]
    .filter((point) => Number.isFinite(point.year))
    .sort((first, second) => first.year - second.year)
    .map((point) => ({
      ...point,
      experienceLevel: clampScore(point.experienceLevel),
      skillScore: clampScore(point.skillScore),
    }));
}

function createCurvePath(points: CurvePoint[]) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    const point = points[0];

    return `M ${point.x} ${point.y} L ${point.x + 1} ${point.y}`;
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const controlDistance = (point.x - previous.x) * 0.5;

    return `${path} C ${previous.x + controlDistance} ${previous.y}, ${
      point.x - controlDistance
    } ${point.y}, ${point.x} ${point.y}`;
  }, "");
}

function createCurvePoints(data: TimelinePoint[]) {
  const sortedData = sortTimelineData(data);
  const totalPoints = Math.max(sortedData.length - 1, 1);
  const horizontalPadding = 0;
  const topPadding = 24;
  const bottomPadding = 38;
  const drawableHeight = viewBox.height - topPadding - bottomPadding;
  const drawableWidth = viewBox.width - horizontalPadding * 2;

  return sortedData.map((point, index) => {
    const progress = index / totalPoints;
    const baseScore = point.experienceLevel * 0.58 + point.skillScore * 0.42;
    const easedGrowth = 12 * Math.sin(progress * Math.PI - Math.PI * 0.18);
    const milestoneLift = index % 2 === 0 ? -8 : 7;
    const score = clampScore(Math.round(baseScore + easedGrowth));
    const yOffset =
      index === 0 || index === sortedData.length - 1 ? 0 : milestoneLift;
    const y = topPadding + (1 - score / 100) * drawableHeight + yOffset;

    return {
      ...point,
      score,
      x: horizontalPadding + progress * drawableWidth,
      y: Math.min(
        viewBox.height - bottomPadding,
        Math.max(topPadding, y),
      ),
    };
  });
}

function createMotionPath(points: CurvePoint[]) {
  if (points.length < 2) {
    return createCurvePath(points);
  }

  const curvedPoints = points.flatMap((point, index) => {
    const nextPoint = points[index + 1];

    if (!nextPoint) {
      return [point];
    }

    const progress = index / Math.max(points.length - 1, 1);
    const arcPoint: CurvePoint = {
      ...point,
      x: point.x + (nextPoint.x - point.x) * 0.48,
      y:
        (point.y + nextPoint.y) / 2 -
        (index % 2 === 0 ? 18 : 10) -
        Math.sin(progress * Math.PI) * 16,
    };

    return [point, arcPoint];
  });

  return createCurvePath(curvedPoints);
}

export function TeamMemberGrowthTimeline({
  data,
  title = "Growth Timeline",
  height = 280,
  theme = "dark",
}: GrowthChartProps) {
  const [activePoint, setActivePoint] = useState<CurvePoint | null>(null);
  const curvePoints = useMemo(() => createCurvePoints(data), [data]);
  const path = useMemo(() => createMotionPath(curvePoints), [curvePoints]);
  const isDark = theme === "dark";
  const toggleActivePoint = (point: CurvePoint) => {
    setActivePoint((current) => (current?.year === point.year ? null : point));
  };

  return (
    <section
      aria-labelledby="team-member-growth-timeline"
      className="relative isolate overflow-hidden py-4"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_42%,rgba(103,232,249,0.1),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(167,139,250,0.08),transparent_28%)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      <div className="max-w-3xl space-y-4">
        <h2
          className="heading text-3xl sm:text-4xl"
          id="team-member-growth-timeline"
        >
          {title}
        </h2>
        <p className="subheading">
          A simple view of professional growth across key roles, accumulated
          skills, and career milestones.
        </p>
      </div>

      <div className="relative mt-12" style={{ height }}>
        {curvePoints.length > 0 ? (
          <>
            <svg
              aria-label={`${title} milestones`}
              className="h-full w-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              viewBox={`-18 0 ${viewBox.width + 36} ${viewBox.height}`}
            >
              <defs>
                <linearGradient id="growthCurveGradient" x1="0" x2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient
                  id="growthPointGradient"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>

              <motion.path
                d={path}
                fill="none"
                initial={{ pathLength: 0 }}
                stroke="url(#growthCurveGradient)"
                strokeLinecap="round"
                strokeWidth="4"
                transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.45 }}
                whileInView={{ pathLength: 1 }}
              />

              {curvePoints.map((point, index) => (
                <g
                  aria-label={`Show ${
                    point.label ?? "growth milestone"
                  } in ${point.year}`}
                  className="cursor-pointer outline-none"
                  key={`${point.year}-${point.label ?? index}`}
                  onClick={() => toggleActivePoint(point)}
                  onFocus={() => setActivePoint(point)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleActivePoint(point);
                    }
                  }}
                  onPointerEnter={() => setActivePoint(point)}
                  role="button"
                  tabIndex={0}
                >
                  <line
                    opacity="0.12"
                    stroke="white"
                    strokeDasharray="4 8"
                    x1={point.x}
                    x2={point.x}
                    y1={point.y + 14}
                    y2={viewBox.height - 34}
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    fill="transparent"
                    r="22"
                  />
                  <motion.circle
                    animate={
                      activePoint?.year === point.year
                        ? { opacity: 0.55, r: 16 }
                        : { opacity: 0.16, r: 11 }
                    }
                    cx={point.x}
                    cy={point.y}
                    fill="url(#growthPointGradient)"
                    transition={{ duration: 0.2 }}
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    fill="#0B0F19"
                    r="6"
                    stroke="url(#growthPointGradient)"
                    strokeWidth="3"
                  />
                  <text
                    fill={isDark ? "#94a3b8" : "#475569"}
                    fontSize="13"
                    textAnchor="middle"
                    x={point.x}
                    y={viewBox.height - 12}
                  >
                    {point.year}
                  </text>
                </g>
              ))}
            </svg>
          </>
        ) : (
          <div
            className={`flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-dashed px-6 text-center ${
              isDark
                ? "border-white/10 bg-white/[0.025] text-slate-400"
                : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            <p className="max-w-sm text-sm leading-6">
              Add timeline points to draw the growth curve.
            </p>
          </div>
        )}

        {activePoint ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            aria-live="polite"
            className="absolute left-0 right-3 top-0 z-20 rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-[0_18px_50px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:right-auto sm:max-w-sm"
            initial={{ opacity: 0, y: 8 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  {activePoint.year}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {activePoint.label ?? "Growth milestone"}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums text-cyan-100">
                {activePoint.score}/100
              </p>
            </div>
            {activePoint.details ? (
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {activePoint.details}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
