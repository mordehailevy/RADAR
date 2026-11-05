import { interpolate, useCurrentFrame } from "remotion";
import { C, clamp, easeOut, mono } from "../theme";
import { Card, Counter, Kicker, Rise, Scene } from "../ui";

const FAMILIES: [string, number][] = [
  ["Technical analysis", 1.0],
  ["News sentiment", 1.0],
  ["Seasonality", 0.99],
  ["Macro link", 0.73],
  ["Fundamentals & consensus", 0.72],
  ["Money flow", 0.68],
  ["Trader positioning", 0.4],
  ["ML model", 0.21],
];

const SPECS = [
  ["Model", "Gradient boosting"],
  ["Retrained", "Every night"],
  ["Validation", "Walk-forward, 12 months unseen"],
];

export const Convergence = () => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [200, 290], [0, 0.96], { ...clamp, easing: easeOut });
  const R = 92;
  const circ = 2 * Math.PI * R;
  return (
    <Scene style={{ justifyContent: "center" }}>
      <Kicker>Machine learning + Convergence Index</Kicker>
      <div style={{ display: "flex", gap: 56, marginTop: 44 }}>
        <div style={{ width: 600, display: "flex", flexDirection: "column", gap: 22 }}>
          {SPECS.map(([k, v], i) => (
            <Rise key={k} delay={15 + i * 18}>
              <Card>
                <div style={{ fontSize: 26, color: C.muted }}>{k}</div>
                <div style={{ fontSize: 42, fontWeight: 600 }}>{v}</div>
              </Card>
            </Rise>
          ))}
        </div>
        <Rise delay={110} style={{ flex: 1 }}>
          <Card style={{ height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 18 }}>
              <svg width={210} height={210} viewBox="0 0 220 220">
                <circle cx={110} cy={110} r={R} fill="none" stroke="#ffffff14" strokeWidth={18} />
                <circle
                  cx={110}
                  cy={110}
                  r={R}
                  fill="none"
                  stroke={C.up}
                  strokeWidth={18}
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - ring)}
                  transform="rotate(-90 110 110)"
                />
                <text x={110} y={128} textAnchor="middle" fill={C.fg} fontSize={56} fontWeight={700} fontFamily="IBM Plex Sans">
                  {Math.round(ring * 100)}
                </text>
              </svg>
              <div>
                <div style={{ fontSize: 38, fontWeight: 600 }}>Chevron (CVX)</div>
                <div style={{ fontSize: 30, color: C.muted }}>
                  <Counter to={8} start={140} dur={140} /> of 8 analysis families agree
                </div>
              </div>
            </div>
            {FAMILIES.map(([name, v], i) => {
              const start = 130 + i * 14;
              const w = interpolate(frame, [start, start + 30], [0, v], { ...clamp, easing: easeOut });
              return (
                <div key={name} style={{ display: "grid", gridTemplateColumns: "470px 1fr 110px", gap: 22, alignItems: "center", fontSize: 29, margin: "11px 0", opacity: interpolate(frame, [start - 8, start], [0, 1], clamp) }}>
                  <span>{name}</span>
                  <div style={{ height: 16, background: "#ffffff12", borderRadius: 8, position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${w * 100}%`, background: C.up, borderRadius: 8, boxShadow: `0 0 18px ${C.up}66` }} />
                  </div>
                  <span style={{ fontFamily: mono, color: C.upSoft, textAlign: "right" }}>+{w.toFixed(2)}</span>
                </div>
              );
            })}
          </Card>
        </Rise>
      </div>
    </Scene>
  );
};
