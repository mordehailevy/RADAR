import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp, easeOut, mono } from "../theme";
import { Kicker, Scene } from "../ui";

const DESKS = ["US equities", "Europe & Asia", "Crypto", "Commodities", "Rates & FX", "Indices & ETFs"];
const AGENTS = [
  { name: "Contrarian", role: "Attacks each proposal", model: "Sonnet", at: 150 },
  { name: "Portfolio manager", role: "Decides the orders", model: "Opus", at: 230 },
  { name: "Risk controller", role: "Checks every limit", model: "Sonnet", at: 310 },
];

// Positions (px) inside the 1640 x 640 stage
const DESK_X = 0;
const AGENT_X = [560, 920, 1280];
const AGENT_W = 340;
const ROW_Y = 300;

export const TradingRoom = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // A signal packet travels from the desks through each agent
  const stops = [
    { x: 420, t: 100 },
    { x: AGENT_X[0] + AGENT_W / 2, t: 150 },
    { x: AGENT_X[1] + AGENT_W / 2, t: 230 },
    { x: AGENT_X[2] + AGENT_W / 2, t: 310 },
  ];
  const px = interpolate(frame, stops.map((s) => s.t), stops.map((s) => s.x), { ...clamp, easing: easeOut });
  const packetOn = frame > 95 && frame < 330;

  return (
    <Scene style={{ justifyContent: "center" }}>
      <Kicker>The AI trading room · built on Claude</Kicker>
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          margin: "18px 0 40px",
          opacity: interpolate(frame, [8, 24], [0, 1], clamp),
          translate: interpolate(frame, [8, 30], ["0px 30px", "0px 0px"], { ...clamp, easing: easeOut }),
        }}
      >
        Agents that <span style={{ color: C.up }}>debate</span> every idea
      </div>
      <div style={{ position: "relative", width: 1640, height: 640 }}>
        {/* connection line */}
        <div
          style={{
            position: "absolute",
            left: 420,
            top: ROW_Y,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${C.up}, ${C.up}55)`,
            width: interpolate(frame, [60, 120], [0, 1220], { ...clamp, easing: easeOut }),
          }}
        />
        {DESKS.map((d, i) => {
          const s = spring({ frame: frame - 20 - i * 8, fps, config: { damping: 14 } });
          const pulse = interpolate(frame, [80 + i * 3, 95 + i * 3, 125 + i * 3], [0, 1, 0], clamp);
          return (
            <div
              key={d}
              style={{
                position: "absolute",
                left: DESK_X,
                top: 20 + i * 100,
                width: 380,
                fontSize: 32,
                padding: "18px 26px",
                borderRadius: 16,
                background: C.card,
                border: `1px solid ${pulse > 0.1 ? C.up : C.border}`,
                boxShadow: `0 0 ${30 * pulse}px ${C.up}88`,
                opacity: s,
                translate: `${(1 - s) * -60}px 0px`,
              }}
            >
              {d} desk
            </div>
          );
        })}
        {packetOn && (
          <div
            style={{
              position: "absolute",
              left: px - 14,
              top: ROW_Y - 12,
              width: 28,
              height: 28,
              borderRadius: 14,
              background: C.upSoft,
              boxShadow: `0 0 30px 8px ${C.up}`,
            }}
          />
        )}
        {AGENTS.map((a, i) => {
          const s = spring({ frame: frame - 70 - i * 12, fps, config: { damping: 14 } });
          const lit = interpolate(frame, [a.at - 6, a.at + 4], [0, 1], clamp);
          return (
            <div
              key={a.name}
              style={{
                position: "absolute",
                left: AGENT_X[i],
                top: ROW_Y - 115,
                width: AGENT_W,
                height: 230,
                padding: "26px 28px",
                borderRadius: 22,
                background: C.card,
                border: `2px solid ${lit > 0.5 ? C.up : C.border}`,
                boxShadow: `0 0 ${50 * lit}px ${C.up}55`,
                opacity: s,
                scale: interpolate(s, [0, 1], [0.8, 1]),
              }}
            >
              <div style={{ fontSize: 38, fontWeight: 700 }}>{a.name}</div>
              <div style={{ fontSize: 27, color: C.muted, marginTop: 8 }}>{a.role}</div>
              <div style={{ fontFamily: mono, fontSize: 22, color: C.blue, marginTop: 18 }}>{a.model}</div>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: AGENT_X[2],
            top: ROW_Y + 150,
            fontSize: 30,
            color: C.upSoft,
            opacity: interpolate(frame, [320, 340], [0, 1], clamp),
            translate: interpolate(frame, [320, 345], ["0px 20px", "0px 0px"], clamp),
          }}
        >
          ✓ Orders approved for tomorrow
        </div>
      </div>
    </Scene>
  );
};
