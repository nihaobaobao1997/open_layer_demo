<template>
  <div >
    <div v-if="show" class="plottingDialog">
      <el-container>
        <el-header height="30">
          <el-row>
            <el-col :span="23" class="title"> 在线标绘 </el-col>
            <!-- <el-col :span="4">
                    <el-button icon="iconfont icon-gis_biaohui" title="隐藏页面" type="danger" size="mini" class="close1" @click="hideDialog"></el-button>
                </el-col> -->
            <el-col :span="4">
              <el-button
                icon="el-icon-close"
                title="关闭页面"
                type="danger"
                size="mini"
                class="close"
                @click="close"
              ></el-button>
            </el-col>
          </el-row>
        </el-header>
        <div class="line" style="margin-top: 10px">
          <el-row>
            <el-col :span="2">
              <span class="text">点标</span>
            </el-col>
            <el-col :span="14">
              <el-button type="primary" size="mini" @click="activate('marker')">点</el-button>
              <el-button type="primary" size="mini" @click="activate('text')">文本</el-button>
              <!-- <el-button type="primary" size="mini" @click="addtext()">文本</el-button> -->
            </el-col>
            <el-col :span="3">
              <el-button
                class="delete_btn"
                type="primary"
                size="mini"
                @click="deleteone()"
              >删除</el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                class="delete_btn"
                type="primary"
                size="mini"
                @click="deleteall()"
              >全部删除</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line">
          <el-row>
            <el-col :span="2">
              <span class="text">线标</span>
            </el-col>
            <el-col :span="22">
              <el-button type="primary" size="mini" @click="activate('arc')">弧线</el-button>
              <el-button type="primary" size="mini" @click="activate('curve')">曲线</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('polyline')"
              >折线</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('freehand_line')"
              >自由线</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line">
          <el-row>
            <el-col :span="2">
              <span class="text">面标</span>
            </el-col>
            <el-col :span="22">
              <el-button type="primary" size="mini" @click="activate('circle')">圆</el-button>
              <el-button type="primary" size="mini" @click="activate('ellipse')">椭圆</el-button>
              <el-button type="primary" size="mini" @click="activate('lune')">弓形</el-button>
              <el-button type="primary" size="mini" @click="activate('sector')">扇形</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('closed_curve')"
              >曲线面</el-button>
              <el-button type="primary" size="mini" @click="activate('polygon')">多边形</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('rectangle')"
              >矩形</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('freehand_polygon')"
              >自由面</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('gathering_place')"
              >聚集地</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line">
          <el-row>
            <el-col :span="2">
              <span class="text">箭头</span>
            </el-col>
            <el-col :span="22">
              <el-button
                type="primary"
                size="mini"
                @click="activate('double_arrow')"
              >钳击</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('straight_arrow')"
              >直箭头</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('fine_arrow')"
              >细直箭头</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('assault_direction')"
              >突击方向</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('attack_arrow')"
              >进攻方向</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('tailed_attack_arrow')"
              >进攻方向（尾）</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('squad_combat')"
              >分队战斗行动</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('tailed_squad_combat')"
              >分队战斗行动（尾）</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line">
          <el-row>
            <el-col :span="2">
              <span class="text">气象</span>
            </el-col>
            <el-col :span="22">
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_warm_front')"
              >暖前锋</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_cold_front')"
              >冷前锋</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_occluded_front')"
              >锢囚锋</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_stationary_front')"
              >静止锋</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_trough_line')"
              >槽线</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_ridge_line')"
              >脊线</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_warm_advection')"
              >暖气流</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_cold_advection')"
              >冷气流</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_windbarb')"
              >风羽</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_high_pressure')"
              >高气压</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_low_pressure')"
              >低气压</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_warm_center')"
              >暖心</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_cold_center')"
              >冷心</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_rising')"
              >升温</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_cooling')"
              >降温</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="activate('mete_typhon')"
              >台风</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line">
          <el-row>
            <el-col :span="3">
              <span class="text">设置样式</span>
            </el-col>
            <el-col :span="18">
              <el-input v-model="styletext" @input="update" />
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini" @click="setStyle()">设置样式</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line">
          <el-row>
            <el-col :span="3">
              <span class="text">地图定位</span>
            </el-col>
            <el-col :span="9">
              <el-input v-model="jdvalue" placeholder="输入经度" />
            </el-col>
            <el-col :span="9">
              <el-input v-model="wdvalue" placeholder="输入纬度" />
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini" @click="location()">点击定位</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="line" style="margin-bottom: 10px">
          <el-row>
            <el-col :span="3">
              <span class="text">定位样式</span>
            </el-col>
            <el-col :span="9">
              <el-button
                style="width: 30px; height: 30px; margin-left: 15px"
                type="dark"
                size="mini"
                @click="setlotype('circle')"
              ><span style="margin-left: -7px">◯</span></el-button>
              <el-button
                style="width: 30px; height: 30px"
                type="dark"
                size="mini"
                @click="setlotype('square')"
              ><span style="margin-left: -5px">▢</span></el-button>
              <el-button
                style="width: 30px; height: 30px"
                type="dark"
                size="mini"
                @click="setlotype('triangle')"
              ><span style="margin-left: -5px">▲</span></el-button>
              <el-button
                style="width: 30px; height: 30px"
                type="dark"
                size="mini"
                @click="setlotype('fivestar')"
              ><span style="margin-left: -5px">☆</span></el-button>
              <el-button
                style="width: 30px; height: 30px"
                type="dark"
                size="mini"
                @click="setlotype('cross')"
              ><span style="margin-left: -6px">十</span></el-button>
              <el-button
                style="width: 30px; height: 30px"
                type="dark"
                size="mini"
                @click="setlotype('multiplication')"
              ><span style="margin-left: -4px">╳</span></el-button>
            </el-col>
            <el-col :span="9">
              <el-input v-model="lostyletext" @input="updatelo" />
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini" @click="location_setcolor()">修改样式</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="line">
                <el-row>
                    <el-col :span="3">
                        <span class="text">添加属性</span>
                    </el-col>
                    <el-col :span="9">
                        <el-input placeholder="输入key" v-model="attrkey"></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-input placeholder="输入value" v-model="attrvalue"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="mini" @click="addAttribute()">添加属性</el-button>
                    </el-col>
                </el-row>
            </div> -->
        <!-- <div style="height:90px;text-align:center;margin-top:10px;margin-bottom:10px;margin-left:20px">
                <el-table
                    style="background-color: rgba(62 , 64 , 86 , 0.7);color: #FFFFFF;width:97%;"
                    :data="tableData"
                    max-height="90"
                    height="90"
                    :row-style="rowStyle"
                    :cell-style="cellStyle"
                    :header-row-style="{background:'#0c5276',color:'#000'}"
                    size="mini">
                    <el-table-column label="属性" align="center" width="310" prop="key"></el-table-column>
                    <el-table-column label="属性值" align="center" width="310" prop="value"></el-table-column>
                </el-table>
            </div> -->
      </el-container>
    </div>
  </div>
</template>
<script>
import mapMixins from "@/package/minixs/map";
import PlottingLayer from "@/utils/plotting/plot/PlottingLayer.js";
import FeatureOperatorEvent from "@/utils/plotting/plot/events/FeatureOperatorEvent.js";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill, Stroke, RegularShape } from "ol/style";
import { Message } from "element-ui";
import { Bus } from "@/utils/bus";
window.g_op_feature = null;
var singleclick = null;
var vectorSource;
var vectorLayer;
export default {
  name: "PlottingPanel", // 标绘
  mixins: [mapMixins],
  data() {
    return {
      map: null,
      styletext: "",
      texttext: "",
      attrkey: "",
      attrvalue: "",
      tableData: [],
      g_pol_layer: null,
      jdvalue: "",
      wdvalue: "",
      show: true,
      lostyletext: '{size:10,fill:"rgb(255,0,0)",stoke:"rgb(255,0,0)"}',
      type: "circle",
      style: null
    };
  },
  computed: {
    rowStyle() {
      return { background: "transparent", height: "20px", border: "gray" };
    },
    cellStyle() {
      return { height: "20px", padding: "2px 0" };
    }
  },
  mounted() {
    this.getBaseMap();
  },
  beforeDestroy() {
    if (this.g_pol_layer && this.g_pol_layer.showLayer) {
      this.close();
    }
  },
  methods: {
    getBaseMap() {
      const { getMap } = this;
      getMap((map) => {
        this.map = map;
        this.g_pol_layer = new PlottingLayer(this.map);
        
        var that = this;
        this.g_pol_layer.on(FeatureOperatorEvent.ACTIVATE, function(e) {
          that.tableData = [];
          window.g_op_feature = e.feature_operator;
          that.styletext = JSON.stringify(window.g_op_feature.getStyle());
          /* window.g_op_feature.iteratorAttribute(function (key) {
                that.tableData.push({key:key,value:this.getAttribute(key)})
            }, window.g_op_feature) */
        });
        this.g_pol_layer.on(FeatureOperatorEvent.DEACTIVATE, function(e) {
          window.g_op_feature = null;
          that.styletext = "";
          // that.tableData=[];
        });
        /* singleclick = function (evt) {
            that.settextLocation(evt.pixel)
        } */
        this.creatVectorLayer();
      });
    },
    hideDialog() {
      this.show = false;
    },
    showDialog() {
      this.show = true;
    },
    creatVectorLayer() {
      vectorSource = new VectorSource();
      vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 99999,
        transparent: "true"
      });
      var layersArray = this.map.getLayers();
      layersArray.insertAt(layersArray.length, vectorLayer);
    },
    close() {
      // this.show = false;
      Bus.$emit("closePotting");
      this.deleteall();
      if (vectorLayer) {
        this.map.removeLayer(vectorLayer);
      }
    },
    deleteone() {
      if (window.g_op_feature == null) return;
      this.g_pol_layer.removeFeature(window.g_op_feature);
      window.g_op_feature = null;
    },
    deleteall() {
      if (this.g_pol_layer) {
        this.g_pol_layer.clearFeatures();
        window.g_op_feature = null;
        vectorSource.clear();
      }
    },
    activate(type) {
      this.g_pol_layer.addFeature(type);
    },
    settextLocation(pixel) {
      var container = document.createElement("input");
      container.style.position = "absolute";
      container.style.top = pixel[1] - 5 + "px";
      container.style.left = pixel[0] - 5 + "px";
      container.style.background = "transparent";
      container.style.color = "#fff";
      container.style.zIndex = 999;
      var overlay = document.getElementById("map");
      overlay.appendChild(container);
      this.map.un("singleclick", singleclick);
      container.onmousedown = (e) => {
        const disX = e.clientX - container.offsetLeft;
        const disY = e.clientY - container.offsetTop;
        document.onmousemove = (e) => {
          const left = e.clientX - disX;
          const top = e.clientY - disY;
          container.style.left = left + "px";
          container.style.top = top + "px";
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
          container.style.border = "none";
        };
      };
      container.ondblclick = (e) => {
        overlay.removeChild(container);
      };
    },
    setStyle() {
      if (!window.g_op_feature) {
        alert("请先选择一个标绘图元");
        return;
      }
      window.g_op_feature.setStyle(JSON.parse(this.styletext));
    },
    addAttribute() {
      if (!window.g_op_feature) {
        alert("请先选择一个标绘图元");
        return;
      }
      var key = this.attrkey;
      var value = this.attrvalue;
      if (key && value) window.g_op_feature.setAttribute(key, value);
      this.tableData.push({ key: key, value: value });
    },
    update(val) {
      this.styletext = val;
    },
    updatelo(val) {
      this.lostyletext = val;
    },
    location() {
      if (this.jdvalue === "") {
        Message({
          message: "请输入经度",
          type: "warning"
        });
        return;
      }
      if (this.wdvalue === "") {
        Message({
          message: "请输入经度",
          type: "warning"
        });
        return;
      }
      vectorSource.clear();
      var point;
      point = new Point([parseFloat(this.jdvalue), parseFloat(this.wdvalue)]);

      var feature = new Feature(point);
      var style = this.updatestyle();
      feature.setStyle(style);
      vectorSource.addFeatures([feature]);
      var center;
      center = [parseFloat(this.jdvalue), parseFloat(this.wdvalue)];

      this.map.getView().animate({
        center: center,
        zoom: 4,
        rotation: undefined,
        duration: 1000
      });
    },
    updatestyle() {
      var style;
      if (this.type == "circle") {
        style = new Style({
          image: new Circle({
            radius: eval("(" + this.lostyletext + ")").size,
            fill: new Fill({
              color: eval("(" + this.lostyletext + ")").fill
            }),
            stroke: new Stroke({
              color: eval("(" + this.lostyletext + ")").stoke,
              width: 2
            })
          })
        });
      } else {
        var points, radius2, angle, rotation, rotateWithView;
        if (this.type == "square") {
          points = 4;
          radius2 = eval("(" + this.lostyletext + ")").size;
          angle = Math.PI / 4;
          rotation = Math.PI / 180;
          rotateWithView = false;
        }
        if (this.type == "triangle") {
          points = 3;
          radius2 = eval("(" + this.lostyletext + ")").size;
          angle = 0;
          rotation = Math.PI / 180;
          rotateWithView = false;
        }
        if (this.type == "fivestar") {
          points = 5;
          radius2 = 4;
          angle = 0;
          rotation = 0;
          rotateWithView = false;
        }
        if (this.type == "cross") {
          points = 4;
          radius2 = 0;
          angle = 0;
          rotation = 0;
          rotateWithView = false;
        }
        if (this.type == "multiplication") {
          points = 4;
          radius2 = 0;
          angle = Math.PI / 4;
          rotation = 0;
          rotateWithView = false;
        }
        style = new Style({
          image: new RegularShape({
            fill: new Fill({
              color: eval("(" + this.lostyletext + ")").fill
            }),
            stroke: new Stroke({
              color: eval("(" + this.lostyletext + ")").stoke,
              width: 3
            }),
            radius: eval("(" + this.lostyletext + ")").size,
            points: points,
            radius2: radius2,
            angle: angle,
            rotation: rotation,
            rotateWithView: rotateWithView
          })
        });
      }
      return style;
    },
    setlotype(type) {
      this.type = type;
      if (this.jdvalue != "" && this.wdvalue != "") {
        this.location();
      }
    },
    location_setcolor() {
      if (this.jdvalue != "" && this.wdvalue != "") {
        this.location();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.plottingDialog {
  width: 660px;
  /* height: 300px; */
  position: absolute;
  padding: 12px;
  top: 70px;
  right: 88px;
  z-index: 25;
  color: #222222;
  background: rgba(10,27,67,.74);
  box-shadow: 0px 4px 8px 0px rgba(2,5,36,0.12);
  border-radius: 10px;
}
.el-button--primary {
  color: #66c5fe !important;
  background-color: #042c64 !important;
  border-color: #375DE0 !important;
  min-width: 70px;
  margin-right: 5px;
}
.delete_btn {
  color: #66c5fe !important;
  background-color: #042c64 !important;
  border-color: #375DE0 !important;
  min-width: 70px;
}
/deep/ .plottingDialog .el-input {
  font-size: 12px !important;
  color: #058cd0 !important;
}
.line {
  line-height: 30px;
  text-align: left;
}
.text {
  color: #fff;
  font-size: 14px;
  margin-left: 20px;
}
/deep/ .el-button + .el-button {
  margin-left: 0px;
}
.close1 {
  position: absolute;
  top: 5px;
  right: 50px;
}
/deep/ .plottingDialog .iconfont {
  font-size: 12px !important;
}
/deep/ .el-input__inner {
  border-radius: 0 !important;
  font-size: 16px !important;
  color: #66c5fe !important;
  background: #042c64 !important;
  border-color: #375DE0 !important;
  height: 28px !important;
  line-height: 28px !important;
}
/deep/ .plottingDialog .el-table .el-table__row {
  background-color: rgba(62, 64, 86, 0.7);
}
/deep/ .plottingDialog .el-table tbody tr:hover > td {
  background-color: rgba(62, 64, 86, 1);
  color: #409eff;
}
/deep/ .plottingDialog .el-table th,
.el-table tr {
  background-color: #2859c4;
}
.title {
  text-align: center !important;
  color: #fff !important;
  font-size: 19px !important;
  line-height: 25px !important;
}
.close {
  position: absolute;
  top: 0px;
  right: -20px;
  size: 12px !important;
}
/deep/.el-button--dark {
  color: #66c5fe !important;
  background-color: #042c64 !important;
  border-color: #375DE0 !important;
  border-radius: 50% !important;
}
</style>
