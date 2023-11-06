<template>
  <div class="view">
    <slot></slot>
  </div>
</template>

<script>
import View from "ol/View";

export default {
  name: "OlView",
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({
        center: [91.11, 29.64],
        zoom: 2, // 初始化显示zoom
        minZoom: 0,
        maxZoom: 21,
        projection: "EPSG:4326", // 坐标
        wrapX: false // 限制图层在x轴方向重复；
      })
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { options } = this;
      const view = new View(options);

      typeof this.$parent.init === "function" && this.$parent.init(view);
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
