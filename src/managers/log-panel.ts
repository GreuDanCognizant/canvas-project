export class LogPanel {
  private pointer = document.getElementById("status-pointer")!;
  private canvasSize = document.getElementById("status-canvas-size")!;
  private windowSize = document.getElementById("status-window-size")!;
  private pointerCoords = document.getElementById("status-pointer-coords")!;

  update(data:PanelInfo ) {
    this.pointer.textContent = data.pointerOnCanvas ? "yes" : "no";
    this.canvasSize.textContent = `${data.canvasWidth} × ${data.canvasHeight}`;
    this.windowSize.textContent = `${data.windowWidth} × ${data.windowHeight}`;
    this.pointerCoords.textContent = `${Math.floor(data.pointerX)}, ${Math.floor(data.pointerY)}`;
  }
}
