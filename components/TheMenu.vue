<template>
  <nav class="w-full h-menu-height basis-menu-height">
    <div class="flex">
      <NuxtLink
        v-for="item in menuButtons"
        :key="item.path"
        :to="item.path"
        :title="item.name"
        class="w-1/5 h-menu-height block text-center text-sm"
      >
        <span>{{ item.name }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface IMenuButtonItem {
    name: string;
    path: string;
  }

  const menuButtons = ref<IMenuButtonItem[]>([
    {
      name: '記帳日誌',
      path: '/',
    },
    {
      name: '帳戶總覽',
      path: '/overview',
    },
    {
      name: '新增記帳',
      path: '/record',
    },
    {
      name: '項目分析',
      path: '/analysis',
    },
    {
      name: '設定',
      path: '/setting',
    },
  ]);
</script>

<style lang="scss" scoped></style>
