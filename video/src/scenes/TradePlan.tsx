import { interpolate, useCurrentFrame } from "remotion";
import { CVX } from "../cvx";
import { C, clamp, easeOut, mono } from "../theme";
import { Card, Kicker, Rise, Scene } from "../ui";

const W = 1060;
const H = 600;
const LEVELS = [
  { key: "T2", v: 285.01, color: C.upSoft, label: "Target 2 · 285.01", at: 230, dash: true },
  { key: "T1", v: 260.97, color: C.upSoft, label: "Target 1 · 260.97", at: 200, dash: true },
  { key: "IN", v: 236.94, color: C.fg, label: "Entry · 236.94", at: 140, dash: false },
  { key: "SL", v: 220.91, color: C.down, label: "Stop · 220.91", at: 170, dash: true },
];

export const TradePlan = () => {
  const frame = useCurrentFrame();
  const candles = CVX.candles;
  const lo = Math.min(...candles.map((c) => c.l)) - 4;
  const hi = 289;
  const y = (v: number) => 20 + ((hi - v) / (hi - lo)) * (H - 40);
  const step = (W - 190) / candles.length;
  const bw = step * 0.6;
  const shown = interpolate(frame, [20, 120], [0, candles.length], clamp);

  return (
    <Scene style={{ justifyContent: "center" }}>
      <Kicker>Every idea becomes a precise plan</Kicker>
      <div style={{ fontSize: 66, fontWeight: 700, margin: "14px 0 30px", opacity: interpolate(frame, [6, 22], [0, 1], clamp) }}>
        Chevron (CVX) · <span style={{ color: C.up }}>buy</span>
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        <Card style={{ padding: 20 }}>
          <svg width={W} height={H}>
            {CVX.zones.map(([a, b], i) => (
              <rect
                key={i}
                x={0}
                y={y(b)}
                width={(W - 190) * interpolate(frame, [110 + i * 4, 140 + i * 4], [0, 1], { ...clamp, easing: easeOut })}
                height={Math.max(3, y(a) - y(b))}
                fill={C.blue}
                fillOpacity={0.14}
              />
            ))}
            {candles.map((k, i) => {
              const vis = interpolate(shown, [i, i + 1], [0, 1], clamp);
              if (vis <= 0) return null;
              const x = i * step + step / 2;
              const up = k.c >= k.o;
              const col = up ? C.up : C.down;
              return (
                <g key={i} opacity={vis}>
                  <line x1={x} x2={x} y1={y(k.h)} y2={y(k.l)} stroke={col} strokeWidth={1.5} />
                  <rect x={x - bw / 2} y={y(Math.max(k.o, k.c))} width={bw} height={Math.max(2, Math.abs(y(k.o) - y(k.c)))} fill={col} />
                </g>
              );
            })}
            {LEVELS.map((l) => {
              const p = interpolate(frame, [l.at, l.at + 25], [0, 1], { ...clamp, easing: easeOut });
              return (
                <g key={l.key} opacity={p}>
                  <line x1={0} x2={(W - 190) * p} y1={y(l.v)} y2={y(l.v)} stroke={l.color} strokeWidth={2.5} strokeDasharray={l.dash ? "10 8" : undefined} />
                  <text x={W - 182} y={y(l.v) + 9} fill={l.color} fontSize={24} fontFamily="IBM Plex Mono">
                    {l.key} {l.v.toFixed(0)}
                  </text>
                </g>
              );
            })}
          </svg>
        </Card>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { k: "Entry", v: "236.94", c: C.fg, d: 140, sub: "buy stop above today's high" },
            { k: "Stop", v: "220.91", c: C.down, d: 170, sub: "behind a real support zone" },
            { k: "Targets", v: "260.97 / 285.01", c: C.upSoft, d: 205, sub: "sell half at T1 · reward/risk 3.0" },
          ].map((r) => (
            <Rise key={r.k} delay={r.d}>
              <Card style={{ padding: "20px 28px" }}>
                <div style={{ fontSize: 24, color: C.muted }}>{r.k} · {r.sub}</div>
                <div style={{ fontSize: 44, fontFamily: mono, color: r.c }}>{r.v}</div>
              </Card>
            </Rise>
          ))}
          <Rise delay={265}>
            <Card style={{ padding: "20px 28px", borderColor: `${C.up}88`, boxShadow: `0 0 ${interpolate(frame % 50, [0, 25, 50], [10, 34, 10])}px ${C.up}44` }}>
              <div style={{ fontSize: 24, color: C.muted }}>Position size · 52 shares</div>
              <div style={{ fontSize: 44, fontWeight: 700, color: C.up }}>Risk 0.75% of capital</div>
            </Card>
          </Rise>
        </div>
      </div>
    </Scene>
  );
};
