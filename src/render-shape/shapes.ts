export abstract class Shape {
  x: number;
  y: number;
  color: string;

  selected = false;
  active = false;
  offset = { x: 0, y: 0 };

  activeColor: string;
  activeColor2: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.activeColor = color.replace(/,\s*(\d{1,3})%\)/, (_m, p1) =>
      `,${Math.floor(Number(p1) * 0.7)}%)`
    );

    this.activeColor2 = color.replace(/,\s*(\d{1,3})%\)/, (_m, p1) =>
      `,${Math.floor(Number(p1) * 0.6)}%)`
    );
  }

  protected drawCoords(coords:DrawCoords) {
    coords.ctx.save();
    coords.ctx.translate(coords.cx, coords.cy);

    coords.ctx.fillStyle = this.activeColor;
    coords.ctx.fillRect(-45, -7, 30, 14);
    coords.ctx.fillStyle = "white";
    coords.ctx.fillText(Math.floor(this.x).toString(), -30, 0);

    coords.ctx.rotate(Math.PI / 2);
    coords.ctx.fillStyle = this.activeColor;
    coords.ctx.fillRect(-45, -7, 30, 14);
    coords.ctx.fillStyle = "white";
    coords.ctx.fillText(Math.floor(this.y).toString(), -30, 0);

    coords.ctx.restore();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract contains(px: number, py: number): boolean;
}