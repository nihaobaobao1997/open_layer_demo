import FTStyle from "./Style";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import * as PlotUtil from "../utils/plotutil";

class WarmFrontStyle extends FTStyle {
  /**
   * @classdesc 气象暖锋样式
   * @author ygy
   * @extends {FTStyle}
   * @constructs
   */
  constructor() {
    super();
    this._color = "rgb(255,0,0)";
    /* this._style = [{
      stroke:{
        color: this._color,
        width: 3
      },
      renderer:(coords, state) => {
        const ctx = state.context;
        ctx.save();
        let points = PlotUtil.splitLineEvenly(coords, 40);
        for (let i = 1; i < points.length; i++) {
          this.renderFront(ctx, points[i - 1], points[i], 10);
        }
        ctx.restore();
      }
    }] */
    this._style = {
      color: this._color
    };
  }

  renderFront(ctx, pnt0, pnt1, r) {
    const mid = PlotUtil.mid(pnt0, pnt1);
    ctx.beginPath();
    ctx.moveTo(mid[0], mid[1]);
    ctx.arc(
      mid[0],
      mid[1],
      r,
      PlotUtil.angle(mid, pnt0) - 0.08,
      PlotUtil.angle(mid, pnt1) + 0.08,
      true
    );
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

export default WarmFrontStyle;
