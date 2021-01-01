<template>
  <div class="accordion">
    <div class="accordion-header">
      <div class="accordion-title">
        {{ title }}
      </div>
      <button
        class="accordion-btn"
        :class="{'is-close': control === false }"
        @click.stop="control = !control"
      />
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

  .accordion-header {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .accordion-title {
    width: calc(100% - 30px);
    overflow: hidden;
    font-size: map-get($font-size, sm);
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4em;
    word-break: keep-all;
  }

  .accordion-btn {
    width: 30px;
    height: 30px;

    &::before {
      @include fontawesome;

      content: '\f068';
    }

    &.is-close::before {
      content: '\f067';
    }
  }
</style>