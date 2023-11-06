import MarkerStyle from "./MarkerStyle";
import PloylineStyle from "./PloyLineStyle";
import PloygonStyle from "./PloygonStyle";
import PloyLine_WarmStyle from "./PloyLine_WarmStyle";
import PlotTypes from "./../PlotTypes";
import WarmFrontStyle from "./WarmFrontStyle";
import ColdFrontStyle from "./ColdFrontStyle";
import OccludedFrontStyle from "./OccludedFrontStyle";
import StationaryFrontStyle from "./StationaryFrontStyle";

import WindBarbStyle from "./WindBarbStyle";
import TextStyle from "./TextStyle";
/**
 * @classdesc 样式工厂。根据图元类型生成样式对象
 * @author daiyujie
 */
class StyleFactory {
  /**
   * @param {PlotTypes} type 类型
   * @static
   */
  static createFTStyle(type, feature) {
    if (type != undefined) {
      switch (type) {
        case PlotTypes.METE_WINDBARB:
        case PlotTypes.METE_HIGH_PRESSURE:
        case PlotTypes.METE_LOW_PRESSURE:
        case PlotTypes.METE_WARM_CENTER:
        case PlotTypes.METE_COLD_CENTER:
          return new WindBarbStyle(feature, type);
        case PlotTypes.METE_WARM_FRONT:
          return new WarmFrontStyle();
        case PlotTypes.METE_COLD_FRONT:
          return new ColdFrontStyle();
        case PlotTypes.METE_OCCLUDED_FRONT:
          return new OccludedFrontStyle();
        case PlotTypes.METE_STATIONARY_FRONT:
          return new StationaryFrontStyle();
        case PlotTypes.MARKER:
        case PlotTypes.METE_RISING:
        case PlotTypes.METE_COOLING:
        case PlotTypes.METE_TYPHOON:
          return new MarkerStyle(type);
        case PlotTypes.TEXT:
          return new TextStyle();
        case PlotTypes.POLYLINE:
          return new PloylineStyle();
        case PlotTypes.CURVE:
        case PlotTypes.METE_TROUGH_LINE:
        case PlotTypes.METE_RIDGE_LINE:
        case PlotTypes.METE_WARM_ADVECTION:
          return new PloyLine_WarmStyle();
        case PlotTypes.METE_COLD_ADVECTION:
          return new PloylineStyle();
          // case PlotTypes.POLYGON:
        default:
          return new PloygonStyle();
      }
    }

    // return new PloygonStyle();
  }
}

export default StyleFactory;
