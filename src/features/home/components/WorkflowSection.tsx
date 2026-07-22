"use client";

import {useEffect, useRef, useState} from "react";

import {AnimatePresence, motion} from "framer-motion";
import {
  Braces,
  CalendarCheck2,
  Code2,
  Component,
  FileText,
  Gauge,
  Layers3,
  ListTree,
  MessageSquare,
  PenTool,
  Presentation,
  Rocket,
  Search,
  TestTubeDiagonal
} from "lucide-react";
import {useTranslations} from "next-intl";

import {AnimatedSection} from "@/app/[locale]/(marketing)/_components/AnimatedSection";
import {Container} from "@/components/ui/Container";
import {cn} from "@/lib/utils";

const stepMeta = [
  {icon: Search, key: "discovery"},
  {icon: Layers3, key: "scope"},
  {icon: FileText, key: "planning"},
  {icon: PenTool, key: "design"},
  {icon: Code2, key: "build"},
  {icon: MessageSquare, key: "feedback"},
  {icon: Rocket, key: "launch"},
  {icon: Gauge, key: "growth"}
] as const;


const buildTrackMeta = [
  {icon: Component, key: "rightTechChoices"},
  {icon: ListTree, key: "featureBreakdown"},
  {icon: CalendarCheck2, key: "smartPlanning"},
  {icon: Code2, key: "focusedImplementation"},
  {icon: Gauge, key: "performanceFirst"},
  {icon: Braces, key: "codeQuality"},
  {icon: TestTubeDiagonal, key: "testingStability"},
  {icon: Presentation, key: "reviewDemo"}
] as const;

const buildStepIndex = stepMeta.findIndex(({key}) => key === "build");
const buildBranchCenter = `${((buildStepIndex + 0.5) / stepMeta.length) * 100}%`;

function StepperParticleStream({
  activeStep,
  stepCount
}: {
  activeStep: number;
  stepCount: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeStepRef = useRef(activeStep);
  const stepCountRef = useRef(stepCount);

  useEffect(() => {
    activeStepRef.current = activeStep;
    stepCountRef.current = stepCount;
  }, [activeStep, stepCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles = Array.from({length: 22}, () => ({
      lane: (Math.random() - 0.5) * 6,
      purple: Math.random() > 0.45,
      speed: 0.0016 + 0.0022 * Math.random(),
      t: Math.random()
    }));
    let frameId = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      const activeX = stepCountRef.current > 0
        ? ((activeStepRef.current + 0.5) / stepCountRef.current) * width
        : 0;

      for (const particle of particles) {
        particle.t += particle.speed;
        if (particle.t > 1) particle.t -= 1;

        const x = particle.t * width;
        const emphasis = 1 - Math.min(1, Math.abs(x - activeX) / 140);
        const opacity = 0.28 + 0.55 * emphasis;
        const radius = 1.4 + 1.8 * emphasis;

        context.beginPath();
        context.arc(x, height / 2 + particle.lane, radius, 0, Math.PI * 2);
        context.fillStyle = particle.purple
          ? `rgba(192, 132, 252, ${opacity * 0.8})`
          : `rgba(186, 230, 253, ${opacity})`;
        context.shadowBlur = 10 * emphasis;
        context.shadowColor = particle.purple
          ? "rgba(192, 132, 252, 0.55)"
          : "rgba(186, 230, 253, 0.65)";
        context.fill();
        context.shadowBlur = 0;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameId = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas aria-hidden="true" className="pointer-events-none h-full w-full" ref={canvasRef} />;
}

function getBuildTitleLines(
  key: (typeof buildTrackMeta)[number]["key"],
  title: string
) {
  if (key === "reviewDemo") {
    const lastSpace = title.lastIndexOf(" ");

    if (lastSpace === -1) return [title];

    return [title.slice(0, lastSpace), title.slice(lastSpace + 1)];
  }

  if (key === "smartPlanning" || key === "codeQuality") {
    const firstSpace = title.indexOf(" ");

    if (firstSpace === -1) return [title];

    return [title.slice(0, firstSpace), title.slice(firstSpace + 1)];
  }

  return [title];
}

export function WorkflowSection() {
  const t = useTranslations("Home.workflowSection");
  const [activeStep, setActiveStep] = useState(0);

  const steps = stepMeta.map(({icon, key}, index) => ({
    description: t(`steps.${key}.description`),
    focus: t(`steps.${key}.focus`),
    icon,
    index,
    key,
    outcome: t(`steps.${key}.outcome`),
    title: t(`steps.${key}.title`)
  }));

  const buildTrack = buildTrackMeta.map(({icon, key}) => {
    const title = t(`buildTrack.${key}.title`);

    return {
      description: t(`buildTrack.${key}.description`),
      icon,
      key,
      title,
      titleLines: getBuildTitleLines(key, title)
    };
  });

  const detailPanel = {
    focusLabel: t("detailPanel.focusLabel"),
    overviewLabel: t("detailPanel.overviewLabel"),
    outcomeLabel: t("detailPanel.outcomeLabel"),
    stepLabel: t("detailPanel.stepLabel")
  };

  const selectedStep = steps[activeStep];
  const SelectedIcon = selectedStep.icon;
  const progress = `${((activeStep + 0.5) / steps.length) * 100}%`;
  const isBuildStep = activeStep === buildStepIndex;

  return (
    <AnimatedSection className="relative overflow-hidden" id="workflow-section">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{scale: [1, 1.04, 0.97], x: [0, 20, -8], y: [0, -18, 10]}}
          className="absolute left-[-4rem] top-8 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"
          transition={{duration: 12, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}}
        />
        <motion.div
          animate={{scale: [1, 0.96, 1.05], x: [0, -18, 14], y: [0, 22, -10]}}
          className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl"
          transition={{duration: 14, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY}}
        />
      </div>

      <Container>
        <div className="relative">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{opacity: 0, y: 24}}
            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
            viewport={{amount: 0.35, once: true}}
            whileInView={{opacity: 1, y: 0}}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              {t("eyebrow")}
            </span>
            <h2 className="heading text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="subheading">{t("description")}</p>
          </motion.div>

          <div className="relative mt-12">
            <div className="relative py-5 sm:py-6">
              <div className="relative px-2 xl:px-4">
                <div className="absolute inset-x-0 top-7 h-px bg-white/10 sm:top-8">
                  <motion.div
                    animate={{width: progress}}
                    className="hidden h-full rounded-full bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.45)] lg:block"
                    transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                  />
                  <div className="pointer-events-none absolute inset-x-0 -top-[1.375rem] hidden h-7 overflow-hidden lg:block">
                    <StepperParticleStream activeStep={activeStep} stepCount={steps.length} />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 -top-[1.375rem] h-7 overflow-hidden sm:hidden">
                    <StepperParticleStream activeStep={Math.min(activeStep, 2)} stepCount={3} />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 -top-[1.375rem] hidden h-7 overflow-hidden sm:block lg:hidden">
                    <StepperParticleStream activeStep={Math.min(activeStep, 3)} stepCount={4} />
                  </div>
                </div>
                <div className="absolute inset-x-0 top-[12.25rem] h-px bg-white/10 sm:top-[12.5rem] lg:hidden">
                  <div className="pointer-events-none absolute inset-x-0 -top-[1.375rem] h-7 overflow-hidden sm:hidden">
                    <StepperParticleStream activeStep={Math.min(Math.max(activeStep - 3, 0), 2)} stepCount={3} />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 -top-[1.375rem] hidden h-7 overflow-hidden sm:block">
                    <StepperParticleStream activeStep={Math.min(Math.max(activeStep - 4, 0), 3)} stepCount={4} />
                  </div>
                </div>
                <div className="absolute inset-x-0 top-[22.75rem] h-px bg-white/10 sm:hidden">
                  <div className="pointer-events-none absolute inset-x-0 -top-[1.375rem] h-7 overflow-hidden">
                    <StepperParticleStream activeStep={Math.min(Math.max(activeStep - 6, 0), 1)} stepCount={2} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-8 lg:gap-y-0 xl:gap-x-4">
                  {steps.map((step, index) => {
                    const isActive = index === activeStep;
                    const Icon = step.icon;

                    return (
                      <motion.button
                        key={step.key}
                        className="group relative flex min-h-36 flex-col items-center pt-0 text-center outline-none lg:min-h-0"
                        onClick={() => setActiveStep(index)}
                        onFocus={() => setActiveStep(index)}
                        onMouseEnter={() => setActiveStep(index)}
                        type="button"
                        whileHover={{y: -2}}
                      >
                        <motion.span
                          animate={{
                            backgroundColor: isActive
                              ? "rgba(186, 230, 253, 0.14)"
                              : "rgba(11, 15, 25, 0.96)",
                            borderColor: isActive
                              ? "rgba(125, 211, 252, 0.42)"
                              : "rgba(255, 255, 255, 0.12)",
                            boxShadow: isActive
                              ? "0 14px 34px rgba(14, 116, 144, 0.24)"
                              : "0 8px 24px rgba(2, 6, 23, 0.14)",
                            scale: isActive ? 1.04 : 1
                          }}
                          className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-sm sm:h-[4.25rem] sm:w-[4.25rem]"
                          transition={{duration: 0.22, ease: [0.22, 1, 0.36, 1]}}
                        >
                          {isActive ? (
                            <>
                              <motion.span
                                animate={{opacity: [0, 0.52, 0], scale: [0.88, 1, 1.24]}}
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-[-0.3rem] rounded-[1.2rem] border border-sky-300/50"
                                transition={{duration: 2.4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, times: [0, 0.22, 1]}}
                              />
                              <motion.span
                                animate={{opacity: [0, 0.38, 0], scale: [0.9, 1.02, 1.3]}}
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-[-0.55rem] rounded-[1.4rem] border border-sky-200/35"
                                transition={{delay: 0.8, duration: 2.4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, times: [0, 0.22, 1]}}
                              />
                            </>
                          ) : null}
                          <Icon
                            className={cn("h-6 w-6 sm:h-7 sm:w-7", isActive ? "text-sky-100" : "text-slate-300")}
                            strokeWidth={1.85}
                          />
                        </motion.span>

                        <div className="mt-3 flex max-w-[9rem] flex-col items-center gap-1 px-1">
                          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-base font-medium leading-5 transition-colors duration-200",
                              isActive ? "text-white" : "text-slate-400"
                            )}
                          >
                            {step.title}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isBuildStep ? (
                <motion.div
                  animate={{height: "auto", opacity: 1, y: 0}}
                  className="relative mt-2 overflow-hidden"
                  exit={{height: 0, opacity: 0, y: -8}}
                  initial={{height: 0, opacity: 0, y: -8}}
                  transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                >
                  <div
                    className="pointer-events-none absolute top-0 hidden h-8 w-px -translate-x-1/2 bg-gradient-to-b from-sky-300/70 to-transparent lg:block"
                    style={{left: buildBranchCenter}}
                  />

                  <div>
                    <div className="pt-8">
                      <div className="relative px-2 xl:px-4">
                        <div className="absolute inset-x-0 top-7 h-px bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-300/70 via-cyan-200/50 to-white/15" />
                        </div>
                        <div className="absolute inset-x-0 top-[16.75rem] h-px bg-white/10 lg:hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-300/70 via-cyan-200/50 to-white/15" />
                        </div>
                        <div className="absolute inset-x-0 top-[32.5rem] h-px bg-white/10 sm:hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-300/70 via-cyan-200/50 to-white/15" />
                        </div>

                        <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-8 lg:gap-y-0 xl:gap-x-4">
                          {buildTrack.map((item) => {
                            const BranchIcon = item.icon;

                            return (
                              <div key={item.title} className="relative flex min-h-36 flex-col items-center text-center lg:min-h-0">
                                <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-[#0b0f19] text-sky-100">
                                  <BranchIcon className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <span className="h-6 w-px bg-gradient-to-b from-sky-300/70 to-transparent" />

                                <div className="flex min-h-[8.5rem] max-w-[10rem] flex-col gap-1.5 px-1">
                                  <p className="mx-auto min-h-[2.5rem] max-w-[6.5rem] text-sm font-medium leading-5 text-white">
                                  {item.titleLines.map((line, lineIndex) => (
                                    <span className="block" key={lineIndex}>
                                      {line}
                                    </span>
                                  ))}
                                </p>
                                  <p className="text-xs leading-5 text-slate-400">{item.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1120]/80 shadow-[0_18px_50px_rgba(2,6,23,0.2)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStep.key}
                  animate={{opacity: 1, y: 0}}
                  className="overflow-hidden"
                  exit={{opacity: 0, y: -10}}
                  initial={{opacity: 0, y: 10}}
                  transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-[0.9fr_1.25fr_0.9fr_0.9fr]">
                    <div className="flex items-start gap-3 p-4 sm:p-5">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/[0.08] text-sky-100">
                        <SelectedIcon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.85} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-300/75">
                          {detailPanel.stepLabel} {String(activeStep + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 text-sm font-medium leading-6 text-slate-200">
                          {selectedStep.title}
                        </h3>
                      </div>
                    </div>

                    <div className="border-t border-white/8 p-4 sm:border-l sm:border-t-0 sm:p-5">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {detailPanel.overviewLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {selectedStep.description}
                      </p>
                    </div>

                    <div className="border-t border-white/8 bg-white/[0.018] p-4 sm:p-5 lg:border-l lg:border-t-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {detailPanel.focusLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {selectedStep.focus}
                      </p>
                    </div>

                    <div className="border-t border-white/8 bg-emerald-300/[0.025] p-4 sm:border-l sm:p-5 lg:border-t-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-300/75">
                        {detailPanel.outcomeLabel}
                      </p>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-200">
                        {selectedStep.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

          </div>
        </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}













