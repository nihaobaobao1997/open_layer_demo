import FTStyle from "./Style";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
class TextStyle extends FTStyle {
  /**
   * @classdesc 文本样式
   * @author huangzhuqin
   * @extends {FTStyle}
   * @constructs
   */
  constructor() {
    super();
    this._style = {
      text: "文本",
      font: "12px Calibri,sans-serif",
      fill: { color: "red" },
      /* stroke: {
        color: "#FF0000",
        width: 2
      }, */
      textAlign: "center",
      textBaseline: "right"
    };
  }
  parse() {
    let fill = null;
    // stroke = null;
    if (this._style.fill) {
      fill = new Fill(this._style.fill);
    }
    /* if (this._style.stroke) {
      stroke = new Stroke(this._style.stroke);
    } */
    return new Style({
      text: new Text({
        text: this._style.text,
        font: this._style.font,
        fill: fill,
        // stroke: stroke,
        textAlign: this._style.textAlign,
        textBaseline: this._style.textBaseline
      })
    });
  }
}
export default TextStyle;
