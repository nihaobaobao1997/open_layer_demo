<template>
  <div class="vector-layer-icon">
    <slot ref="slot" />
  </div>
</template>
<script>
import mapMixins from "../../../minixs/map";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style.js";
export default {
  name: "VectorLayerIcon",
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
          image: new Icon(options.icon)
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
