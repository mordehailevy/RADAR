import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp, easeOut, mono } from "../theme";
import { Card, Counter, Kicker, Rise, Scene } from "../ui";

const SAFEGUARDS = ["Manual kill switch", "Activity logs", "38 automated tests", "Secrets kept out of Git"];

export const Transparency = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // AUC gauge from 0.40 to 0.60, marker travels to 0.504
  const auc = interpolate(frame, [70, 140], [0.4, 0.504], { ...clamp, easing: easeOut });
  const pos = (auc - 0.4) / 0.2;
  return (
    <Scene style={{ justifyContent: "center" }}>
      <Kicker>Transparency &amp; safeguards</Kicker>
      <div style={{ fontSize: 76, fontWeight: 700, margin: "16px 0 36px", opacity: interpolate(frame, [6, 22], [0, 1], clamp) }}>
        The system <span style={{ color: C.up }}>grades itself</span> every night
      </div>
      <div style={{ display: "flex", gap: 30 }}>
        <Rise delay={40} style={{ flex: 1 }}>
          <Card>
            <div style={{ fontSize: 26, color: C.muted }}>ML model · walk-forward AUC</div>
            <div style={{ fontSize: 100, fontWeight: 700, color: C.warn, fontFamily: mono }}>{auc.toFixed(3)}</div>
            <div style={{ position: "relative", height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${C.down}66, #ffffff22 50%, ${C.up}66)`, margin: "14px 0 10px" }}>
              <div style={{ position: "absolute", left: "50%", top: -10, bottom: -10, width: 2, background: C.fg, opacity: 0.6 }} />
              <div style={{ position: "absolute", left: `${pos * 100}%`, top: -9, width: 32, height: 32, marginLeft: -16, borderRadius: 16, background: C.warn, boxShadow: `0 0 18px ${C.warn}` }} />
            </div>
            <div style={{ fontSize: 26, color: C.muted }}>0.50 = chance · no edge alone yet, so its weight is cut automatically</div>
          </Card>
        </Rise>
        <Rise delay={90} style={{ flex: 1 }}>
          <Card>
            <div style={{ fontSize: 26, color: C.muted }}>Rules backtest · 3 years</div>
            <div style={{ fontSize: 100, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
              <Counter to={1098} start={95} dur={60} />
              <span style={{ fontSize: 34, color: C.muted, fontWeight: 400 }}> trades</span>
            </div>
            <div style={{ fontSize: 28, color: C.muted, marginTop: 6 }}>
              profit factor <span style={{ color: C.fg }}>1.18</span> · max drawdown <span style={{ color: C.fg }}>−14.2%</span>
            </div>
          </Card>
        </Rise>
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 34, flexWrap: "wrap" }}>
        {SAFEGUARDS.map((s, i) => {
          const p = spring({ frame: frame - 190 - i * 14, fps, config: { damping: 14 } });
          const check = interpolate(frame, [200 + i * 14, 215 + i * 14], [0, 1], clamp);
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, padding: "16px 26px", borderRadius: 18, background: C.card, border: `1px solid ${C.border}`, opacity: p, scale: interpolate(p, [0, 1], [0.8, 1]) }}>
              <svg width={30} height={30} viewBox="0 0 24 24">
                <path d="M4 12.5 L10 18 L20 6" fill="none" stroke={C.up} strokeWidth={3} strokeLinecap="round" strokeDasharray={24} strokeDashoffset={24 * (1 - check)} />
              </svg>
              {s}
            </div>
          );
        })}
      </div>
    </Scene>
  );
};
