import Vue from 'vue';

Vue.mixin({
  methods: {
    // 物件的深拷貝
    DEEP_CLONE(payload) {
      return JSON.parse(JSON.stringify(payload));
    }
  },
});