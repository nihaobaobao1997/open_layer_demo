import Point from "ol/geom/Point";
import FTStyle from "./Style";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import * as PlotUtil from "../utils/plotutil";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
class WindBarbStyle extends FTStyle {
  /**
   * @class WindBarbStyle
   * @classdesc 风符号类样式
   * @extends {FTStyle}
   * @author yuanguoyan
   * @constructs
   */
  constructor(fea, type) {
    super();
    this.feature = fea;
    this.points = this.feature.getGeometry().getCoordinates();
    this.icon = {};
    this.src = ""; this.offset = [0, 0];
    this.type = type;
    if (type == "mete_windbarb") {
      this.src = require("@/assets/image/plotting/Weather.png");
      this.offset = [32, 407];
      this._style = {
        text: "2m/s",
        geometry: this.points[0],
        image: {
          icon: {
            src: this.src,
            // color: "red",
            offset: this.offset,
            size: [32, 32],
            opacity: 1,
            scale: 1,
            anchor: [0.5, 1],
            rotateWithView: true,
            rotation: Math.PI / 2 - PlotUtil.angle(this.points[0], this.points[1])
          }
        }
      };
    } else {
      this.offset = [0, 0];
      if (type == "mete_high_pressure") {
        this.src = require("@/assets/image/plotting/gy.png");
      }
      if (type == "mete_low_pressure") {
        this.src = require("@/assets/image/plotting/dy.png");
      }
      if (type == "mete_warm_center") {
        this.src = require("@/assets/image/plotting/nx.png");
      }
      if (type == "mete_cold_center") {
        this.src = require("@/assets/image/plotting/lx.png");
      }
      this._style = {
        geometry: this.points[0],
        image: {
          icon: {
            src: this.src,
            // color: "red",
            offset: this.offset,
            size: [32, 32],
            opacity: 1,
            scale: 1,
            anchor: [0.5, 1],
            rotateWithView: true,
            rotation: Math.PI / 2 - PlotUtil.angle(this.points[0], this.points[1])
          }
        }
      };
    }
  }

  /* style(feature) {
    let points = this.feature.getGeometry().getCoordinates();
    const angle = Math.PI / 2 - PlotUtil.angle(points[0], points[1]);
    //const distance = PlotUtil.distance(points[0], points[1]);
    return new Style({
      geometry: new Point(points[0]),
      image: new Icon({
        src: "/images/weather/WIND10.png",
        color: "red",
        offset: [0, 0],
        opacity: 1,
        scale: 1,
        anchor: [0.5, 1],
        rotateWithView: true,
        rotation: angle
      })
    });
  } */

  parse() {
    // return this._style;
    /* let geometry,
    image = null;
    if (this._style.geometry) {
      geometry = new Point(this._style.geometry);
    }
    if (this._style.image.icon) {
      image = new Icon(this._style.image.icon);
    } */
    if (this.type == "mete_windbarb") {
      if (this._style.text != "") {
        this._style.image.icon.offset = [parseInt(this._style.text) / 2 * 32, 407];
      } else {
        this._style.image.icon.offset = [32, 407];
      }
      return new Style({
        geometry: new Point(this._style.geometry),
        image: new Icon(this._style.image.icon),
        text: new Text({
          text: this._style.text,
          font: "12px Calibri,sans-serif",
          fill: new Fill({ color: "rgba(255,255,255,0)" }),
          offsetX: 0,
          offsetY: 0
        })
      });
    } else {
      return new Style({
        geometry: new Point(this._style.geometry),
        image: new Icon(this._style.image.icon)
      });
    }
  }
}
export default WindBarbStyle;
