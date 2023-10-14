<template>
  <div>
    <FormCategoryAnalysis v-model.trim="selectedCategory" />

    <div class="w-full h-[320px] flex items-center">
      <ChartPie
        class="w-full"
        :series="provideSeries"
        :labels="provideLabels"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IChartTimeFrame } from '@/assets/interfaces/chart';
  import { IRecordForm } from '@/assets/interfaces/record';

  const props = withDefaults(
    defineProps<{
      mode: EnumChartMode;
      timeFrame: IChartTimeFrame;
    }>(),
    {
      mode: EnumChartMode.MONTHS,
      timeFrame() {
        const { year, month } = useTimeTodayValue();
        return { year, month };
      },
    }
  );

  const recordStore = useRecordStore();
  const categoriesStore = useCategoriesStore();
  const { storage } = storeToRefs(recordStore);
  const { expense, income } = storeToRefs(categoriesStore);

  const selectedCategory = ref<string>(EnumRecordType.EXPENSE);

  const provideCategoryList = computed((): { id: string; name: string }[] => {
    if (selectedCategory.value === EnumRecordType.EXPENSE) {
      return expense.value.map(({ id, name }) => ({ id, name }));
    }

    if (selectedCategory.value === EnumRecordType.INCOME) {
      return income.value;
    }

    const contextCategory = expense.value.find(
      ({ id }) => selectedCategory.value === id
    );

    if (contextCategory) {
      return contextCategory.subcategories;
    }
    return [];
  });

  const contextCards = computed((): IRecordForm[] => {
    const timeFilter: IRecordForm[] = storage.value.filter(({ time }) => {
      const { year, month } = useTimeValue(time);
      const { timeFrame } = props;

      switch (props.mode) {
        case EnumChartMode.YEARS:
          return year === timeFrame.year;
        case EnumChartMode.MONTHS:
          return year === timeFrame.year && month === timeFrame.month;
        case EnumChartMode.ALL:
          return true;
        default:
          return false;
      }
    });

    if (selectedCategory.value === EnumRecordType.EXPENSE) {
      return timeFilter.filter(
        ({ category }) =>
          useCategoryValidator(category) === EnumRecordType.EXPENSE
      );
    }

    if (selectedCategory.value === EnumRecordType.INCOME) {
      return timeFilter.filter(
        ({ category }) =>
          useCategoryValidator(category) === EnumRecordType.INCOME
      );
    }

    return timeFilter.filter(({ category }) => {
      return provideCategoryList.value.some(({ id }) => id === category);
    });
  });

  const provideSeries = computed((): number[] => []);

  const provideLabels = computed((): string[] => []);
</script>
