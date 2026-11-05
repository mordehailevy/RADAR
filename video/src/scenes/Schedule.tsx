import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp, easeOut, mono } from "../theme";
import { Card, Counter, Kicker, Rise, Scene } from "../ui";

const EVENTS = [
  { t: "21:00", label: "Pre-report", at: 40 },
  { t: "21:15", label: "AI summary", at: 70 },
  { t: "23:45", label: "Official report", sub: "after Wall Street closes", at: 110 },
  { t: "23:55", label: "Orders for tomorrow", at: 150 },
];

export const Schedule = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineW = interpolate(frame, [25, 170], [0, 1], { ...clamp, easing: easeOut });
  const notif = spring({ frame: frame - 230, fps, config: { damping: 15 } });
  return (
    <Scene style={{ justifyContent: "center" }}>
      <Kicker>Fully automated · Israel time</Kicker>
      <div style={{ position: "relative", height: 300, marginTop: 50 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, height: 4, background: "#ffffff14", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 0, top: 40, height: 4, width: `${lineW * 100}%`, background: C.up, borderRadius: 2, boxShadow: `0 0 16px ${C.up}` }} />
        {EVENTS.map((e, i) => {
          const s = spring({ frame: frame - e.at, fps, config: { damping: 13 } });
          const left = `${6 + i * 29}%`;
          return (
            <div key={e.t} style={{ position: "absolute", left, top: 22, opacity: s, translate: `0px ${(1 - s) * 30}px` }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: C.bg, border: `4px solid ${C.up}`, boxShadow: `0 0 20px ${C.up}` }} />
              <div style={{ fontFamily: mono, fontSize: 70, color: C.upSoft, marginTop: 26 }}>{e.t}</div>
              <div style={{ fontSize: 32 }}>{e.label}</div>
              {e.sub && <div style={{ fontSize: 26, color: C.muted }}>{e.sub}</div>}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 30, marginTop: 70, alignItems: "stretch" }}>
        <Rise delay={190} style={{ flex: 1 }}>
          <Card style={{ height: "100%" }}>
            <div style={{ fontSize: 26, color: C.muted }}>Delivery</div>
            <div style={{ fontSize: 40, fontWeight: 600 }}>Private Next.js dashboard</div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 16,
                background: C.card2,
                border: `1px solid ${C.border}`,
                opacity: notif,
                translate: `0px ${(1 - notif) * -40}px`,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.up, display: "grid", placeItems: "center", color: C.bg, fontWeight: 700, fontSize: 24 }}>R</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600 }}>RADAR · official report ready</div>
                <div style={{ fontSize: 22, color: C.muted }}>53 buy ideas · 9 sell ideas · orders for tomorrow</div>
              </div>
            </div>
          </Card>
        </Rise>
        <Rise delay={290} style={{ flex: 1 }}>
          <Card style={{ height: "100%" }}>
            <div style={{ fontSize: 26, color: C.muted }}>Simulated portfolio on real prices</div>
            <div style={{ fontSize: 96, fontWeight: 700, color: C.up, fontVariantNumeric: "tabular-nums" }}>
              <Counter to={100000} start={300} dur={70} prefix="€" />
            </div>
            <div style={{ fontSize: 26, color: C.muted }}>orders fill only when the price is reached · fees and gaps included</div>
          </Card>
        </Rise>
      </div>
    </Scene>
  );
};
