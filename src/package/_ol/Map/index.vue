<template>
  <div :id="options.target" class="map">
    <slot />
  </div>
</template>

<script>
import Map from "ol/Map";
import { defaults as controlDefaults } from "ol/control";
import { defaults as interactionDefaults } from "ol/interaction";

export default {
  name: "OlMap",
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({
        layers: [],
        target: "ol-map",
        zIndex: 100,
        controls: {
          zoom: false,
          rotate: false,
          attribution: false
        },
        interactions: {
          PinchZoom: false
        }
      })
    }
  },
  data() {
    return {
      a: 111111111
    };
  },
  methods: {
    init(view) {
      const { options } = this;
      const tempOpts = structuredClone(options);
      if (tempOpts.controls !== undefined) {
        tempOpts.controls = controlDefaults(tempOpts.controls);
      }
      if (tempOpts.interactions !== undefined) {
        tempOpts.interactions = interactionDefaults(tempOpts.interactions);
      }
      const map = new Map({
        ...tempOpts,
        view
      });

      this.$emit("ready", map);
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
