/**
 * cursor.ts — the subtle custom cursor. "Felt before noticed."
 *
 * A small ink-blue ring that eases toward the real pointer with a slight
 * lag (lerp), grows softly over interactive elements. Pointer-fine only —
 * completely absent on touch, and silent under reduced-motion.
 *
 * The real system cursor stays visible (we never hide the affordance);
 * this rides alongside it as a quiet companion.
 */
export function initCursor() {
  if (typeof window === "undefined") return;

  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return;

  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let visible = false;

  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!visible) {
      visible = true;
      ring.style.opacity = "1";
    }
  };

  const onLeave = () => {
    visible = false;
    ring.style.opacity = "0";
  };

  // grow over interactive targets
  const interactive = "a, button, [role='button'], input, textarea, [data-cursor='grow']";
  const onOver = (e: Event) => {
    const t = e.target as HTMLElement;
    if (t.closest(interactive)) ring.classList.add("cursor-ring--grow");
  };
  const onOut = (e: Event) => {
    const t = e.target as HTMLElement;
    if (t.closest(interactive)) ring.classList.remove("cursor-ring--grow");
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave);
  document.addEventListener("mouseover", onOver, { passive: true });
  document.addEventListener("mouseout", onOut, { passive: true });

  // lerp loop — slight, deliberate lag
  const LERP = 0.18;
  const tick = () => {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
