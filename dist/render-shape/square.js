import { Shape } from "./shapes.js";
export class Square extends Shape {
    constructor(data) {
        super(data.x, data.y, data.color);
        this.edge = data.edge;
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.active ? this.activeColor : this.color;
        ctx.fillRect(this.x, this.y, this.edge, this.edge);
        if (this.selected) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.activeColor2;
            ctx.strokeRect(this.x, this.y, this.edge, this.edge);
        }
        if (this.active) {
            const cx = this.x + this.edge / 2;
            const cy = this.y + this.edge / 2;
            this.drawCoords({ ctx, cx, cy });
        }
        ctx.restore();
    }
    contains(px, py) {
        return (px > this.x &&
            px < this.x + this.edge &&
            py > this.y &&
            py < this.y + this.edge);
    }
}
//# sourceMappingURL=square.js.map