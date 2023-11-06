<template>
  <div class="geo-tiff-source">
    <slot />
  </div>
</template>
<script>
// 参数文档 https://openlayers.org/en/latest/apidoc/module-ol_source_GeoTIFF-GeoTIFFSource.html
import automatic from "../../../minixs/automatic";
import GeoTIFFSource from "ol/source/GeoTIFF";
export default {
  name: "GeoTIFFSource",
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
      handler: function(n) {
        const { auto } = this;
        if (auto) {
          this.changeSource();
        }
      },
      deep: true
    }
  },
  methods: {
    createSource() {
      const { options } = this;
      const source = new GeoTIFFSource(options);
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
