import { Shape } from "./shapes.js";
export class Triangle extends Shape {
    constructor(x, y, edge, color) {
        super(x, y, color);
        this.edge = edge;
    }
    verts() {
        const half = this.edge / 2;
        return [
            { x: this.x + half, y: this.y },
            { x: this.x, y: this.y + this.edge },
            { x: this.x + this.edge, y: this.y + this.edge }
        ];
    }
    draw(ctx) {
        ctx.save();
        const [a, b, c] = this.verts();
        ctx.fillStyle = this.active ? this.activeColor : this.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.fill();
        if (this.selected) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.activeColor2;
            ctx.stroke();
        }
        if (this.active) {
            const cx = (a.x + b.x + c.x) / 3;
            const cy = (a.y + b.y + c.y) / 3;
            this.drawCoords(ctx, cx, cy);
        }
        ctx.restore();
    }
    contains(px, py) {
        const [a, b, c] = this.verts();
        const area = (p1, p2, p3) => Math.abs((p1.x * (p2.y - p3.y) +
            p2.x * (p3.y - p1.y) +
            p3.x * (p1.y - p2.y)) / 2);
        const A = area(a, b, c);
        const A1 = area({ x: px, y: py }, b, c);
        const A2 = area(a, { x: px, y: py }, c);
        const A3 = area(a, b, { x: px, y: py });
        return Math.abs(A - (A1 + A2 + A3)) < 0.5;
    }
}
//# sourceMappingURL=triangle.js.map