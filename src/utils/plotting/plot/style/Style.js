import { deepcopy } from "../../util/core";
import Style from "ol/style/Style";

class FTStyle {
  /**
   * @classdesc 样式基类对象
   * @author daiyujie
   * @constructs
   */
  constructor() {
    this._style = {};
    this.isDestoryed = false;
  }
  /**
   * 将json类型的样式，转换为ol.style
   * @return {ol.Style}
   */
  parse() {
    return new Style();
  }
  /**
   * 序列化样式
   * @return {JSON}
   */
  serialize() {
    return deepcopy(this._style);
  }
  /**
   * 设置样式
   * @param {JSON} json_style
   */
  setStyle(json_style) {
    this._style = json_style;
  }
  /**
   * 设置颜色
   * @param {String} colorstr
   */
  setColor(colorstr) {
    this._color = colorstr;
  }
  /**
   * 销毁对象
   */
  destory() {
    this._style = {};
    this.isDestoryed = true;
  }
}
export default FTStyle;
