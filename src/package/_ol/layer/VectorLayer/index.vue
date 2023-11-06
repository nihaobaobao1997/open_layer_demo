<template>
  <div class="vector-layer">
    <slot ref="slot" />
  </div>
</template>
<script>
import mapMixins from "../../../minixs/map";
import VectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style.js";
import { LinearRing } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import { Feature } from "ol";
import { fromExtent } from "ol/geom/Polygon";
export default {
  name: "VectorLayerComponents",
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
          fill: new Fill(options.style.fill),
          stroke: new Stroke(options.style.stroke)
        })
      });
      this.layer = layer;
      const fts = new GeoJSON().readFeatures(JSON.parse(options.geojsonOpts));
      const ft = fts[0];
      const converGeom = this.erase(ft.getGeometry());
      const convertFt = new Feature({
        geometry: converGeom
      });
      layer.getSource().addFeature(convertFt);
      const { getMap } = this;
      getMap((map) => {
        map.addLayer(layer);
      });
      const data = { layer, source };
      this.$emit("ready", data);
    },
    // 擦除操作，生产遮罩范围
    erase(geom) {
      const extent = [-180, -90, 180, 90];
      const polygonRing = fromExtent(extent);
      const coords = geom.getCoordinates();
      coords.forEach((coord) => {
        const linearRing = new LinearRing(coord[0]);
        polygonRing.appendLinearRing(linearRing);
      });
      return polygonRing;
    },
    getSource(source) {
      this.layer.setSource(source);
    },
    getLayer() {
      return this.layer;
    }
  }
};
</script>
