
<template>
  <div class="vector-tile-layer">
    <slot ref="slot" />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html
import mapMixins from "../../../minixs/map";
import VectorTileLayer from "ol/layer/VectorTile.js";
import { Fill, Icon, Stroke, Style, Text } from "ol/style.js";
import { createMapboxStreetsV6Style } from "./mapbox-streets-v6-style.js";
export default {
  name: "VectorTileLayer",
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
      const { style } = options;
      const tempStyle = createMapboxStreetsV6Style({ Style, Fill, Stroke, Icon, Text, styleOpts: style });
      // delete options.style;

      const layer = new VectorTileLayer({
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
    },
    getLayer() {
      return this.layer;
    }
  }
};
</script>
