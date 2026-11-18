import Image from "next/image";
import type { AppScreen } from "@/data/screens";

/** Phone screens taller than this (height / width) scroll inside the frame. */
const MAX_PHONE_RATIO = 2.35;
const PHONE_RATIO = 19.5 / 9;

export function screenRatio(screen: AppScreen) {
  const r = screen.height / screen.width;
  return screen.device === "phone" && r > MAX_PHONE_RATIO ? PHONE_RATIO : r;
}

export function Device({ screen, interactive = false, sizes, eager = false, decorative = false }: {
  screen: AppScreen;
  /** Allow scrolling long screens inside the frame. */
  interactive?: boolean;
  sizes: string;
  eager?: boolean;
  decorative?: boolean;
}) {
  const ratio = screen.height / screen.width;
  const scrolls = screen.device === "phone" && ratio > MAX_PHONE_RATIO;
  const shown = screenRatio(screen);
  const alt = decorative ? "" : `${screen.label} screen`;

  return (
    <span className={`device device-${screen.device}${scrolls ? " is-long" : ""}`} style={{ "--ratio": `1 / ${shown}` } as React.CSSProperties}>
      <span className="device-body">
        <span
          className="device-screen"
          tabIndex={scrolls && interactive ? 0 : undefined}
          role={scrolls && interactive ? "region" : undefined}
          aria-label={scrolls && interactive ? `${screen.label} — scrollable screen` : undefined}
          data-scroll={scrolls && interactive ? "" : undefined}
        >
          <Image src={screen.src} alt={alt} width={screen.width} height={screen.height} sizes={sizes} loading={eager ? "eager" : "lazy"} draggable={false} />
        </span>
      </span>
      {scrolls && interactive && <span className="device-hint" aria-hidden="true">Scroll ↕</span>}
    </span>
  );
}
