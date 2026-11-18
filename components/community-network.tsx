"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { BrandMark } from "./brand";
const paths = [
  "M74 144C145 20 372 45 438 174S316 466 172 426 5 268 74 144Z",
  "M47 335C-5 207 139 66 302 98S511 307 422 401 100 464 47 335Z",
  "M158 40C294-15 485 156 443 305S192 473 94 359 21 94 158 40Z",
  "M31 255C31 117 212 32 359 147S467 430 287 441 31 393 31 255Z",
  "M108 391C-14 292 174 126 322 152S491 307 383 376 207 472 108 391Z",
];
export function CommunityNetwork() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`community-network ${paused || reduced || !visible ? "network-paused" : ""}`}
    >
      <div className="network-art" aria-hidden="true">
        <div className="network-halo" />
        <svg viewBox="0 0 500 500" className="network-svg" fill="none">
          <defs>
            <linearGradient
              id="network-gradient"
              x1="20"
              y1="70"
              x2="460"
              y2="400"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF713D" stopOpacity=".15" />
              <stop offset=".5" stopColor="#FF9974" stopOpacity=".85" />
              <stop offset="1" stopColor="#919FD0" stopOpacity=".24" />
            </linearGradient>
          </defs>
          <g className="network-orbits">
            {paths.map((d, i) => (
              <path
                key={d}
                d={d}
                stroke="url(#network-gradient)"
                strokeWidth={i === 0 ? "1.4" : ".75"}
                className={`network-path path-${i}`}
              />
            ))}
            {paths.slice(0, 3).map((d, i) => (
              <path
                key={d}
                d={d}
                stroke={i === 1 ? "#b8c4ff" : "#ff9c77"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="3 1100"
                className={`network-traveler traveler-${i}`}
              />
            ))}
            {[
              [74, 144],
              [438, 174],
              [172, 426],
              [47, 335],
              [302, 98],
              [422, 401],
              [158, 40],
              [443, 305],
              [94, 359],
              [287, 441],
              [322, 152],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={i % 3 === 0 ? 6 : 3.5}
                  fill={i % 3 === 0 ? "#ff8859" : "#bdc9ed"}
                  className="network-node"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="11"
                  stroke="#ff9466"
                  strokeOpacity=".12"
                />
              </g>
            ))}
          </g>
          <circle
            cx="250"
            cy="250"
            r="84"
            stroke="#d5dfff"
            strokeOpacity=".06"
          />
          <circle
            cx="250"
            cy="250"
            r="104"
            stroke="#d5dfff"
            strokeOpacity=".04"
          />
        </svg>
        <div className="network-core">
          <BrandMark />
          <span>playtown</span>
        </div>
        <span className="network-label label-athletes">
          <i /> ATHLETES
        </span>
        <span className="network-label label-communities">
          <i /> COMMUNITIES
        </span>
        <span className="network-label label-opportunity">
          <i /> OPPORTUNITY
        </span>
        <span className="network-caption">
          DIFFERENT GAMES. SHARED POSSIBILITIES.
        </span>
      </div>
      <button
        className="network-toggle"
        onClick={() => setPaused(!paused)}
        aria-label={
          paused ? "Play community animation" : "Pause community animation"
        }
        aria-pressed={paused}
        disabled={Boolean(reduced)}
      >
        {paused || reduced ? <Play size={12} /> : <Pause size={12} />}
        <span>
          {reduced ? "Motion reduced" : paused ? "Play motion" : "Pause motion"}
        </span>
      </button>
    </div>
  );
}
