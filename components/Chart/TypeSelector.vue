import { type } from 'os';
<template>
  <ul class="flex my-3">
    <li v-for="item in analysisTypes" :key="item" class="w-4/12">
      <button
        class="w-full block text-center after:content-[''] after:block after:w-full after:h-[3px] after:bg-yellow"
        :class="
          props.type === item
            ? 'text-yellow after:opacity-100'
            : 'text-white after:opacity-0'
        "
        :title="item"
        @click="handleClick(item)"
      >
        <span class="w-full block px-2 py-2">{{ item }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { EnumChartAnalysisType } from '@/assets/enums/chart';

  const props = withDefaults(defineProps<{ type: EnumChartAnalysisType }>(), {
    type: EnumChartAnalysisType.CATEGORY,
  });

  const emits = defineEmits<{
    (e: 'update', value: EnumChartAnalysisType): void;
  }>();

  const analysisTypes = ref<string[]>([
    EnumChartAnalysisType.CATEGORY,
    EnumChartAnalysisType.STORE,
    EnumChartAnalysisType.TAGS,
  ]);

  const handleClick = (payload: EnumChartAnalysisType): void => {
    emits('update', payload);
  };
</script>
