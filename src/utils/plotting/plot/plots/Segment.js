import LineString from "ol/geom/LineString";
import Plot from "./Plot";
import PlotTypes from "../PlotTypes";
import mix from "../../util/mixin";

export default class Segment extends mix(Plot, LineString) {
  constructor(points, type) {
    super(points);
    this.type = type || PlotTypes.LINE_MARKER;
    this.fixPointCount = 2;
    this.setPoints(points);
  }
  generate() {
    if (this.getPointCount() < 2) {
      return;
    }
    this.setCoordinates(this.points);
  }
}
