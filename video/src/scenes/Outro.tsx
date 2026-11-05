import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, clamp, mono } from "../theme";
import { RadarDish, Scene } from "../ui";

export const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16 } });
  return (
    <Scene style={{ padding: 0 }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ scale: interpolate(s, [0, 1], [0.7, 1]), opacity: s }}>
          <RadarDish size={230} />
        </div>
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: 30, paddingLeft: 30, marginTop: 20, opacity: s }}>RADAR</div>
        <div style={{ fontSize: 50, marginTop: 24, opacity: interpolate(frame, [25, 40], [0, 1], clamp) }}>Mordehai Levy</div>
        <div style={{ fontSize: 32, color: C.muted, marginTop: 8, opacity: interpolate(frame, [35, 50], [0, 1], clamp) }}>
          Full-stack &amp; AI developer · Tel Aviv
        </div>
        <div style={{ fontFamily: mono, fontSize: 34, color: C.upSoft, marginTop: 50, opacity: interpolate(frame, [55, 70], [0, 1], clamp) }}>
          github.com/mordehailevy/radar
        </div>
        <div style={{ fontFamily: mono, fontSize: 28, color: C.muted, marginTop: 14, opacity: interpolate(frame, [65, 80], [0, 1], clamp) }}>
          linkedin.com/in/mordehailevy
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
