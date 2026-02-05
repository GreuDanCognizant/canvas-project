export type Point = { x: number; y: number };

export function clamp(n: number, min: number, max: number) {

  return Math.max(min, Math.min(n, max));
}

export function getPointerCoords(canvas: HTMLCanvasElement, ev: PointerEvent): Point {
  const rect = canvas.getBoundingClientRect();

  return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
}
