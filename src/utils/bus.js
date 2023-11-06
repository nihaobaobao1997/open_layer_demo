import Vue from "vue";
export var Bus = new Vue();
export function reCreateBus() {
  Bus = new Vue();
}
