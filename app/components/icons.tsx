import type { ReactNode, SVGProps } from "react";

type IconProps = { size?: number } & SVGProps<SVGSVGElement>;

/** 24px line icon. Decorative by default: every use sits next to its own label. */
function Line({ size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PictureIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M4 18l5-5 4 3 3-3 4 4" />
  </Line>
);

export const CheckIcon = (p: IconProps) => (
  <Line strokeWidth="3" {...p}>
    <path d="M5 12l5 5 9-10" />
  </Line>
);

export const ChevronIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 9l6 6 6-6" />
  </Line>
);

export const ArrowIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Line>
);

export const ExternalIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 13v6H5V6h6" />
  </Line>
);

export const FileIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 3h8l5 5v13H6z" />
    <path d="M14 3v5h5M9 13h7M9 17h7" />
  </Line>
);

/**
 * The brand mark: an ink pilcrow (the editor's paragraph mark) with a
 * detached gold second stem, the second read. Same shapes as
 * public/brand/np-logo.svg. `size` is in px.
 */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#23254A" d="M14 2H27V7H19V30H14V20A9 9 0 0 1 14 2Z" />
      <rect fill="#E5A93A" x="22" y="9" width="5" height="21" />
    </svg>
  );
}
