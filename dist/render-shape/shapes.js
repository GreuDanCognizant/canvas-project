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
    drawCoords(coords) {
        coords.ctx.save();
        coords.ctx.translate(coords.cx, coords.cy);
        coords.ctx.fillStyle = this.activeColor;
        coords.ctx.fillRect(-45, -7, 30, 14);
        coords.ctx.fillStyle = "white";
        coords.ctx.fillText(Math.floor(this.x).toString(), -30, 0);
        coords.ctx.rotate(Math.PI / 2);
        coords.ctx.fillStyle = this.activeColor;
        coords.ctx.fillRect(-45, -7, 30, 14);
        coords.ctx.fillStyle = "white";
        coords.ctx.fillText(Math.floor(this.y).toString(), -30, 0);
        coords.ctx.restore();
    }
}
//# sourceMappingURL=shapes.js.map