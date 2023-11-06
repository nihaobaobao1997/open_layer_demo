<template>
  <div class="pbf-source">
    <slot />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html
import automatic from "../../../minixs/automatic";
import VectorTile from "ol/source/VectorTile.js";
import { createXYZ } from "ol/tilegrid";
import MVT from "ol/format/MVT.js";

export default {
  name: "PbfSource",
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
      const TileGrid = createXYZ(options.tileGrid);
      const tempOpts = structuredClone(options);
      tempOpts.format = new MVT();
      tempOpts.tileGrid = TileGrid;
      const source = new VectorTile(tempOpts);
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
      typeof this.$parent.setSource === "function" &&
        this.$parent.setSource(source);
    },
    getSource() {
      return this.source;
    }
  }
};
</script>
