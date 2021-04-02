<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="control === true"
      class="overlay"
    >
      <div
        class="overlay-block"
        @click.stop="overlayClickHandler"
      />
      <div class="lightbox">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    control: Boolean
  },
  methods: {
    // 點擊視窗背板
    overlayClickHandler() {
      this.$emit('click-overlay');
    }
  },
  watch: {
    control: {
      handler(value) {
        this.$store.commit('SET_LIGHTBOX_CTRL_VALUE', value);
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 3000;
  }

  .overlay-block {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba($color-black-dark, 0.7);
  }

  .lightbox {
    width: calc(100% - 20px);
    max-width: 480px;
    max-height: calc(100% - 20px);
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translateX(-50%) translateY(-50%);
  }
</style>