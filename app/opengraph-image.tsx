import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Uncle Shaan — School taught you a lot. He teaches you the rest.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F0E8D5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Inset border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1.5px solid rgba(26,16,8,0.14)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px solid rgba(26,16,8,0.07)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "#B85C38",
              fontSize: "20px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Your cool uncle
          </div>

          {/* Double rule */}
          <div
            style={{
              width: "120px",
              borderTop: "2px solid rgba(26,16,8,0.18)",
              borderBottom: "2px solid rgba(26,16,8,0.18)",
              height: "6px",
              display: "flex",
            }}
          />

          <div
            style={{
              color: "#1A1008",
              fontSize: "108px",
              fontWeight: 900,
              lineHeight: 0.9,
              fontFamily: "Georgia, serif",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Uncle
            <br />
            Shaan
          </div>

          {/* Double rule */}
          <div
            style={{
              width: "120px",
              borderTop: "2px solid rgba(26,16,8,0.18)",
              borderBottom: "2px solid rgba(26,16,8,0.18)",
              height: "6px",
              display: "flex",
            }}
          />

          <div
            style={{
              color: "#7A6448",
              fontSize: "20px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            School taught you a lot. He teaches you the rest.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
