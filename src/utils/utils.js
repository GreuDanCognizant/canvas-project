"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsl = void 0;
exports.getPointerCoords = getPointerCoords;
exports.clamp = clamp;
var hsl = function (h, s, l) { return "hsl(".concat(h, ",").concat(s, "%,").concat(l, "%)"); };
exports.hsl = hsl;
function getPointerCoords(canvas, ev) {
    var rect = canvas.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
}
function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
}
