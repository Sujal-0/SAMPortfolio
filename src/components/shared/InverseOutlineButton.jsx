import React, { useState } from "react";

const variants = {
  default: {
    color: "#ffffff",
    hoverColor: "#000000",
    borderColor: "#ffffff",
    hoverBg: "#ffffff",
  },
  danger: {
    color: "#ef4444",
    hoverColor: "#ffffff",
    borderColor: "#ef4444",
    hoverBg: "#ef4444",
  },
};

// Pixel-style right arrow from uploaded SVG — fill color is passed as prop
const PixelArrow = ({ color }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", flexShrink: 0, transition: "fill 0.3s ease" }}
  >
    <polygon points="17,11 17,10 16,10 16,9 14,9 14,7 12,7 12,5 10,5 10,3 8,3 8,2 6,2 6,5 8,5 8,7 10,7 10,9 12,9 12,11 14,11 14,13 12,13 12,15 10,15 10,17 8,17 8,19 6,19 6,22 8,22 8,21 10,21 10,19 12,19 12,18 12,17 14,17 14,16 14,15 16,15 16,14 17,14 17,13 18,13 18,12 18,11" />
  </svg>
);

const InverseOutlineButton = ({
  children,
  className = "",
  variant = "default",
  href,
  onClick,
  style: extraStyle,
}) => {
  const [hovered, setHovered] = useState(false);
  const v = variants[variant] ?? variants.default;
  const Tag = href ? "a" : "button";
  const iconColor = hovered ? v.hoverColor : v.color;

  return (
    <Tag
      href={href}
      type={!href ? "button" : undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0px",
        padding: "11px 26px",
        overflow: "hidden",
        fontFamily: '"MainFont", sans-serif',
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        textDecoration: "none",
        color: hovered ? v.hoverColor : v.color,
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        transition: "color 0.3s ease",
        whiteSpace: "nowrap",
        ...extraStyle,
      }}
    >
      {/* Animated background fill */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: v.hoverBg,
          transform: hovered ? "translateY(0%)" : "translateY(102%)",
          transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 0,
        }}
      />

      {/* TOP — 2px border, feels solid not floating */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          background: v.borderColor,
          width: hovered ? "0%" : "100%",
          transition: "width 0.22s ease 0.3s",
          zIndex: 1,
        }}
      />
      {/* RIGHT */}
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "2px",
          background: v.borderColor,
          height: hovered ? "0%" : "100%",
          transition: "height 0.22s ease 0.2s",
          zIndex: 1,
        }}
      />
      {/* BOTTOM */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "2px",
          background: v.borderColor,
          width: hovered ? "0%" : "100%",
          transition: "width 0.22s ease 0.1s",
          zIndex: 1,
        }}
      />
      {/* LEFT */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "2px",
          background: v.borderColor,
          height: hovered ? "0%" : "100%",
          transition: "height 0.22s ease 0s",
          zIndex: 1,
        }}
      />

      {/* Label + icon in one flex row — guarantees shared baseline */}
      <span
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          lineHeight: 1,
        }}
      >
        <span style={{ display: "block" }}>{children}</span>

        {/* Pixel arrow — nudges right on hover */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "translateX(3px)" : "translateX(0px)",
            transition: "transform 0.3s ease",
            position: "relative",
            top: "0px",
          }}
        >
          <PixelArrow color={iconColor} />
        </span>
      </span>
    </Tag>
  );
};

export default InverseOutlineButton;
