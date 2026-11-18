"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [20, 0], opacity: [0.55, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function PhotoParallax({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  return (
    <div ref={ref} className={`photo-parallax ${className}`}>
      <motion.div className="parallax-inner" style={{ y: reduced ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}
export function HeroWords() {
  const reduced = useReducedMotion();
  return (
    <h1 className="hero-title" aria-label="Where Every Sport Belongs.">
      <span className="hero-title-line">
        <motion.span
          initial={false}
          animate={reduced ? undefined : { y: [35, 0], opacity: [0.2, 1] }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Where Every
        </motion.span>
      </span>
      <span className="hero-title-line">
        <motion.span
          initial={false}
          animate={reduced ? undefined : { y: [45, 0], opacity: [0.2, 1] }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Sport <em>Belongs.</em>
        </motion.span>
      </span>
    </h1>
  );
}
