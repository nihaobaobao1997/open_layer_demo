export default {
  props: {
    auto: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    auto(newAuto) {
      if (newAuto) {
        this.autoExecFunc();
      }
    }
  },
  mounted() {
    this.autoExecFunc();
  },
  methods: {
    autoExecFunc() {
      const { auto, init } = this;
      if (!auto) {
        return;
      }

      if (typeof init === "function") init();
    }
  }
};
