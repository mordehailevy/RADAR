import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { Easing } from "remotion";

// RADAR brand colors (same as the RADAR dashboard)
export const C = {
  bg: "#020617",
  card: "#0B1222",
  card2: "#0F1830",
  border: "#243049",
  fg: "#F8FAFC",
  muted: "#A3AEC2",
  up: "#22C55E",
  upSoft: "#4ADE80",
  down: "#F87171",
  warn: "#FBBF24",
  blue: "#60A5FA",
};

export const sans = '"IBM Plex Sans", sans-serif';
export const mono = '"IBM Plex Mono", monospace';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Voice-over segment lengths in seconds (public/vo/segN.wav) plus breathing room
export const SCENE_SECONDS = [9.97, 15.24, 15.39, 14.6, 13.79, 18.52, 12.95, 8.96];
export const VO_DELAY_FRAMES = 9;
