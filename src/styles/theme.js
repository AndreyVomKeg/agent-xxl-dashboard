// Google brand colors
export const G = {
  b: "#4285F4", // blue
  r: "#EA4335", // red
  y: "#FBBC05", // yellow
  g: "#34A853", // green
};

// App palette — warm beige theme
export const C = {
  bg: "#F3EDE5",       // background
  sf: "#FFF",          // surface
  sa: "#EDE6DB",       // surface alt
  bd: "rgba(60,40,20,0.08)",  // border
  bs: "rgba(60,40,20,0.15)",  // border strong
  tx: "#1A1108",       // text
  ts: "#6B5C4D",       // text secondary
  tt: "#9C8E80",       // text tertiary
  ac: "#C47B5B",       // accent (terracotta)
  al: "rgba(196,123,91,0.1)", // accent light
  am: "rgba(196,123,91,0.18)",// accent medium
  ok: "#34A853",       // success
  ol: "rgba(52,168,83,0.08)", // success light
  dl: "rgba(234,67,53,0.08)", // danger light
};

// Shadows
export const SH = "0 2px 8px rgba(60,40,20,0.06), 0 8px 24px rgba(60,40,20,0.04)";

// Helpers
export const cpaColor = (v) => v < 300 ? G.g : v < 400 ? "#D09D00" : G.r;
export const roasColor = (v) => v > 3 ? G.g : v > 2 ? "#D09D00" : G.r;

// Common card style
export const cardStyle = {
  background: C.sf,
  border: "1px solid " + C.bd,
  borderRadius: 14,
  boxShadow: SH,
};
