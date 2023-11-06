import FTStyle from "./Style";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Text from "ol/style/Text";
class MarkerStyle extends FTStyle {
  /**
   * @class MarkerStyle
   * @classdesc 点类样式
   * @extends {FTStyle}
   * @author daiyujie
   * @constructs
   */
  constructor(type) {
    super();
    this.src = "";
    this.offset = [0, 0];
    if (type == "marker") {
      this.src = require("@/assets/image/plotting/marker-begin.png");
    } else {
      this.src = require("@/assets/image/plotting/Weather.png");
      if (type == "mete_rising") {
        this.offset = [224, 496];
      }
      if (type == "mete_cooling") {
        this.offset = [768, 496];
      }
      if (type == "mete_typhon") {
        this.offset = [640, 496];
      }
    }
    this._style = {
      image: {
        // --ol.Image 的全部属性
        icon: {
          src: this.src,
          offset: this.offset,
          size: [32, 32],
          opacity: 1,
          scale: 1,
          anchor: [0.5, 1]
        }
      }
    };
  }
  parse() {
    let image = null;

    if (this._style.image) {
      if (this._style.image.icon) {
        image = new Icon(this._style.image.icon);
      }
    }

    return new Style({
      image: image
    });
  }
}
export default MarkerStyle;
