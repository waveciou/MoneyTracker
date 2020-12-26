<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="control === true"
      class="overlay"
      @click.stop="overlayClickHandler"
    >
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
  background-color: rgba($color-black-dark, 0.7);
}

.lightbox {
  width: calc(100% - 20px);
  min-height: 300px;
  max-height: calc(100% - 20px);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 10px;
  color: $color-black-light;
  background-color: $color-white;
  border-radius: 7px;
  transform: translateY(-50%);
}

</style>