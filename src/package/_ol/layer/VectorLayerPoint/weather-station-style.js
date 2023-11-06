export function createWeatherStationStyle({ Style, Fill, Stroke, Icon, Text, Circle, styleOpts, Sphere, key, stationStyle }) {
  return function(feature) {
    let features = feature;
    const array = feature.get("features");
    if (array) {
      let min = 999999;
      const centid = feature.getGeometry().getCoordinates();
      array.forEach(item => {
        const dis = Sphere.getDistance(item.getGeometry().getCoordinates(), centid);
        if (dis < min) {
          features = item;
          min = dis;
        }
      });
      // 用最近点位置和属性替换聚合中心的位置和属性值。
      feature.setProperties(features.getProperties());
    }

    const properties = feature.getProperties();
    const styleFuncParams = {};
    let rlt = {};
    let style;
    if (Object.prototype.toString.call(styleOpts) === "[object Function]") {
      rlt = styleOpts({ properties, key, stationStyle });
    }
    if (Object.prototype.toString.call(styleOpts) === "[object Object]") {
      rlt = styleOpts;
    }

    if (Object.prototype.toString.call(rlt) === "[object Object]") {
      const {
        fill = null,
        stroke = null,
        icon = null,
        text = null
      } = rlt;

      if (fill) {
        styleFuncParams.fill = new Fill(fill);
      }
      if (stroke) {
        styleFuncParams.stroke = new Stroke(stroke);
      }
      if (icon) {
        styleFuncParams.image = new Icon(icon);
      }
      if (text) {
        styleFuncParams.text = new Text(text);
      }
      for (const key in styleFuncParams) {
        if (Object.hasOwnProperty.call(styleFuncParams, key)) {
          const element = styleFuncParams[key];
          style.push(new Style({ [key]: element }));
        }
      }
    }
    if (Object.prototype.toString.call(rlt) === "[object Array]") {
      style = rlt.map(item => {
        const { type } = item;
        if (type === "icon") {
          delete item.type;
          return new Style({ image: new Icon(item) });
        }
        if (type === "text") {
          delete item.type;
          const fill = {
            fill: new Fill(item.fill)
          };
          const text = Object.assign(item, fill);
          return new Style({ text: new Text(text) });
        }
        if (type === "point") {
          delete item.type;
          const fill = {
            fill: new Fill(item.fill)
          };
          const stroke = {
            stroke: new Stroke(item.stroke)
          };
          const circle = Object.assign(item, fill, stroke);
          return new Style({ image: new Circle(circle) });
        }
        return {};
      });
    }
    return style;
  };
}
