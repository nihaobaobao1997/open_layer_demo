<template>
  <div class="vector-source-point">
    <slot />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_source_XYZ-XYZ.html
import automatic from "../../../minixs/automatic";
import { Vector as VectorSource, Cluster } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON";

export default {
  name: "VectorSourcePoint",
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
        // features: new GeoJSON({
        //   dataProjection: options.dataProjection,
        // }).readFeatures(options.featureJson),
        // projection: options.projection,
      });
      const clusterSource = new Cluster({
        distance: options.distance, // 聚合点与点之间的距离
        minDistance: options.minDistance, // 聚合点与点之间的最小距离
        source: source
      });

      const geoJSON = new GeoJSON({
        dataProjection: options.dataProjection
      });

      try{
        let features = [];
        const sources = clusterSource.getSource();
        if (![null, undefined].includes(options.featureJson)) {
          features = geoJSON.readFeatures(options.featureJson);
          sources.addFeatures(features);
        }
      } catch(e) {
        // console.error(e);
      }


      return clusterSource;
    },
    init() {
      const source = this.createSource();
      this.source = source;
      typeof this.$parent.init === "function" && this.$parent.init(source);
    },
    changeSource() {
      const source = this.createSource();
      this.source = source;
      typeof this.$parent.setSource === "function" &&
        this.$parent.setSource(source);
    },
    getSource() {
      return this.source;
    }
  }
};
</script>
