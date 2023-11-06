import FTStyle from "./Style";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import * as PlotUtil from "../utils/plotutil";

class OccludedFrontStyle extends FTStyle {
  /**
   * @classdesc 气象锢囚锋样式
   * @author ygy
   * @extends {FTStyle}
   * @constructs
   */
  constructor() {
    super();
    this._angle = Math.PI / 4;
    this._sqrt_2 = 1.414;
    this._color = "rgb(235,18,245)";
    /* this._style = {
      stroke: {
        color:this._color,
        width: 3
      }
    }; */
    this._style = {
      color: this._color
    };
  }

  renderFront(ctx, pnt0, pnt1, r) {
    const mid = PlotUtil.mid(pnt0, pnt1);
    const left = PlotUtil.getPointOnLineByDistance(mid, pnt0, r);
    ctx.beginPath();
    ctx.moveTo(left[0], left[1]);
    ctx.arc(
      left[0],
      left[1],
      r,
      PlotUtil.angle(mid, pnt0) - 0.08,
      PlotUtil.angle(mid, pnt1) + 0.08,
      true
    );
    ctx.fillStyle = this._color;
    ctx.fill();

    const right = PlotUtil.getPointOnLineByDistance(mid, pnt1, r * 2);
    const third = PlotUtil.getThirdPoint(
      mid,
      right,
      this._angle,
      r * this._sqrt_2,
      false
    );
    ctx.beginPath();
    ctx.moveTo(mid[0], mid[1]);
    ctx.lineTo(third[0], third[1]);
    ctx.lineTo(right[0], right[1]);
    ctx.fillStyle = this._color;
    ctx.fill();
  }

  parse() {
    const line = new Style({
      stroke: new Stroke({
        color: this._color,
        width: 3
      })
    });
    const font = new Style({
      renderer: (coords, state) => {
        const ctx = state.context;
        ctx.save();

        const points = PlotUtil.splitLineEvenly(coords, 60);
        for (let i = 1; i < points.length; i++) {
          this.renderFront(ctx, points[i - 1], points[i], 10);
        }
        ctx.restore();
      }
    });
    return [line, font];
  }
}

export default OccludedFrontStyle;
