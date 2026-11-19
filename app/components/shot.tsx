import Image from "next/image";

/**
 * A real capture of the app, stored in public/screens/.
 *
 * Captures are taken from the desktop app at 2x device pixel ratio, then
 * cropped to the slot. next/image serves a width matched to the slot and the
 * screen density, so they stay sharp on high-density displays without sending
 * the full-size file to phones.
 */
export type Screen = {
  /** Path under public/, for example "/screens/app-draft.png". */
  src: string;
  /** Pixel size of the file. */
  width: number;
  height: number;
  alt: string;
};

type ShotProps = {
  screen: Screen;
  /** Rendered width at each breakpoint, as the `sizes` attribute. */
  sizes: string;
  /** True only for the capture that is on screen at first paint. */
  eager?: boolean;
};

export function Shot({ screen, sizes, eager = false }: ShotProps) {
  return (
    <Image
      src={screen.src}
      width={screen.width}
      height={screen.height}
      alt={screen.alt}
      sizes={sizes}
      quality={90}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

/** The three dots and address pill of an app window. Decorative. */
export function FrameBar({ label }: { label?: string }) {
  return (
    <div className="frame-bar" aria-hidden="true">
      <i />
      <i />
      <i />
      {label && <span>{label}</span>}
    </div>
  );
}

/** A capture in a window frame. `bar={false}` gives a plain rounded frame. */
export function Frame({ bar = true, label, className, ...shot }: ShotProps & { bar?: boolean; label?: string; className?: string }) {
  return (
    <div className={`frame${className ? ` ${className}` : ""}`}>
      {bar && <FrameBar label={label} />}
      <Shot {...shot} />
    </div>
  );
}
