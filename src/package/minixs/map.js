export default {
  inject: ["getMap"],
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.readMap();
  },
  methods: {
    readMap() {
      const { getMap } = this;
      console.log(getMap);
      getMap(map => {
        this.map = map;
      });
    },
    mapIsNull() {
      return this.map === null;
    }
  }
};
