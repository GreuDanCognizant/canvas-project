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

  protected drawCoords(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
    ctx.save();
    ctx.translate(cx, cy);

    ctx.fillStyle = this.activeColor;
    ctx.fillRect(-45, -7, 30, 14);
    ctx.fillStyle = "white";
    ctx.fillText(Math.floor(this.x).toString(), -30, 0);

    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = this.activeColor;
    ctx.fillRect(-45, -7, 30, 14);
    ctx.fillStyle = "white";
    ctx.fillText(Math.floor(this.y).toString(), -30, 0);

    ctx.restore();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract contains(px: number, py: number): boolean;
}