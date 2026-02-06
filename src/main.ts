import { CanvasManager } from "./managers/canvas-manager.js";

const manager = new CanvasManager("canvas");

const shapeSelect = document.getElementById("shape-select") as HTMLSelectElement;
const sizeInput = document.getElementById("shape-size") as HTMLInputElement;
const colorInput = document.getElementById("shape-color") as HTMLInputElement;
const insertBtn = document.getElementById("insert-shape") as HTMLButtonElement;

insertBtn.addEventListener("click", () => {
  const type = shapeSelect.value;
  const size = Number(sizeInput.value);
  const color = colorInput.value;

  manager.addShape(type, size, color);
});
