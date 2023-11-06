<template>
  <div class="vector-layer-line">
    <slot ref="slot" />
  </div>
</template>
<script>
import mapMixins from "../../../minixs/map";
import VectorLayer from "ol/layer/Vector";
import { Fill, Icon, Stroke, Style, Circle } from "ol/style.js";
export default {
  name: "VectorLayerline",
  mixins: [mapMixins],
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      layer: null
    };
  },
  methods: {
    init(source) {
      const { options } = this;
      const layer = new VectorLayer({
        zIndex: options.zIndex,
        source: source,
        style: new Style({
          fill: new Fill(options.style.fill),
          stroke: new Stroke(options.style.stroke)
        })
      });
      this.layer = layer;
      const { getMap } = this;
      getMap((map) => {
        map.addLayer(layer);
      });
      const data = { layer, source };
      this.$emit("ready", data);
    },
    setSource(source) {
      this.layer.setSource(source);
    },
    getLayer() {
      return this.layer;
    }
  }
};
</script>
