<template>
  <nav class="w-full h-menu-height basis-menu-height bg-black-darkest">
    <div class="flex">
      <NuxtLink
        v-for="item in menuButtons"
        :key="item.path"
        :to="item.path"
        :title="item.name"
        class="w-1/5 h-menu-height flex justify-center items-center"
      >
        <div
          class="before-font-material text-center before:block before:w-10 before:h-8 before:m-auto before:text-center before:text-3xl"
          :class="`${item.className}`"
        >
          <span class="block leading-5 tracking-normal text-xs truncate">
            {{ item.name }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
  interface IMenuButtonItem {
    name: string;
    path: string;
    className: string;
  }

  const menuButtons = ref<IMenuButtonItem[]>([
    {
      name: 'Calendar',
      path: '/',
      className: 'icon-home',
    },
    {
      name: 'Overview',
      path: '/overview',
      className: 'icon-overview',
    },
    {
      name: 'Record',
      path: '/record',
      className: 'icon-record',
    },
    {
      name: 'Analysis',
      path: '/analysis',
      className: 'icon-analysis',
    },
    {
      name: 'Setting',
      path: '/setting',
      className: 'icon-setting',
    },
  ]);
</script>

<style lang="scss" scoped>
  .router-link-active {
    @apply text-yellow;
  }

  .icon-home::before {
    content: '\ebcc';
  }

  .icon-overview::before {
    content: '\e7fd';
  }

  .icon-record::before {
    content: '\e145';
  }

  .icon-analysis::before {
    content: '\e26b';
  }

  .icon-setting::before {
    content: '\e8b8';
  }
</style>
