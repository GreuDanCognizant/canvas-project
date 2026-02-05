"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasManager = void 0;
var CanvasManager = /** @class */ (function () {
    function CanvasManager(canvas) {
        var _this = this;
        this.size = { width: 800, height: 600 };
        this.canvas = canvas;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("2D context not available");
        this.ctx = ctx;
        this.resize();
        window.addEventListener("resize", function () { return _this.resize(); });
    }
    CanvasManager.prototype.resize = function () {
        var cssW = Math.floor(window.innerWidth * 0.9);
        var cssH = Math.floor(window.innerHeight * 0.9);
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        this.canvas.style.width = "".concat(cssW, "px");
        this.canvas.style.height = "".concat(cssH, "px");
        this.canvas.width = Math.floor(cssW * ratio);
        this.canvas.height = Math.floor(cssH * ratio);
        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.size = { width: cssW, height: cssH };
    };
    CanvasManager.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
    };
    CanvasManager.prototype.drawGrid = function () {
        var _a = this.size, width = _a.width, height = _a.height;
        var ctx = this.ctx;
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = "lightgray";
        for (var i = 10; i < width; i += 10) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (var j = 10; j < height; j += 10) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(width, j);
            ctx.stroke();
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "gray";
        for (var i = 50; i < width; i += 10) {
            ctx.beginPath();
            if (i % 50 === 0) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, 30);
                ctx.stroke();
                ctx.fillText(String(i), i, 30);
            }
            else {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, 10);
                ctx.stroke();
            }
        }
        for (var i = 50; i < height; i += 10) {
            ctx.beginPath();
            if (i % 50 === 0) {
                ctx.moveTo(0, i);
                ctx.lineTo(30, i);
                ctx.stroke();
                ctx.fillText(String(i), 30, i);
            }
            else {
                ctx.moveTo(0, i);
                ctx.lineTo(10, i);
                ctx.stroke();
            }
        }
        ctx.restore();
    };
    return CanvasManager;
}());
exports.CanvasManager = CanvasManager;
