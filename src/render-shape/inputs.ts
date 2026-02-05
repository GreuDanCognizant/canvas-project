import { CanvasManager } from "../managers/canvasManager";
import { Triangle } from "./triangle";
import { Circle } from "./circle";
import { Square } from "./square";


export class InputHandler {
  canvas: HTMLCanvasElement;
  manager: CanvasManager;
  shapes: Array<Square|Triangle|Circle>;
  draggingIndex: number | null = null;
  activePointerId: number | null = null;

  constructor(canvas: HTMLCanvasElement, manager: CanvasManager, shapes: Array<Square|Triangle|Circle>) {
    this.canvas = canvas;
    this.manager = manager;
    this.shapes = shapes;
    this.bind();
  }

  getPointerPos(ev: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  hitTestTop(x: number, y: number) {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.shapes[i].contains(x, y)) return i;
    }
    return -1;
  }

  overlaps(a:Square | Triangle | Circle,b:Square | Triangle | Circle) {
    return !(
      a.x + a.edge <= b.x ||
      a.x >= b.x + b.edge ||
      a.y + a.edge <= b.y ||
      a.y >= b.y + b.edge
    );
  }

  bind() {
    this.canvas.addEventListener("pointerdown", (ev) => {
      const p = this.getPointerPos(ev);
      const idx = this.hitTestTop(p.x, p.y);
      if (idx >= 0) {
        const [item] = this.shapes.splice(idx, 1);
        this.shapes.push(item);
        item.selected = true;
        item.offset = { x: p.x - item.x, y: p.y - item.y };
        this.draggingIndex = this.shapes.length - 1;
        this.activePointerId = ev.pointerId;
        this.canvas.setPointerCapture(ev.pointerId);
        this.canvas.classList.add("pointer");
      } else {
        this.shapes.forEach(s => s.selected = false);
      }
    });

    this.canvas.addEventListener("pointermove", (ev) => {
      const p = this.getPointerPos(ev);

      if (this.draggingIndex !== null) {
        const s = this.shapes[this.draggingIndex];

        const newX = Math.max(0, Math.min(p.x - s.offset.x, this.manager.size.width - s.edge));
        const newY = Math.max(0, Math.min(p.y - s.offset.y, this.manager.size.height - s.edge));

        const oldX = s.x;
        const oldY = s.y;
        s.x = newX;
        s.y = newY;

        let blocked = false;
        for (let i = 0; i < this.shapes.length; i++) {
          if (i === this.draggingIndex) continue;
          if (this.overlaps(s, this.shapes[i])) {
            blocked = true;
            break;
          }
        }

        if (blocked) {
          s.x = oldX;
          s.y = oldY;
        }
        } else {

          let any = false;
          for (const s of this.shapes) {
            const inside = s.contains(p.x, p.y);
            if (inside) { any = true; s.active = true; } else s.active = false;
          }
          any ? this.canvas.classList.add("pointer") : this.canvas.classList.remove("pointer");
        }
    });


    const end = () => {
      if (this.draggingIndex !== null) this.shapes[this.draggingIndex].selected = false;
      this.draggingIndex = null;
      if (this.activePointerId !== null) {
        try { this.canvas.releasePointerCapture(this.activePointerId); } catch {}
        this.activePointerId = null;
      }
      this.canvas.classList.remove("pointer");
    };

    this.canvas.addEventListener("pointerup", end);
    this.canvas.addEventListener("pointercancel", end);
  }
}