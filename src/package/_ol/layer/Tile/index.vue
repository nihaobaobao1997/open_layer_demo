<template>
  <div class="webgl-tile-layer">
    <slot />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_layer_WebGLTile-WebGLTileLayer.html
import mapMixins from "../../../minixs/map";
import { WebGLTile } from "ol/layer";
export default {
  name: "WebGLTileLayer",
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
      const layer = new WebGLTile({
        ...options,
        source
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
    },
    getLayer() {
      return this.layer;
    }
  }
};
</script>
