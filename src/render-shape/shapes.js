"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
var Square = /** @class */ (function () {
    function Square(x, y, edge, color) {
        this.selected = false;
        this.active = false;
        this.offset = { x: 0, y: 0 };
        this.x = x;
        this.y = y;
        this.edge = edge;
        this.color = color;
        this.activeColor = color.replace(/,\s*(\d{1,3})%\)/, function (_m, p1) { return ",".concat(Math.floor(Number(p1) * 0.7), "%)"); });
        this.activeColor2 = color.replace(/,\s*(\d{1,3})%\)/, function (_m, p1) { return ",".concat(Math.floor(Number(p1) * 0.6), "%)"); });
    }
    Square.prototype.draw = function (ctx) {
        ctx.save();
        ctx.fillStyle = this.active ? this.activeColor : this.color;
        ctx.fillRect(this.x, this.y, this.edge, this.edge);
        if (this.selected) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.activeColor2;
            ctx.strokeRect(this.x, this.y, this.edge, this.edge);
        }
        if (this.active)
            this.drawCoords(ctx);
        ctx.restore();
    };
    Square.prototype.drawCoords = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
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
    };
    Square.prototype.contains = function (px, py) {
        return px > this.x && px < this.x + this.edge && py > this.y && py < this.y + this.edge;
    };
    return Square;
}());
exports.Square = Square;
