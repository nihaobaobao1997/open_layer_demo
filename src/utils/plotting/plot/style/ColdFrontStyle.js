import FTStyle from "./Style";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import * as PlotUtil from "../utils/plotutil";

class ColdFrontStyle extends FTStyle {
  /**
   * @classdesc 气象冷锋样式
   * @author ygy
   * @extends {FTStyle}
   * @constructs
   */
  constructor() {
    super();
    this._angle = Math.PI / 4;
    this._sqrt_2 = 1.414;
    this._color = "rgb(0,0,255)";
    this._style = {
      color: this._color
    };
  }

  renderFront(ctx, pnt0, pnt1, r) {
    const mid = PlotUtil.mid(pnt0, pnt1);
    const left = PlotUtil.getPointOnLineByDistance(mid, pnt0, r);
    const right = PlotUtil.getPointOnLineByDistance(mid, pnt1, r);
    const third = PlotUtil.getThirdPoint(
      left,
      right,
      this._angle,
      this._sqrt_2 * r,
      false
    );
    ctx.beginPath();
    ctx.moveTo(left[0], left[1]);
    ctx.lineTo(third[0], third[1]);
    ctx.lineTo(right[0], right[1]);
    ctx.fillStyle = this._color;
    ctx.fill();
  }

  parse() {
    const line = new Style({
      stroke: new Stroke({
        color: this._color,
        width: 2
      })
    });
    const font = new Style({
      renderer: (coords, state) => {
        const ctx = state.context;
        ctx.save();
        // 绘制冷锋符号
        const points = PlotUtil.splitLineEvenly(coords, 40);
        for (let i = 1; i < points.length; i++) {
          this.renderFront(ctx, points[i - 1], points[i], 10);
        }
        ctx.restore();
      }
    });
    return [line, font];
  }
}

export default ColdFrontStyle;
