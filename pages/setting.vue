<template>
  <section>
    <div class="py-3 text-center">
      <h2
        class="flex justify-center items-center text-3xl leading-snug before:content-[''] before:inline-block before:mr-2 before:w-[42px] before:h-[42px] before:bg-no-repeat before:bg-contain before:bg-center before:bg-[url('@/assets/images/icon.svg')]"
      >
        Money Tracker
      </h2>
    </div>
    <ul class="py-3">
      <li class="mb-3">
        <button
          class="w-full flex items-center before-font-material before:content-['\e92b'] before:inline-flex before:mr-2 before:w-8 before:h-8 before:justify-center before:items-center before:text-3xl"
          title="Clear All Records"
          @click="isConfirmOpen = true"
        >
          Clear All Records
        </button>
      </li>
      <li class="mb-3">
        <a
          href="https://github.com/waveciou/MoneyTracker"
          class="w-full flex items-center before:content-[''] before:inline-block before:mr-2 before:w-8 before:h-8 before:bg-no-repeat before:bg-contain before:bg-center before:bg-[url('@/assets/images/github.svg')]"
          target="_blank"
          title="Github MoneyTracker"
        >
          Github
        </a>
      </li>
    </ul>
    <p class="text-center text-sm">
      Version: 2.0.0-beta
      <br />
      Created By
      <a
        href="https://github.com/waveciou"
        target="_blank"
        title="Github waveciou"
      >
        @waveciou
      </a>
    </p>
    <ThePopConfirm
      :is-open="isConfirmOpen"
      title="Are you sure to clear all records?"
      left-text="Clear All"
      right-text="Cancel"
      @click-left-button="handleClear"
      @click-right-button="isConfirmOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
  import { useRecordStore } from '@/stores/recordStore';

  useHead({ title: 'Money Tracker - Setting' });

  const recordStore = useRecordStore();
  const isConfirmOpen = ref<boolean>(false);

  const handleClear = (): void => {
    recordStore.CLEAR_ALL_RECORDS();
    isConfirmOpen.value = false;
  };
</script>
