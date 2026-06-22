/**
 * motion.ts — the shared motion engine.
 *
 * One place to register GSAP + ScrollTrigger, define the signature
 * CustomEase curves (matching the CSS easing tokens so JS and CSS feel
 * identical), and gate everything behind prefers-reduced-motion.
 *
 * GSAP is imported here and tree-shaken/lazy-loaded per island, so calm
 * sections that don't import this never pay for it.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Register plugins + named eases exactly once. */
export function initMotion() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Named eases — the "sauce". These mirror the CSS cubic-beziers in tokens.css.
  CustomEase.create("settle", "0.16, 1, 0.3, 1"); // heavy, long tail — type arrival
  CustomEase.create("draw", "0.65, 0.05, 0.36, 1"); // mechanical-straight — hairlines
  CustomEase.create("hand", "0.42, 0, 0.30, 1"); // hand-speed — ink strokes
  CustomEase.create("physical", "0.22, 0.61, 0.36, 1"); // hover / physical

  // If the user prefers reduced motion, neutralise durations globally.
  if (prefersReducedMotion()) {
    gsap.globalTimeline.timeScale(1000);
    gsap.defaults({ duration: 0.001 });
  }

  registered = true;
  return { gsap, ScrollTrigger };
}

/**
 * matchMedia helper — register breakpoint-scoped animations cleanly.
 * Each context auto-reverts on resize across the boundary.
 *
 *   responsive((ctx) => {
 *     const { isDesktop, reduced } = ctx.conditions;
 *     ...
 *   });
 */
export function responsive(
  build: (context: gsap.Context, conditions: Record<string, boolean>) => void
) {
  initMotion();
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: "(max-width: 719px)",
      isDesktop: "(min-width: 720px)",
      reduced: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (ctx) => build(ctx, ctx.conditions as Record<string, boolean>)
  );
  return mm;
}

export { gsap, ScrollTrigger };
