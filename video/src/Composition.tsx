import { Audio } from "@remotion/media";
import { AbsoluteFill, Composition, Series, staticFile } from "remotion";
import { Convergence } from "./scenes/Convergence";
import { Data } from "./scenes/Data";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Schedule } from "./scenes/Schedule";
import { TradePlan } from "./scenes/TradePlan";
import { TradingRoom } from "./scenes/TradingRoom";
import { Transparency } from "./scenes/Transparency";
import { SCENE_SECONDS, VO_DELAY_FRAMES } from "./theme";
import { Backdrop } from "./ui";

const FPS = 30;
const SCENES = [
  { name: "Intro", C: Intro },
  { name: "Market data", C: Data },
  { name: "ML & Convergence", C: Convergence },
  { name: "AI trading room", C: TradingRoom },
  { name: "Trade plan", C: TradePlan },
  { name: "Schedule & portfolio", C: Schedule },
  { name: "Transparency", C: Transparency },
  { name: "Outro", C: Outro },
];
const FRAMES = SCENE_SECONDS.map((s) => Math.ceil(s * FPS));
const TOTAL = FRAMES.reduce((a, b) => a + b, 0);

export const RadarDemo: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Series>
      {SCENES.map(({ name, C }, i) => (
        <Series.Sequence key={name} name={name} durationInFrames={FRAMES[i]}>
          <C />
          <Series>
            <Series.Sequence durationInFrames={VO_DELAY_FRAMES} layout="none">
              <></>
            </Series.Sequence>
            <Series.Sequence durationInFrames={FRAMES[i] - VO_DELAY_FRAMES} layout="none" name={`Voice-over ${i + 1}`}>
              <Audio src={staticFile(`vo/seg${i + 1}.wav`)} />
            </Series.Sequence>
          </Series>
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);

export const MyComposition: React.FC = () => (
  <Composition id="RadarDemoEN" component={RadarDemo} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
);
