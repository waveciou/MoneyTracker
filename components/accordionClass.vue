<template>
  <div class="accordion">
    <div
      class="accordion-title"
      :class="{'is-close': control === false }"
      @click.stop="control = !control"
    >
      <span>{{ title }}</span>
    </div>
    <transition
      name="accordion"
      @enter="accordionStartHandler"
      @after-enter="accordionEndHandler"
      @before-leave="accordionStartHandler"
      @after-leave="accordionEndHandler"
    >
      <div v-show="control">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      control: true
    };
  },
  props: {
    title: String
  },
  methods: {
    accordionStartHandler(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    accordionEndHandler(el) {
      el.style.height = '';
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .accordion-title {
    width: 100%;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      width: calc(100% - 30px);
      display: block;
      overflow: hidden;
      font-size: map-get($font-size, sm);
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4em;
      word-break: keep-all;
    }

    &::after {
      @include fontawesome;

      content: '\f068';
      width: 30px;
      height: 30px;
      line-height: 30px;
      display: block;
      text-align: center;
    }

    &.is-close::after {
      content: '\f067';
    }
  }
</style>