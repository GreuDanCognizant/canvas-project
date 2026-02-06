export function drawCoords(coords:DrawCoords) {
  coords.ctx.save();
  coords.ctx.translate(coords.cx, coords.cy);
  coords.ctx.fillRect(-45, -7, 30, 14);
  coords.ctx.fillStyle = "white";
  coords.ctx.fillText(Math.floor(coords.cx).toString(), -30, 0);
  coords.ctx.rotate(Math.PI / 2);
  coords.ctx.fillRect(-45, -7, 30, 14);
  coords.ctx.fillStyle = "white";
  coords.ctx.fillText(Math.floor(coords.cy).toString(), -30, 0);
  coords.ctx.restore();
}

export function drawGrid(coords:DrawCoords) {
  coords.ctx.save();
  coords.ctx.clearRect(0, 0, coords.cx, coords.cy);
  coords.ctx.fillStyle = "black";
  coords.ctx.fillRect(0, 0, coords.cx, coords.cy);

  coords.ctx.lineWidth = 0.3;
  coords.ctx.strokeStyle = "red";
  for (let i = 10; i < coords.cx; i += 10) { coords.ctx.beginPath(); coords.ctx.moveTo(i, 0); coords.ctx.lineTo(i, coords.cy); coords.ctx.stroke(); }
  for (let j = 10; j < coords.cy; j += 10) { coords.ctx.beginPath(); coords.ctx.moveTo(0, j); coords.ctx.lineTo(coords.cx, j); coords.ctx.stroke(); }

  coords.ctx.lineWidth = 1;
  coords.ctx.strokeStyle = "yellow";
  for (let i = 50; i < coords.cx; i += 10) {
    if (i % 50 === 0) { coords.ctx.beginPath(); coords.ctx.moveTo(i, 0); coords.ctx.lineTo(i, 30); coords.ctx.stroke(); coords.ctx.fillText(String(i), i, 30); }
    else { coords.ctx.beginPath(); coords.ctx.moveTo(i, 0); coords.ctx.lineTo(i, 10); coords.ctx.stroke(); }
  }
  for (let i = 50; i < coords.cy; i += 10) {
    if (i % 50 === 0) { coords.ctx.beginPath(); coords.ctx.moveTo(0, i); coords.ctx.lineTo(30, i); coords.ctx.stroke(); coords.ctx.fillText(String(i), 30, i); }
    else { coords.ctx.beginPath(); coords.ctx.moveTo(0, i); coords.ctx.lineTo(10, i); coords.ctx.stroke(); }
  }
  coords.ctx.restore();
}
