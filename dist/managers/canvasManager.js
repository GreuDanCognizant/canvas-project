import { drawGrid } from "../render-shape/draw.js";
import { Square } from "../render-shape/square.js";
import { Circle } from "../render-shape/circle.js";
import { Triangle } from "../render-shape/triangle.js";
import { LogPanel } from "./logPannel.js";
import { InputHandler } from "../render-shape/inputs.js";
export class CanvasManager {
    constructor(canvasId) {
        this.size = { width: 1500, height: 800 };
        this.shapes = [];
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas)
            throw new Error("Canvas not found");
        const ctx = this.canvas.getContext("2d");
        if (!ctx)
            throw new Error("2D context not available");
        this.canvas = this.canvas;
        this.ctx = ctx;
        this.panel = new LogPanel();
        this.input = new InputHandler(this.canvas, this, this.shapes);
        this.resizeCanvas();
        this.bindSystemEvents();
        this.render();
    }
    bindSystemEvents() {
        window.addEventListener("resize", () => this.resizeCanvas());
        window.addEventListener("pointermove", (ev) => this.updatePanel(ev));
        window.addEventListener("resize", () => this.updatePanel(new PointerEvent("pointermove")));
    }
    updatePanel(ev) {
        if (!this.canvas)
            return;
        const rect = this.canvas.getBoundingClientRect();
        const pointerOnCanvas = ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom;
        this.panel.update({
            pointerOnCanvas,
            canvasWidth: rect.width,
            canvasHeight: rect.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            dpr: window.devicePixelRatio,
            pointerX: ev.clientX - rect.left,
            pointerY: ev.clientY - rect.top
        });
    }
    resizeCanvas() {
        if (!this.canvas)
            return;
        const cssW = Math.floor(window.innerWidth * 0.6);
        const cssH = Math.floor(window.innerHeight * 0.6);
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        this.canvas.style.width = cssW + "px";
        this.canvas.style.height = cssH + "px";
        this.canvas.width = Math.floor(cssW * ratio);
        this.canvas.height = Math.floor(cssH * ratio);
        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.size.width = cssW;
        this.size.height = cssH;
        drawGrid(this.ctx, cssW, cssH);
    }
    render() {
        const { width, height } = this.size;
        drawGrid(this.ctx, width, height);
        for (const s of this.shapes) {
            s.draw(this.ctx);
        }
        requestAnimationFrame(() => this.render());
    }
    addShape(type, size, color) {
        let x = Math.random() * (this.size.width - size);
        let y = Math.random() * (this.size.height - size);
        for (let shape of this.shapes) {
            if (Math.sqrt(shape.x ^ 2 + shape.y ^ 2) > x)
                x = x + Math.sqrt(shape.x ^ 2 + shape.y ^ 2);
        }
        let shape;
        if (type === "square") {
            shape = new Square(x, y, size, color);
        }
        else if (type === "circle") {
            shape = new Circle(x, y, size / 2, color);
        }
        else if (type === "triangle") {
            shape = new Triangle(x, y, size, color);
        }
        if (shape) {
            this.shapes.push(shape);
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes = [];
    }
}
//# sourceMappingURL=canvasManager.js.map