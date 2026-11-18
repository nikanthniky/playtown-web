export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const alt =
  "PlayTown — Your game. Your people. Your community. Developed by NISIMIN.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 64,
        background: "#171717",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>PlayTown</span>
        <span style={{ color: "#bdbdbd", fontSize: 17 }}>
          COMMUNITY SPORT. CONNECTED.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 94,
          fontWeight: 800,
          letterSpacing: -5,
          lineHeight: 1.02,
        }}
      >
        <span>Your game.</span>
        <span>Your people.</span>
        <span style={{ color: "#fc4c02" }}>Your PlayTown.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#bdbdbd",
          fontSize: 17,
        }}
      >
        <span>For the people who make sport happen.</span>
        <span>A product by NISIMIN</span>
      </div>
    </div>,
    size,
  );
}
