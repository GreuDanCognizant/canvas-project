"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHandler = void 0;
var InputHandler = /** @class */ (function () {
    function InputHandler(canvas, manager, shapes) {
        this.draggingIndex = null;
        this.activePointerId = null;
        this.canvas = canvas;
        this.manager = manager;
        this.shapes = shapes;
        this.bind();
    }
    InputHandler.prototype.getPointerPos = function (ev) {
        var rect = this.canvas.getBoundingClientRect();
        return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
    };
    InputHandler.prototype.hitTestTop = function (x, y) {
        for (var i = this.shapes.length - 1; i >= 0; i--) {
            if (this.shapes[i].contains(x, y))
                return i;
        }
        return -1;
    };
    InputHandler.prototype.bind = function () {
        var _this = this;
        this.canvas.addEventListener("pointerdown", function (ev) {
            var p = _this.getPointerPos(ev);
            var idx = _this.hitTestTop(p.x, p.y);
            if (idx >= 0) {
                var item = _this.shapes.splice(idx, 1)[0];
                _this.shapes.push(item);
                item.selected = true;
                item.offset = { x: p.x - item.x, y: p.y - item.y };
                _this.draggingIndex = _this.shapes.length - 1;
                _this.activePointerId = ev.pointerId;
                _this.canvas.setPointerCapture(ev.pointerId);
                _this.canvas.classList.add("pointer");
            }
            else {
                _this.shapes.forEach(function (s) { return s.selected = false; });
            }
        });
        this.canvas.addEventListener("pointermove", function (ev) {
            var p = _this.getPointerPos(ev);
            if (_this.draggingIndex !== null) {
                var s = _this.shapes[_this.draggingIndex];
                s.x = Math.max(0, Math.min(p.x - s.offset.x, _this.manager.size.width - s.edge));
                s.y = Math.max(0, Math.min(p.y - s.offset.y, _this.manager.size.height - s.edge));
            }
            else {
                var any = false;
                for (var _i = 0, _a = _this.shapes; _i < _a.length; _i++) {
                    var s = _a[_i];
                    var inside = s.contains(p.x, p.y);
                    if (inside) {
                        any = true;
                        s.active = true;
                    }
                    else
                        s.active = false;
                }
                any ? _this.canvas.classList.add("pointer") : _this.canvas.classList.remove("pointer");
            }
        });
        var end = function () {
            if (_this.draggingIndex !== null)
                _this.shapes[_this.draggingIndex].selected = false;
            _this.draggingIndex = null;
            if (_this.activePointerId !== null) {
                try {
                    _this.canvas.releasePointerCapture(_this.activePointerId);
                }
                catch (_a) { }
                _this.activePointerId = null;
            }
            _this.canvas.classList.remove("pointer");
        };
        this.canvas.addEventListener("pointerup", end);
        this.canvas.addEventListener("pointercancel", end);
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;
