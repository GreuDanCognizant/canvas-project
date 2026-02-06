export class LogPanel {
    constructor() {
        this.pointer = document.getElementById("status-pointer");
        this.canvasSize = document.getElementById("status-canvas-size");
        this.windowSize = document.getElementById("status-window-size");
        this.pointerCoords = document.getElementById("status-pointer-coords");
    }
    update(data) {
        this.pointer.textContent = data.pointerOnCanvas ? "yes" : "no";
        this.canvasSize.textContent = `${data.canvasWidth} × ${data.canvasHeight}`;
        this.windowSize.textContent = `${data.windowWidth} × ${data.windowHeight}`;
        this.pointerCoords.textContent = `${Math.floor(data.pointerX)}, ${Math.floor(data.pointerY)}`;
    }
}
//# sourceMappingURL=log-panel.js.map