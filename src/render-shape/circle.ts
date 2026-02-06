import { Shape } from "./shapes.js";

export class Circle extends Shape {
  radius: number;

  constructor(data:ShapeConstructor) {
    super(data.x, data.y, data.color);
    this.radius = data.edge;
  }

  get edge() {
    return this.radius * 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const cx = this.x + this.radius;
    const cy = this.y + this.radius;

    ctx.fillStyle = this.active ? this.activeColor : this.color;
    ctx.beginPath();
    ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
    ctx.fill();

    if (this.selected) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.activeColor2;
      ctx.beginPath();
      ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (this.active) this.drawCoords({ctx, cx, cy});

    ctx.restore();
  }

  contains(px: number, py: number) {
    const cx = this.x + this.radius;
    const cy = this.y + this.radius;
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
}
