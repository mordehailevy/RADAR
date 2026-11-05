import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp } from "../theme";
import { RadarDish, Scene } from "../ui";

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = "RADAR".split("");
  return (
    <Scene style={{ padding: 0 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ scale: interpolate(frame, [0, 40], [0.6, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) }) }}>
          <RadarDish size={430} />
        </div>
        <div style={{ display: "flex", gap: 26, marginTop: 36 }}>
          {letters.map((l, i) => {
            const s = spring({ frame: frame - 30 - i * 4, fps, config: { damping: 12, stiffness: 150 } });
            return (
              <span
                key={i}
                style={{
                  fontSize: 150,
                  fontWeight: 700,
                  lineHeight: 1,
                  opacity: s,
                  translate: `0px ${(1 - s) * 70}px`,
                  textShadow: `0 0 40px ${C.up}55`,
                }}
              >
                {l}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: interpolate(frame, [62, 95], [20, 8], clamp),
            color: C.up,
            textTransform: "uppercase",
            opacity: interpolate(frame, [62, 80], [0, 1], clamp),
          }}
        >
          AI multi-agent market analysis
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 30,
            color: C.muted,
            opacity: interpolate(frame, [90, 110], [0, 1], clamp),
            translate: interpolate(frame, [90, 110], ["0px 16px", "0px 0px"], clamp),
          }}
        >
          A personal project by Mordehai Levy
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
