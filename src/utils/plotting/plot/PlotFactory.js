import PlotTypes from "./PlotTypes";
import Marker from "./plots/Marker";
import Polyline from "./plots/Polyline";
import Polygon from "./plots/Polygon";
import Circle from "./plots/Circle";
import Ellipse from "./plots/Ellipse";
import Rectangle from "./plots/Rectangle";
import AttackArrow from "./plots/AttackArrow";
import ClosedCurve from "./plots/ClosedCurve";
import Curve from "./plots/Curve";
import DoubleArrow from "./plots/DoubleArrow";
import FineArrow from "./plots/FineArrow";
import AssaultDirection from "./plots/AssaultDirection";
import FreehandLine from "./plots/FreehandLine";
import FreehandPolygon from "./plots/FreehandPolygon";
import GatheringPlace from "./plots/GatheringPlace";
import Lune from "./plots/Lune";
import Sector from "./plots/Sector";
import SquadCombat from "./plots/SquadCombat";
import StraightArrow from "./plots/StraightArrow";
import TailedAttackArrow from "./plots/TailedAttackArrow";
import TailedSquadCombat from "./plots/TailedSquadCombat";

import Arc from "./plots/Arc";

import Segment from "./plots/Segment";
/**
 * @classdesc 创建图元的基类
 * @author daiyujie
 */
class PlotFactory {
  /**
   * @static
   * @param {PlotTypes} type
   * @param {ol.Coordinate} points
   */
  static createPlot(type, points) {
    switch (type) {
      case PlotTypes.METE_WINDBARB:
        return new Segment(points, type);
      case PlotTypes.MARKER:
        return new Marker(points, type);
      case PlotTypes.TEXT:
        return new Marker(points, type);
      case PlotTypes.METE_HIGH_PRESSURE:
        return new Segment(points, type);
      case PlotTypes.METE_LOW_PRESSURE:
        return new Segment(points, type);
      case PlotTypes.METE_WARM_CENTER:
        return new Segment(points, type);
      case PlotTypes.METE_COLD_CENTER:
        return new Segment(points, type);
      case PlotTypes.METE_RISING:
        return new Marker(points, type);
      case PlotTypes.METE_COOLING:
        return new Marker(points, type);
      case PlotTypes.METE_TYPHOON:
        return new Marker(points, type);
      case PlotTypes.POLYLINE:
        return new Polyline(points);
      case PlotTypes.POLYGON:
        return new Polygon(points);
      case PlotTypes.CIRCLE:
        return new Circle(points);
      case PlotTypes.ELLIPSE:
        return new Ellipse(points);
      case PlotTypes.RECTANGLE:
        return new Rectangle(points);
      case PlotTypes.ARC:
        return new Arc(points);
      case PlotTypes.ATTACK_ARROW:
        return new AttackArrow(points);
      case PlotTypes.CLOSED_CURVE:
        return new ClosedCurve(points);
      case PlotTypes.CURVE:
        return new Curve(points, type);
      case PlotTypes.METE_WARM_FRONT:
        return new Curve(points, type);
      case PlotTypes.METE_COLD_FRONT:
        return new Curve(points, type);
      case PlotTypes.METE_OCCLUDED_FRONT:
        return new Curve(points, type);
      case PlotTypes.METE_STATIONARY_FRONT:
        return new Curve(points, type);
      case PlotTypes.METE_TROUGH_LINE:
        return new Curve(points, type);
      case PlotTypes.METE_RIDGE_LINE:
        return new Curve(points, type);
      case PlotTypes.METE_WARM_ADVECTION:
        return new Curve(points, type);
      case PlotTypes.METE_COLD_ADVECTION:
        return new Curve(points, type);
      case PlotTypes.DOUBLE_ARROW:
        return new DoubleArrow(points);
      case PlotTypes.FINE_ARROW:
        return new FineArrow(points);
      case PlotTypes.ASSAULT_DIRECTION:
        return new AssaultDirection(points);
      case PlotTypes.FREEHAND_LINE:
        return new FreehandLine(points);
      case PlotTypes.FREEHAND_POLYGON:
        return new FreehandPolygon(points);
      case PlotTypes.GATHERING_PLACE:
        return new GatheringPlace(points);
      case PlotTypes.LUNE:
        return new Lune(points);
      case PlotTypes.SECTOR:
        return new Sector(points);
      case PlotTypes.SQUAD_COMBAT:
        return new SquadCombat(points);
      case PlotTypes.STRAIGHT_ARROW:
        return new StraightArrow(points);
      case PlotTypes.TAILED_ATTACK_ARROW:
        return new TailedAttackArrow(points);
      case PlotTypes.TAILED_SQUAD_COMBAT:
        return new TailedSquadCombat(points);
    }
    return null;
  }
}
export default PlotFactory;
