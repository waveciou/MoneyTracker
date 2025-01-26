<template>
  <ul class="my-3 flex">
    <li v-for="item in analysisTypes" :key="item" class="w-4/12">
      <button
        class="block w-full text-center after:block after:h-[3px] after:w-full after:bg-yellow after:content-['']"
        :class="
          props.type === item
            ? 'text-yellow after:opacity-100'
            : 'text-white after:opacity-0'
        "
        :title="item"
        @click="handleClick(item)"
      >
        <span class="block w-full px-2 py-2">{{ item }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { EnumChartAnalysisType } from '@/assets/types/chart';

  const props = withDefaults(defineProps<{ type: EnumChartAnalysisType }>(), {
    type: EnumChartAnalysisType.CATEGORY,
  });

  const emits = defineEmits<{
    (e: 'update', value: EnumChartAnalysisType): void;
  }>();

  const analysisTypes = ref<EnumChartAnalysisType[]>([
    EnumChartAnalysisType.CATEGORY,
    EnumChartAnalysisType.STORE,
    EnumChartAnalysisType.TAGS,
  ]);

  const handleClick = (payload: EnumChartAnalysisType): void => {
    emits('update', payload);
  };
</script>
