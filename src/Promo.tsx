import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT = "Helvetica, Arial, sans-serif";

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, 450], [160, 200]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, #3e2214 0%, #6f4e37 50%, #c08552 100%)`,
      }}
    />
  );
};

// Adegan 1: DISKON 50% (spring: scale + opacity)
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 12 } });
  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          color: "white",
          fontFamily: FONT,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        <div style={{ fontSize: 190 }}>DISKON</div>
        <div style={{ fontSize: 420 }}>50%</div>
      </div>
    </AbsoluteFill>
  );
};

// Adegan 2: KOPI SUSU GULA AREN (fade in + slide dari bawah)
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 30], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          color: "white",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 150,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        <div>KOPI SUSU</div>
        <div>GULA AREN</div>
      </div>
    </AbsoluteFill>
  );
};

// Adegan 3: BELI SEKARANG + countdown 3 -> 2 -> 1
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const count = Math.max(1, 3 - Math.floor(frame / 50));
  const localFrame = frame % 50;
  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 10 },
  });
  const numberScale = interpolate(pop, [0, 1], [0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: textOpacity,
          fontSize: 150,
          fontWeight: 900,
          lineHeight: 1.1,
        }}
      >
        <div>BELI</div>
        <div>SEKARANG</div>
      </div>
      <div
        style={{
          marginTop: 80,
          fontSize: 420,
          fontWeight: 900,
          lineHeight: 1,
          transform: `scale(${numberScale})`,
        }}
      >
        {count}
      </div>
    </AbsoluteFill>
  );
};

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={150}>
        <Scene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={150}>
        <Scene2 />
      </Sequence>
      <Sequence from={300} durationInFrames={150}>
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
};
