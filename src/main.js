"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils/utils");
var draw_1 = require("./render-shape/draw");
var shapes_1 = require("./render-shape/shapes");
var utils_2 = require("./utils/utils");
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("mycanvas");
    if (!canvas)
        throw new Error("Canvas not found");
    var ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("2D context not available");
    function resizeCanvas() {
        var cssW = Math.floor(window.innerWidth * 0.9);
        var cssH = Math.floor(window.innerHeight * 0.9);
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        if (!canvas || !ctx)
            return;
        canvas.style.width = cssW + "px";
        canvas.style.height = cssH + "px";
        canvas.width = Math.floor(cssW * ratio);
        canvas.height = Math.floor(cssH * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        width = cssW;
        height = cssH;
        (0, draw_1.drawGrid)(ctx, width, height);
    }
    var width = 800, height = 600;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    // create squares
    var prtcls = new Array(10).fill(null).map(function () {
        return new shapes_1.Square(Math.random() * (width - 80) + 20, Math.random() * (height - 80) + 20, 60, (0, utils_2.hsl)(Math.floor(Math.random() * 360), 100, 50));
    });
    // hit test topmost
    function hitTest(x, y) {
        for (var i = prtcls.length - 1; i >= 0; i--) {
            if (prtcls[i].contains(x, y))
                return i;
        }
        return -1;
    }
    // dragging state
    var draggingIndex = null;
    var activePointerId = null;
    canvas.addEventListener("pointerdown", function (ev) {
        var p = (0, utils_1.getPointerCoords)(canvas, ev);
        var idx = hitTest(p.x, p.y);
        if (idx >= 0) {
            var item = prtcls.splice(idx, 1)[0];
            prtcls.push(item);
            item.selected = true;
            item.offset = { x: p.x - item.x, y: p.y - item.y };
            draggingIndex = prtcls.length - 1;
            activePointerId = ev.pointerId;
            canvas.setPointerCapture(ev.pointerId);
            canvas.classList.add("pointer");
        }
        else {
            prtcls.forEach(function (s) { return (s.selected = false); });
        }
    });
    canvas.addEventListener("pointermove", function (ev) {
        var p = (0, utils_1.getPointerCoords)(canvas, ev);
        if (draggingIndex !== null) {
            var s = prtcls[draggingIndex];
            s.x = (0, utils_2.clamp)(p.x - s.offset.x, 0, width - s.edge);
            s.y = (0, utils_2.clamp)(p.y - s.offset.y, 0, height - s.edge);
        }
        else {
            var any = false;
            for (var _i = 0, prtcls_1 = prtcls; _i < prtcls_1.length; _i++) {
                var s = prtcls_1[_i];
                var inside = s.contains(p.x, p.y);
                if (inside) {
                    any = true;
                    s.active = true;
                }
                else
                    s.active = false;
            }
            any ? canvas.classList.add("pointer") : canvas.classList.remove("pointer");
        }
    });
    function endPointer() {
        if (draggingIndex !== null)
            prtcls[draggingIndex].selected = false;
        draggingIndex = null;
        if (!canvas)
            return;
        if (activePointerId !== null) {
            try {
                canvas.releasePointerCapture(activePointerId);
            }
            catch (_a) { }
            activePointerId = null;
        }
        canvas.classList.remove("pointer");
    }
    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    // render loop
    function render() {
        if (!ctx)
            return;
        (0, draw_1.drawGrid)(ctx, width, height);
        for (var _i = 0, prtcls_2 = prtcls; _i < prtcls_2.length; _i++) {
            var s = prtcls_2[_i];
            s.draw(ctx);
        }
        requestAnimationFrame(render);
    }
    render();
});
