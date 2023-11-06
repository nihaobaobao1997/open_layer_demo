<template>
  <div class="Graticule">
    <slot ref="slot" />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_layer_WebGLTile-WebGLTileLayer.html
import mapMixins from "../../../minixs/map";
import Graticule from "ol/layer/Graticule.js";
export default {
  name: "Graticule",
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
      const layer = new Graticule({
        ...options,
        strokeStyle: source
      });
      this.layer = layer;

      const { getMap } = this;
      getMap(map => {
        map.addLayer(layer);
      });

      const data = { layer, source };

      this.$emit("ready", data);
    },
    setSource(source) {
      this.layer.setSource(source);
      this.$emit("ready", { layer: this.layer, source });
    },
    getLayer() {
      return this.layer;
    }
  }
};
</script>
