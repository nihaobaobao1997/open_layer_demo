<template>
  <div class="vector-source-line">
    <slot />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html
import automatic from "../../../minixs/automatic";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON";

export default {
  name: "VectorSourceLine",
  mixins: [automatic],
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      source: null
    };
  },
  watch: {
    options: {
      handler: function(n, o) {
        this.changeSource();
      },
      deep: true
    }
  },
  methods: {
    createSource() {
      const { options } = this;
      const source = new VectorSource({
        features: new GeoJSON({
          dataProjection: options.dataProjection
        }).readFeatures(options.featureJson),
        projection: options.projection
      });

      return source;
    },
    init() {
      const source = this.createSource();
      this.source = source;
      typeof this.$parent.init === "function" && this.$parent.init(source);
    },
    changeSource() {
      const source = this.createSource();
      this.source = source;
      typeof this.$parent.setSource === "function" && this.$parent.setSource(source);
    },
    getSource() {
      return this.source;
    }
  }
};
</script>
