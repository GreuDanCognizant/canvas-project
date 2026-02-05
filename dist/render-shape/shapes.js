export class Shape {
    constructor(x, y, color) {
        this.selected = false;
        this.active = false;
        this.offset = { x: 0, y: 0 };
        this.x = x;
        this.y = y;
        this.color = color;
        this.activeColor = color.replace(/,\s*(\d{1,3})%\)/, (_m, p1) => `,${Math.floor(Number(p1) * 0.7)}%)`);
        this.activeColor2 = color.replace(/,\s*(\d{1,3})%\)/, (_m, p1) => `,${Math.floor(Number(p1) * 0.6)}%)`);
    }
    drawCoords(ctx, cx, cy) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = this.activeColor;
        ctx.fillRect(-45, -7, 30, 14);
        ctx.fillStyle = "white";
        ctx.fillText(Math.floor(this.x).toString(), -30, 0);
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = this.activeColor;
        ctx.fillRect(-45, -7, 30, 14);
        ctx.fillStyle = "white";
        ctx.fillText(Math.floor(this.y).toString(), -30, 0);
        ctx.restore();
    }
}
//# sourceMappingURL=shapes.js.map