<template>
  <div>
    <button
      class="after-font-material w-full py-3 flex justify-between after:block after:basis-0"
      :class="provideButtonClass"
      :title="props.title"
      @click="handleClick"
    >
      <span class="truncate">{{ props.title }}</span>
    </button>
    <transition
      name="accordion"
      @enter="handleAccordionStart"
      @after-enter="handleAccordionEnd"
      @before-leave="handleAccordionStart"
      @after-leave="handleAccordionEnd"
    >
      <div v-show="isOpen">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{ title?: string; default?: boolean }>(),
    {
      title: '',
      default: true,
    }
  );

  const isOpen = ref<boolean>(props.default || true);

  const provideButtonClass = computed((): string => {
    if (isOpen.value) {
      return 'icon-close';
    }
    return 'icon-open';
  });

  const handleClick = (): void => {
    isOpen.value = !isOpen.value;
  };

  const handleAccordionStart = ($element: Element): void => {
    ($element as HTMLElement).style.height = `${$element.scrollHeight}px`;
  };

  const handleAccordionEnd = ($element: Element): void => {
    ($element as HTMLElement).style.height = '';
  };
</script>

<style lang="scss" scoped>
  .icon-open::after {
    content: '\e145';
  }

  .icon-close::after {
    content: '\e15b';
  }
</style>
