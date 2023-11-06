import PolygonOL from "ol/geom/Polygon";
import Plot from "./Plot";
import PlotTypes from "../PlotTypes";
import mix from "../../util/mixin";
import Constants from "../Constants";
import * as PlotUtils from "../utils/plotutil";
export default class Ellipse extends mix(Plot, PolygonOL) {
  constructor(points) {
    super(points);
    this.type = PlotTypes.ELLIPSE;
    this.fixPointCount = 2;
    this.setPoints(points);
  }
  generate() {
    var count = this.getPointCount();
    if (count < 2) {
      return;
    }
    var pnt1 = this.points[0];
    var pnt2 = this.points[1];
    var center = PlotUtils.mid(pnt1, pnt2);
    var majorRadius = Math.abs((pnt1[0] - pnt2[0]) / 2);
    var minorRadius = Math.abs((pnt1[1] - pnt2[1]) / 2);
    this.setCoordinates([
      this.generatePoints(center, majorRadius, minorRadius)
    ]);
  }
  generatePoints(center, majorRadius, minorRadius) {
    var x;
    var y;
    var angle;
    var points = [];
    for (var i = 0; i <= Constants.FITTING_COUNT; i++) {
      angle = (Math.PI * 2 * i) / Constants.FITTING_COUNT;
      x = center[0] + majorRadius * Math.cos(angle);
      y = center[1] + minorRadius * Math.sin(angle);
      points.push([x, y]);
    }
    return points;
  }
}
