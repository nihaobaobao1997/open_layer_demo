<template>
  <BaseMap @ready="ready" >
    <Plotting/>
  </BaseMap>
</template>

<script>
import BaseMap from "@/components/OpenlayersMap/BaseMap.vue";
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'
import { Projection, addProjection } from 'ol/proj'
import Plotting from "@/components/Plotting/index.vue";
import mapMixins from "@/package/minixs/map";

export default {
  name: "OpenlayersBasic",
  components: { BaseMap, Plotting },
  provide() {
    return {
      getMap: this.getMap,
    };
  },
  data(){
    return {
      map:null
    }
  },
  mounted() {
  },
  methods: {
    ready(map) {
      this.map = map
      this.addBaseLayer();
      // this.addLayer();
      // this.addMarkLayer();
    },
    getMap(callback) {
      const vm = this;
      function sendMap() {
        const { map } = vm;
        if (map !== null) {
          callback(map);
        } else {
          setTimeout(sendMap, 50);
        }
      }
      sendMap();
    },
    addBaseLayer() {
      // const vectorLayers = new TileWMS({
      //   url: "http://10.1.100.70:90/geoserver/wms",
      //   params: {
      //     LAYERS: "JiaHeDC:ly_qxj_region_simple_v2",
      //     TILED: true,
      //     FORMAT: "image/png",
      //     CRS: "EPSG:4326"
      //   },
      //   projection: "EPSG:4326",
      //   serverType: "geoserver", // 图层类型
      //   hidpi: false,
      //   transition: 0,
      //   crossOrigin: "Anonymous"
      // });

      // OGC WKT 坐标系定义
      proj4.defs('EPSG:4490', 'GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]')
      register(proj4)

      // 重写projection4490，
      let projection4490= new Projection({
        code: 'EPSG:4490',
        units: 'degrees',
        axisOrientation: 'neu'
      })
      projection4490.setExtent([-180, -90, 180, 90])
      projection4490.setWorldExtent([-180, -90, 180, 90])

      addProjection(projection4490)
      
      const vectorMark = new TileLayer({
	      title: '212',
        source: new XYZ({
          url: `https://t{0-7}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=${'468f245cef15e7af8c5a6c3d59908f89'}`,
          // 使用 project4490 (cgcs2000)
          projection: projection4490
        })
      })
      
      
      window.map.addLayer(vectorMark);
    },
    // addLayer() {
    //   const url = "http://10.1.100.70:90/layer/ows?service=WFS&request=GetFeature&typeName=JiaHeDC%3Aly_qxj_region_simple_v2&outputFormat=application%2Fjson&CQL_FILTER=%20REGION_ID%3D3102000001";
    //   const vector = new Vector({
    //     format: new GeoJSON(),
    //     url() {
    //       return url;
    //     }
    //   });

    //   const vectorMark = new VectorLayer({
    //     source: vector,
    //     zIndex: 15 // 图层层级
    //   });
    //   window.map.addLayer(vectorMark);
    // },
    // addMarkLayer() {
    //   const vectorLayers = new TileWMS({
    //     url: "http://10.1.100.70:90/geoserver/JiaHeDC/wms",
    //     params: {
    //       LAYERS: "JiaHeDC:FY3_ACI_2021_5000M",
    //       TILED: true,
    //       FORMAT: "image/png",
    //       CRS: "EPSG:4326"
    //     },
    //     projection: "EPSG:4326",
    //     serverType: "geoserver", // 图层类型
    //     hidpi: false,
    //     transition: 0,
    //     crossOrigin: "Anonymous"
    //   });

    //   const vectorMark = new TileLayer({
    //     source: vectorLayers,
    //     zIndex: 16, // 图层层级
    //     crossOrigin: "Anonymous" // 图层是否允许跨域
    //   });
    //   window.map.addLayer(vectorMark);
    // }
  }
};
</script>

<style scoped>

</style>
