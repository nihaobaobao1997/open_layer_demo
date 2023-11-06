import LineString from "ol/geom/LineString";
import Plot from "./Plot";
import PlotTypes from "../PlotTypes";
import mix from "../../util/mixin";
import * as PlotUtils from "../utils/plotutil";

export default class Curve extends mix(Plot, LineString) {
  constructor(points, type) {
    super(points);
    this.type = type || PlotTypes.CURVE;
    this.t = 0.3;
    this.setPoints(points);
  }
  generate() {
    var count = this.getPointCount();
    if (count < 2) {
      return;
    }
    if (count == 2) {
      this.setCoordinates(this.points);
    } else {
      this.setCoordinates(PlotUtils.getCurvePoints(this.t, this.points));
    }
  }
}
