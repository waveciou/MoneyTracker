<template>
  <section>
    <div class="mb-3 py-3 text-center">
      <h2
        class="flex items-center justify-center text-3xl leading-snug before:mr-2 before:inline-block before:h-[42px] before:w-[42px] before:bg-[url('@/assets/images/icon.svg')] before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
      >
        Money Tracker
      </h2>
    </div>
    <ul class="py-3">
      <li class="mb-3">
        <button
          class="before-font-material flex w-full items-center rounded border border-solid border-white px-3 py-2 before:mr-2 before:inline-flex before:h-8 before:w-8 before:items-center before:justify-center before:text-3xl before:content-['\e92b']"
          title="Clear All Records"
          @click="isConfirmOpen = true"
        >
          <span class="flex-1 truncate text-left">Clear All Records</span>
        </button>
      </li>
      <li class="mb-3">
        <a
          href="https://github.com/waveciou/MoneyTracker"
          class="flex w-full items-center rounded border border-solid border-white px-3 py-2 before:mr-2 before:inline-block before:h-8 before:w-8 before:bg-[url('@/assets/images/github.svg')] before:bg-contain before:bg-center before:bg-no-repeat before:content-['']"
          target="_blank"
          title="Github MoneyTracker"
        >
          <span class="flex-1 truncate text-left">Github</span>
        </a>
      </li>
    </ul>
    <p class="text-center text-sm">
      Version: {{ version }}
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
  import pkg from '../package.json';
  import { useRecordStore } from '@/stores/recordStore';

  useHead({ title: 'Money Tracker - Setting' });

  const recordStore = useRecordStore();
  const isConfirmOpen = ref<boolean>(false);
  const version = ref<string>(pkg.version);

  const handleClear = (): void => {
    recordStore.CLEAR_ALL_RECORDS();
    isConfirmOpen.value = false;
  };
</script>
