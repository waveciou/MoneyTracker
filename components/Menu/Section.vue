<template>
  <nav class="w-full h-menu-height basis-menu-height bg-black-darkest">
    <div class="flex">
      <template v-for="item in menuButtons" :key="item.path">
        <button
          v-if="item.name === 'Record'"
          :title="item.name"
          :class="provideLinkClassName"
          @click="handleClickRecord"
        >
          <div :class="`${provideDivClassName} ${item.className}`">
            <span :class="provideSpanClassName">
              {{ item.name }}
            </span>
          </div>
        </button>
        <NuxtLink
          v-else
          :to="item.path"
          :title="item.name"
          :class="provideLinkClassName"
        >
          <div :class="`${provideDivClassName} ${item.className}`">
            <span :class="provideSpanClassName">
              {{ item.name }}
            </span>
          </div>
        </NuxtLink>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  const recordStore = useRecordStore();

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
      path: '',
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

  const provideLinkClassName = ref<string>(
    'w-1/5 h-menu-height flex justify-center items-center'
  );

  const provideDivClassName = ref<string>(
    'before-font-material text-center before:block before:w-10 before:h-8 before:m-auto before:text-center before:text-3xl'
  );

  const provideSpanClassName = ref<string>(
    'block leading-5 tracking-normal text-xs truncate'
  );

  const handleClickRecord = (): void => {
    recordStore.isShowRecord = true;
  };
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
