export function createMapboxStreetsV6Style({ Style, Fill, Stroke, Icon, Text, styleOpts }) {
  return function(evt) {
    const style = [];
    const type = evt.getGeometry().getType();
    const layer = evt.get("layer");
    const styleFuncParams = {};
    let rlt = {};
    if (Object.prototype.toString.call(styleOpts) === "[object Function]") {
      rlt = styleOpts({ layer });
    }
    if (Object.prototype.toString.call(styleOpts) === "[object Object]") {
      rlt = styleOpts;
    }
    const {
      fill = null,
      stroke = null
    } = rlt;
    if (fill) {
      styleFuncParams.fill = new Fill(fill);
    }
    if (stroke) {
      styleFuncParams.stroke = new Stroke(stroke);
    }
    if (Object.keys(styleFuncParams)?.length > 0) {
      style.push(new Style(styleFuncParams));
    }
    return style;
  };
}

