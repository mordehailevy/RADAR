import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp, easeOut, sans } from "./theme";

// Shared background: drifting grid, green halo, vignette
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.border}38 1px, transparent 1px), linear-gradient(90deg, ${C.border}38 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `${(frame * 0.35) % 80}px ${(frame * 0.35) % 80}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 90) * 6}% ${45 + Math.cos(frame / 110) * 5}%, ${C.up}22 0%, transparent 52%)`,
        }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, transparent 55%, ${C.bg} 100%)` }} />
    </AbsoluteFill>
  );
};

// Scene wrapper: soft fade + slight push-in at entry, fade + lift at exit
export const Scene: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        fontFamily: sans,
        color: C.fg,
        opacity: interpolate(frame, [0, 12, durationInFrames - 12, durationInFrames], [0, 1, 1, 0], clamp),
        scale: interpolate(frame, [0, durationInFrames], [1.025, 1], clamp),
        translate: interpolate(frame, [durationInFrames - 12, durationInFrames], ["0px 0px", "0px -30px"], clamp),
        padding: "100px 140px",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Element that rises and fades in after `delay` frames
export const Rise: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties; distance?: number }> = ({
  delay = 0,
  children,
  style,
  distance = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ opacity: p, translate: `0px ${(1 - p) * distance}px`, ...style }}>{children}</div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontSize: 28,
        fontWeight: 600,
        letterSpacing: interpolate(frame - delay, [0, 25], [16, 7], { ...clamp, easing: easeOut }),
        textTransform: "uppercase",
        color: C.up,
        opacity: interpolate(frame - delay, [0, 15], [0, 1], clamp),
      }}
    >
      {children}
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 24,
      padding: "28px 34px",
      ...style,
    }}
  >
    {children}
  </div>
);

// Counts a number up between two frames
export const Counter: React.FC<{ from?: number; to: number; start: number; dur: number; decimals?: number; prefix?: string; suffix?: string }> = ({
  from = 0,
  to,
  start,
  dur,
  decimals = 0,
  prefix = "",
  suffix = "",
}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [start, start + dur], [from, to], { ...clamp, easing: easeOut });
  return (
    <>
      {prefix}
      {v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </>
  );
};

// Animated radar: rotating sweep, rings, blips that flash when the sweep passes
export const RadarDish: React.FC<{ size: number; appear?: number }> = ({ size, appear = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const angle = (frame * 2.4) % 360;
  const blips = [
    { a: 38, r: 0.62 },
    { a: 150, r: 0.45 },
    { a: 230, r: 0.78 },
    { a: 300, r: 0.33 },
    { a: 95, r: 0.85 },
  ];
  const rings = [1, 0.66, 0.33];
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="sweep" cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={C.up} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.up} stopOpacity="0.05" />
        </radialGradient>
      </defs>
      {rings.map((r, i) => {
        const p = spring({ frame: frame - appear - i * 6, fps, config: { damping: 18 } });
        return <circle key={r} r={96 * r * p} fill="none" stroke={C.up} strokeOpacity={0.5 - i * 0.12} strokeWidth={0.8} />;
      })}
      <line x1={-96} x2={96} y1={0} y2={0} stroke={C.up} strokeOpacity={0.15} strokeWidth={0.5} />
      <line y1={-96} y2={96} x1={0} x2={0} stroke={C.up} strokeOpacity={0.15} strokeWidth={0.5} />
      <g style={{ rotate: `${angle}deg`, opacity: interpolate(frame - appear, [10, 25], [0, 1], clamp) }}>
        <path d="M0 0 L0 -96 A96 96 0 0 1 67.9 -67.9 Z" fill="url(#sweep)" />
      </g>
      {blips.map((b, i) => {
        const diff = (angle + 45 - b.a + 720) % 360; // degrees since the sweep's leading edge passed
        const glow = interpolate(diff, [0, 8, 140], [0.3, 1, 0.25], clamp);
        const x = Math.cos(((b.a - 90) * Math.PI) / 180) * 96 * b.r;
        const y = Math.sin(((b.a - 90) * Math.PI) / 180) * 96 * b.r;
        const show = interpolate(frame - appear, [20 + i * 5, 30 + i * 5], [0, 1], clamp);
        return <circle key={i} cx={x} cy={y} r={3.2} fill={C.upSoft} opacity={glow * show} />;
      })}
      <circle r={3} fill={C.upSoft} />
    </svg>
  );
};
