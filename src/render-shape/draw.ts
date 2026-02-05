export function drawCoords(ctx: CanvasRenderingContext2D, x: number, y: number, color = "green") {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.fillRect(-45, -7, 30, 14);
  ctx.fillStyle = "white";
  ctx.fillText(Math.floor(x).toString(), -30, 0);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = color;
  ctx.fillRect(-45, -7, 30, 14);
  ctx.fillStyle = "white";
  ctx.fillText(Math.floor(y).toString(), -30, 0);
  ctx.restore();
}

export function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save();
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  ctx.lineWidth = 0.3;
  ctx.strokeStyle = "red";
  for (let i = 10; i < w; i += 10) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
  for (let j = 10; j < h; j += 10) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }

  ctx.lineWidth = 1;
  ctx.strokeStyle = "yellow";
  for (let i = 50; i < w; i += 10) {
    if (i % 50 === 0) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 30); ctx.stroke(); ctx.fillText(String(i), i, 30); }
    else { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 10); ctx.stroke(); }
  }
  for (let i = 50; i < h; i += 10) {
    if (i % 50 === 0) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(30, i); ctx.stroke(); ctx.fillText(String(i), 30, i); }
    else { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(10, i); ctx.stroke(); }
  }
  ctx.restore();
}
