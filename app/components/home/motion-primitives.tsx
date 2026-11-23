"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { usePrefersReducedMotion as useReducedMotion } from "@/app/lib/use-prefers-reduced-motion";
import { useEffect, useRef, useState } from "react";

import { INSURANCE } from "@/app/lib/home-content";

/* -------------------------------------------------------------------------- */
/* Easing / variants                                                          */
/* -------------------------------------------------------------------------- */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/* -------------------------------------------------------------------------- */
/* <Reveal />, inView fade-up with blur                                       */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span" | "li";
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const M = motion[Tag] as typeof motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </M>
  );
}

/* -------------------------------------------------------------------------- */
/* <Stagger />, inView stagger container                                     */
/* -------------------------------------------------------------------------- */

export function Stagger({
  children,
  className,
  gap = 0.08,
  delayChildren = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: gap, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* <MagneticButton />, pointer-following micro-interaction                    */
/* -------------------------------------------------------------------------- */

export function MagneticButton({
  children,
  className,
  strength = 22,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 20 });
  const y = useSpring(my, { stiffness: 260, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    mx.set(dx * strength);
    my.set(dy * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/* <CountUp />, inView spring counter                                        */
/* -------------------------------------------------------------------------- */

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Spotlight follower for a container (mouse-tracked radial glow)              */
/* -------------------------------------------------------------------------- */

export function useSpotlight(container: React.RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 260, damping: 30, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 260, damping: 30, mass: 0.35 });

  useEffect(() => {
    const el = container.current;
    if (!el || reduce) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    const leave = () => {
      mx.set(-9999);
      my.set(-9999);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [container, mx, my, reduce]);

  return { sx, sy, reduce };
}

/* -------------------------------------------------------------------------- */
/* Parallax float, subtle scroll-linked y-shift for hero visuals              */
/* -------------------------------------------------------------------------- */

export function useParallaxY(ref: React.RefObject<HTMLElement | null>, distance = 40) {
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (top offscreen) to 1 (bottom offscreen)
      const progress = 1 - (r.top + r.height / 2) / vh;
      y.set(progress * distance);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, distance, reduce, y]);
  return y;
}

/* -------------------------------------------------------------------------- */
/* Marquee, infinite horizontal scroll (for insurance logos)                  */
/* -------------------------------------------------------------------------- */

export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  className,
  reverse = false,
}: {
  children: React.ReactNode;
  speed?: number; // seconds per loop
  pauseOnHover?: boolean;
  className?: string;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  const xKeyframes = reverse ? ["-100%", "0%"] : ["0%", "-100%"];
  return (
    <div
      className={`group relative flex overflow-hidden ${className ?? ""}`}
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      <motion.div
        className={`flex shrink-0 gap-6 pr-6 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        animate={reduce ? undefined : { x: xKeyframes }}
        transition={reduce ? undefined : { duration: speed, ease: "linear", repeat: Infinity }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="flex shrink-0 gap-6 pr-6"
        animate={reduce ? undefined : { x: xKeyframes }}
        transition={reduce ? undefined : { duration: speed, ease: "linear", repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Insurance logo row (used under the "Accepted Insurance Providers" copy)     */
/* -------------------------------------------------------------------------- */

export function InsuranceLogos() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {INSURANCE.carriers.map((c) => (
        <Image
          key={c.name}
          src={c.logo}
          alt={c.name}
          width={220}
          height={100}
          className="h-14 w-auto object-contain opacity-80 transition-opacity hover:opacity-100 sm:h-16"
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Utility: transform helper (re-exported for section files)                   */
/* -------------------------------------------------------------------------- */

export { useTransform };
