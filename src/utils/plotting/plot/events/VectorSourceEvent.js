import Event from "ol/events/Event";
class VectorSourceEvent extends Event {
  /**
     * @param {string} type Type.
     * @param {ol.Feature} feature 图元
     */
  constructor(type, feature) {
    super(type);
    this.feature = feature;
  }
}
export default VectorSourceEvent;
