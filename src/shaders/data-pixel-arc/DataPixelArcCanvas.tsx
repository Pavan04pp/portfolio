import type { CSSProperties } from "react";

export type DataPixelArcCanvasProps = {
  className?: string;
  style?: CSSProperties;
};

export function DataPixelArcCanvas({ className = "", style }: DataPixelArcCanvasProps) {
  return <div className={`threeui-background data-pixel-arc ${className}`} style={style} />;
}
