<template>
  <nav class="h-24 w-full basis-24 bg-black-darkest">
    <div class="flex">
      <button
        v-for="item in menuButtons"
        :key="item.name"
        :title="item.name"
        class="flex h-menu-height w-1/5 items-center justify-center"
        :class="item.path === route.path && 'text-yellow'"
        @click="handleClick(item)"
      >
        <div
          class="before-font-material text-center before:m-auto before:block before:h-8 before:w-10 before:text-center before:text-3xl"
          :class="`${item.className}`"
        >
          <span class="block truncate text-xs leading-5 tracking-normal">
            {{ item.name }}
          </span>
        </div>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';
  import { EnumMenuName, EnumRouteName } from '~/assets/types/index';

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
      path: EnumRouteName.CALENDAR,
      className: 'icon-home',
    },
    {
      name: EnumMenuName.OVERVIEW,
      path: EnumRouteName.OVERVIEW,
      className: 'icon-overview',
    },
    {
      name: EnumMenuName.RECORD,
      path: '',
      className: 'icon-record',
    },
    {
      name: EnumMenuName.ANALYSIS,
      path: EnumRouteName.ANALYSIS,
      className: 'icon-analysis',
    },
    {
      name: EnumMenuName.SETTING,
      path: EnumRouteName.SETTING,
      className: 'icon-setting',
    },
  ]);

  const handleClick = (payload: IMenuButtonItem): void => {
    if (payload.name === EnumMenuName.RECORD) {
      recordStore.HANDLE_MODE_CREATOR();
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
