# RADAR demo video (Remotion)

Source of the English motion-design demo video ([watch it here](https://radar-demo-delta.vercel.app/video.html)), built with [Remotion](https://www.remotion.dev/) and React.

- 8 animated scenes in `src/scenes/`: radar sweep, live data counters, Convergence Index, AI trading room, trade-plan chart, schedule, transparency, outro
- English voice-over per scene in `public/vo/`
- Brand colors, fonts and scene timing in `src/theme.ts`

```bash
npm install
npm run dev                                              # Remotion Studio preview
npx remotion render RadarDemoEN out/radar-demo-en.mp4    # export the MP4
```
