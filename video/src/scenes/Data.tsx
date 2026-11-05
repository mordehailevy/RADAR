import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp, mono } from "../theme";
import { Counter, Kicker, Rise, Scene } from "../ui";

const CHIPS = [
  "S&P 500 stocks",
  "Nasdaq 100",
  "CAC 40",
  "Major indices",
  "16 commodity futures",
  "9 cryptocurrencies",
  "Rates",
  "Currencies",
  "Volatility",
  "G7 & China sector ETFs",
];

const TICKER = [
  ["CVX", "+1.4%"], ["XOM", "+1.1%"], ["BZ=F", "+0.9%"], ["^GSPC", "-0.4%"], ["BTC-USD", "+2.3%"],
  ["EURUSD", "-0.1%"], ["^FCHI", "+0.2%"], ["GC=F", "-0.6%"], ["NVDA", "-1.2%"], ["^VIX", "+3.1%"],
  ["ETH-USD", "+1.8%"], ["USDJPY", "+0.3%"], ["^GDAXI", "+0.5%"], ["CL=F", "+1.0%"], ["AAPL", "-0.3%"],
];

const SOURCES = "Yahoo Finance · FRED · Alpha Vantage · Binance · CFTC COT · news feeds";

export const Data = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.floor(interpolate(frame, [200, 290], [0, SOURCES.length], clamp));
  const tickerItems = [...TICKER, ...TICKER, ...TICKER];
  return (
    <Scene style={{ justifyContent: "center" }}>
      <Kicker>Every evening · real market data</Kicker>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 30, margin: "26px 0 44px" }}>
        <div style={{ fontSize: 190, fontWeight: 700, lineHeight: 0.9, color: C.up, fontVariantNumeric: "tabular-nums" }}>
          ~<Counter to={650} start={10} dur={60} />
        </div>
        <Rise delay={45}>
          <div style={{ fontSize: 56, paddingBottom: 14 }}>assets analyzed</div>
        </Rise>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, maxWidth: 1600 }}>
        {CHIPS.map((c, i) => {
          const s = spring({ frame: frame - 70 - i * 7, fps, config: { damping: 14, stiffness: 160 } });
          return (
            <div
              key={c}
              style={{
                fontSize: 34,
                padding: "16px 28px",
                borderRadius: 18,
                border: `1px solid ${C.border}`,
                background: C.card,
                opacity: s,
                scale: interpolate(s, [0, 1], [0.7, 1]),
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 48, fontSize: 32, color: C.muted, minHeight: 44 }}>
        <span style={{ opacity: interpolate(frame, [190, 200], [0, 1], clamp) }}>Sources&nbsp;&nbsp;</span>
        <span style={{ fontFamily: mono, color: C.fg }}>{SOURCES.slice(0, typed)}</span>
        <span style={{ fontFamily: mono, color: C.up, opacity: frame > 195 && Math.floor(frame / 15) % 2 === 0 ? 1 : 0 }}>▌</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 60,
          overflow: "hidden",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          background: `${C.card}cc`,
          opacity: interpolate(frame, [20, 40], [0, 1], clamp),
        }}
      >
        <div style={{ display: "flex", gap: 56, padding: "18px 0", whiteSpace: "nowrap", translate: `${-frame * 3}px 0px`, fontFamily: mono, fontSize: 28 }}>
          {tickerItems.map(([t, v], i) => (
            <span key={i}>
              <span style={{ color: C.muted }}>{t}</span>{" "}
              <span style={{ color: v.startsWith("-") ? C.down : C.upSoft }}>{v}</span>
            </span>
          ))}
        </div>
      </div>
    </Scene>
  );
};
