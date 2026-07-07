import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 40,
            fontWeight: 800,
            color: "#f5c518",
            letterSpacing: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 20,
              background: "#f5c518",
              color: "#0a0a0b",
              fontSize: 48,
            }}
          >
            SM
          </div>
          SMRC
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          Saint-Médard
          <br />
          Rugby Club
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
