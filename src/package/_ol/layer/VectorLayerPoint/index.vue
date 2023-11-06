<template>
  <div class="vector-layer-point">
    <slot ref="slot" />
  </div>
</template>
<script>
import mapMixins from "../../../minixs/map";
import VectorLayer from "ol/layer/Vector";
import { Fill, Icon, Stroke, Style, Text, Circle } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON";
import * as Sphere from "ol/sphere";
import { createWeatherStationStyle } from "./weather-station-style.js";
export default {
  name: "VectorLayerPoint",
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
  watch: {
    options: {
      handler(n) {
        this.layer && this.layer.setVisible(n.visible);
      },
      deep: true
    }
  },
  methods: {
    init(source) {
      const { options } = this;
      const { style, key, stationStyle } = options;

      const tempStyle = createWeatherStationStyle({ Style, Fill, Stroke, Icon, Text, Circle, styleOpts: style, Sphere, key, stationStyle });
      const layer = new VectorLayer({
        ...options,
        source
      });
      layer.setStyle(tempStyle);

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

      const { options } = this;
      const { style, key, stationStyle } = options;
      const tempStyle = createWeatherStationStyle({ Style, Fill, Stroke, Icon, Text, Circle, styleOpts: style, Sphere, key, stationStyle });
      this.layer.setStyle(tempStyle);
    },
    getLayer() {
      return this.layer;
    }
  }
};
</script>
