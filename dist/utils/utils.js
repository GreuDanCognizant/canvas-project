export function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
}
export function getPointerCoords(canvas, ev) {
    const rect = canvas.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
}
//# sourceMappingURL=utils.js.map