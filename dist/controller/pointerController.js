import { getPointerCoords } from "../utils/pointer.js";
import { clamp } from "../utils/math.js";
export class PointerController {
    constructor(canvas, shapes, opts = {}) {
        this.draggingIndex = null;
        this.activePointerId = null;
        this.lastLog = 0;
        this.canvas = canvas;
        this.shapes = shapes;
        this.log = opts.log ?? null;
        this.throttleMs = opts.throttleMs ?? 150;
        this.onDown = this.onDown.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onUp = this.onUp.bind(this);
    }
    bind() {
        this.canvas.addEventListener("pointerdown", this.onDown);
        this.canvas.addEventListener("pointermove", this.onMove);
        this.canvas.addEventListener("pointerup", this.onUp);
        this.canvas.addEventListener("pointercancel", this.onUp);
    }
    unbind() {
        this.canvas.removeEventListener("pointerdown", this.onDown);
        this.canvas.removeEventListener("pointermove", this.onMove);
        this.canvas.removeEventListener("pointerup", this.onUp);
        this.canvas.removeEventListener("pointercancel", this.onUp);
    }
    hitTestTop(x, y) {
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            if (this.shapes[i].contains(x, y))
                return i;
        }
        return -1;
    }
    onDown(ev) {
        const p = getPointerCoords(this.canvas, ev);
        this.log?.push(`pointerdown at ${Math.round(p.x)}, ${Math.round(p.y)}`, "action");
        const idx = this.hitTestTop(p.x, p.y);
        if (idx >= 0) {
            const [item] = this.shapes.splice(idx, 1);
            this.shapes.push(item);
            item.selected = true;
            item.offset = { x: p.x - item.x, y: p.y - item.y };
            this.draggingIndex = this.shapes.length - 1;
            this.activePointerId = ev.pointerId;
            try {
                this.canvas.setPointerCapture(ev.pointerId);
            }
            catch { }
            this.canvas.classList.add("pointer");
        }
        else {
            this.shapes.forEach(s => (s.selected = false));
        }
    }
    onMove(ev) {
        const p = getPointerCoords(this.canvas, ev);
        if (this.draggingIndex !== null) {
            const s = this.shapes[this.draggingIndex];
            s.x = clamp(p.x - s.offset.x, 0, (this.canvas.width / (devicePixelRatio || 1)) - s.edge);
            s.y = clamp(p.y - s.offset.y, 0, (this.canvas.height / (devicePixelRatio || 1)) - s.edge);
        }
        else {
            let any = false;
            for (const s of this.shapes) {
                const inside = s.contains(p.x, p.y);
                if (inside) {
                    any = true;
                    s.active = true;
                }
                else
                    s.active = false;
            }
            any ? this.canvas.classList.add("pointer") : this.canvas.classList.remove("pointer");
        }
        // throttled logging
        const now = Date.now();
        if (now - this.lastLog > this.throttleMs) {
            this.log?.push(`pointermove ${Math.round(p.x)}, ${Math.round(p.y)}`, "info");
            this.lastLog = now;
        }
    }
    onUp() {
        if (this.draggingIndex !== null)
            this.shapes[this.draggingIndex].selected = false;
        this.draggingIndex = null;
        if (this.activePointerId !== null) {
            try {
                this.canvas.releasePointerCapture(this.activePointerId);
            }
            catch { }
            this.activePointerId = null;
        }
        this.canvas.classList.remove("pointer");
        this.log?.push("pointerup", "action");
    }
}
//# sourceMappingURL=pointerController.js.map