import Observable from "ol/Observable";
import PlotFactory from "./PlotFactory";
import { distance } from "./utils/plotutil";
import Constants from "./Constants";
import FeatureEvent from "./events/FeatureEvent";
import DrawEvent from "./events/DrawEvent";
import { connectEvent, disconnectEvent } from "../util/core";
import DoubleClickZoom from "ol/interaction/DoubleClickZoom";
import { Stroke, Fill, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Map from "ol/Map";
import Feature from "ol/Feature";

class PlotDraw extends Observable {
  /**
   * @classdesc 图元进行编辑的绘制的基类。
   * @author daiyujie
   * @extends {ol.Observable}
   * @constructs
   * @param {ol.Map} map 地图对象
   */
  constructor(map) {
    super();
    this.points = null;
    this.plot = null;
    this.feature = null;
    this.plotType = null;
    this.mapViewport = null;
    this.dblClickZoomInteraction = null;
    var stroke = new Stroke({ color: "#FF0000", width: 2 });
    var fill = new Fill({ color: "rgba(0,255,0,0.4)" });
    this.style = new Style({ fill: fill, stroke: stroke });
    this.featureSource = new VectorSource();
    this.drawOverlay = new VectorLayer({
      source: this.featureSource,
      zIndex: 999
    });
    this.drawOverlay.setStyle(this.style);
    this.drawOverlay.set("name", "draw_overlay");
    this.setMap(map);
  }
  /**
   * @ignore
   */
  setMap(map) {
    this.map = map;
    this.mapViewport = this.map.getViewport();
  }
  /**
   * 激活绘制工具
   * @param {PlotTypes} type 要绘制的图元类型
   */
  activate(type) {
    this.deactivate();
    this.deactivateMapTools();

    this._ls_mapfirstclick = connectEvent(
      this.map,
      "click",
      this.mapFirstClickHandler,
      this
    );
    this.plotType = type;
    // this.drawOverlay.setMap(this.map);
    this.map.addLayer(this.drawOverlay);
  }
  /**
   * 取消激活绘制工具
   */
  deactivate() {
    this.disconnectEventHandlers();
    this.map.removeLayer(this.drawOverlay);
    this.featureSource.clear();
    this.points = [];
    this.plot = null;
    this.feature = null;
    this.plotType = null;
    this.activateMapTools();
  }
  /**
   * 工具是否在绘制
   * @return {Boolean} 是否在绘制
   */
  isDrawing() {
    return this.plotType != null;
  }
  /**
   * @ignore
   */
  mapFirstClickHandler(e) {
    this.points.push(e.coordinate);
    this.plot = PlotFactory.createPlot(this.plotType, this.points);
    this.feature = new Feature(this.plot);
    this.featureSource.addFeature(this.feature);
    disconnectEvent(this.map, "click", this._ls_mapfirstclick);
    this._ls_mapfirstclick = null;
    this.dispatchEvent(
      new DrawEvent(DrawEvent.ADD_CONTROL_POINT, {
        freehand: this.plot.freehand,
        current: this.plot.getPointCount(),
        total: this.plot.fixPointCount,
        position: e.coordinate
      })
    );
    //
    if (this.plot.fixPointCount == this.plot.getPointCount()) {
      this.mapDoubleClickHandler(e);
      return;
    }
    //
    this._ls_mapNextClick = connectEvent(
      this.map,
      "click",
      this.mapNextClickHandler,
      this
    );
    // this._ls_mapNextClick = this.map.on("click", (e) => {
    // 	this.mapNextClickHandler(e)
    // }).listener;
    if (!this.plot.freehand) {
      this._ls_dbclick = connectEvent(
        this.map,
        "dblclick",
        this.mapDoubleClickHandler,
        this
      );
    }
    this._ls_pointmove = connectEvent(
      this.map,
      "pointermove",
      this.mapMouseMoveHandler,
      this
    );

    // goog.events.listen(this.mapViewport, P.Event.EventType.MOUSEMOVE,
    // 	this.mapMouseMoveHandler, false, this);
  }
  /**
   * @ignore
   */
  mapMouseMoveHandler(e) {
    var coordinate = e.coordinate;
    if (
      distance(coordinate, this.points[this.points.length - 1]) <
      Constants.ZERO_TOLERANCE
    ) { return; }
    if (!this.plot.freehand) {
      var pnts = this.points.concat([coordinate]);
      this.plot.setPoints(pnts);
    } else {
      this.points.push(coordinate);
      this.plot.setPoints(this.points);
    }
    this.dispatchEvent(
      new DrawEvent(DrawEvent.ADDING_MOUSE_MOVE, {
        freehand: this.plot.freehand,
        current: this.plot.getPointCount(),
        total: this.plot.fixPointCount,
        position: e.coordinate
      })
    );
  }
  /**
   * @ignore
   */
  mapNextClickHandler(e) {
    if (!this.plot.freehand) {
      if (
        distance(e.coordinate, this.points[this.points.length - 1]) <
        Constants.ZERO_TOLERANCE
      ) { return; }
    }
    this.points.push(e.coordinate);
    this.plot.setPoints(this.points);
    this.dispatchEvent(
      new DrawEvent(DrawEvent.ADD_CONTROL_POINT, {
        freehand: this.plot.freehand,
        current: this.plot.getPointCount(),
        total: this.plot.fixPointCount,
        position: e.coordinate
      })
    );
    if (this.plot.fixPointCount == this.plot.getPointCount()) {
      this.mapDoubleClickHandler(e);
      return;
    }
    if (this.plot && this.plot.freehand) {
      this.mapDoubleClickHandler(e);
    }
  }
  /**
   * @ignore
   */
  mapDoubleClickHandler(e) {
    this.disconnectEventHandlers();
    this.plot.finishDrawing();
    e.preventDefault();
    this.drawEnd();
  }
  /**
   * @ignore
   */
  disconnectEventHandlers() {
    disconnectEvent(this.map, "click", this._ls_mapfirstclick);
    disconnectEvent(this.map, "click", this._ls_mapNextClick);
    disconnectEvent(this.map, "pointermove", this._ls_pointmove);
    disconnectEvent(this.map, "dblclick", this._ls_dbclick);

    this._ls_mapfirstclick = null;
    this._ls_mapNextClick = null;
    this._ls_pointmove = null;
    this._ls_dbclick = null;
  }
  /**
   * @ignore
   */
  drawEnd(feature) {
    this.featureSource.removeFeature(this.feature);
    this.activateMapTools();
    this.disconnectEventHandlers();
    this.map.removeOverlay(this.drawOverlay);
    this.points = [];
    this.plot = null;
    this.plotType = null;
    this.dispatchEvent(new FeatureEvent(FeatureEvent.DRAW_END, this.feature));
    this.feature = null;
  }
  /**
   * @ignore
   */
  deactivateMapTools() {
    var interactions = this.map.getInteractions();
    var length = interactions.getLength();
    for (var i = 0; i < length; i++) {
      var item = interactions.item(i);
      if (item instanceof DoubleClickZoom) {
        this.dblClickZoomInteraction = item;
        interactions.remove(item);
        break;
      }
    }
  }
  /**
   * @ignore
   */
  activateMapTools() {
    if (this.dblClickZoomInteraction != null) {
      this.map.getInteractions().push(this.dblClickZoomInteraction);
      this.dblClickZoomInteraction = null;
    }
  }
}
export default PlotDraw;
