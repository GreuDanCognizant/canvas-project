import { CanvasManager } from "./managers/canvasManager.js";
const manager = new CanvasManager("canvas");
const shapeSelect = document.getElementById("shape-select");
const sizeInput = document.getElementById("shape-size");
const colorInput = document.getElementById("shape-color");
const insertBtn = document.getElementById("insert-shape");
const clearBtn = document.getElementById("clear-canvas");
insertBtn.addEventListener("click", () => {
    const type = shapeSelect.value;
    const size = Number(sizeInput.value);
    const color = colorInput.value;
    manager.addShape(type, size, color);
});
clearBtn.addEventListener('click', () => {
    manager.clear();
});
//# sourceMappingURL=main.js.map