import type { CSSProperties, ReactNode } from "react";

export type NeuformBatchEffectProps = {
  className?: string;
  style?: CSSProperties;
  mode?: "dark" | "light" | "auto";
  [key: string]: unknown;
};

type PlaceholderProps = NeuformBatchEffectProps;

function PlaceholderEffect({ className, style, children }: PlaceholderProps & { children?: ReactNode }) {
  return <div className={`threeui-background predictive-arc ${className ?? ""}`} style={style}>{children}</div>;
}

export function SignalParticles(props: PlaceholderProps) {
  return <PlaceholderEffect {...props} />;
}

export function OverrideGrid(props: PlaceholderProps) {
  return <PlaceholderEffect {...props} />;
}
