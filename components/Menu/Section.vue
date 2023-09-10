<template>
  <nav class="w-full h-menu-height basis-menu-height bg-black-darkest">
    <div class="flex">
      <button
        v-for="item in menuButtons"
        :key="item.name"
        :title="item.name"
        class="w-1/5 h-menu-height flex justify-center items-center"
        :class="item.path === route.path && 'text-yellow'"
        @click="handleClick(item)"
      >
        <div
          class="before-font-material text-center before:block before:w-10 before:h-8 before:m-auto before:text-center before:text-3xl"
          :class="`${item.className}`"
        >
          <span class="block leading-5 tracking-normal text-xs truncate">
            {{ item.name }}
          </span>
        </div>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumMenuName } from '@/assets/enums/menu';

  const route = useRoute();
  const router = useRouter();
  const recordStore = useRecordStore();

  interface IMenuButtonItem {
    name: string;
    path: string;
    className: string;
  }

  const menuButtons = ref<IMenuButtonItem[]>([
    {
      name: EnumMenuName.CALENDAR,
      path: '/',
      className: 'icon-home',
    },
    {
      name: EnumMenuName.OVERVIEW,
      path: '/overview',
      className: 'icon-overview',
    },
    {
      name: EnumMenuName.RECORD,
      path: '',
      className: 'icon-record',
    },
    {
      name: EnumMenuName.ANALYSIS,
      path: '/analysis',
      className: 'icon-analysis',
    },
    {
      name: EnumMenuName.SETTING,
      path: '/setting',
      className: 'icon-setting',
    },
  ]);

  const handleClick = (payload: IMenuButtonItem): void => {
    if (payload.name === EnumMenuName.RECORD) {
      recordStore.HANDLE_MODE_CREATER();
    } else {
      router.push(payload.path);
    }
  };
</script>

<style lang="scss" scoped>
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
