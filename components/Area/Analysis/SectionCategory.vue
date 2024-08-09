<template>
  <div>
    <AreaAnalysisCategorySelector
      v-model.trim="selectedCategory"
      class="mt-3"
    />
    <div class="w-full h-[300px] flex items-center">
      <ChartPie
        class="w-full"
        :series="provideSeries"
        :labels="provideLabels"
      />
    </div>
    <AreaAnalysisCategories :cards="contextCards" />
  </div>
</template>

<script setup lang="ts">
  import numeral from 'numeral';
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { EnumRecordType } from '@/assets/enums/record';
  import type { IChartTimeFrame } from '@/assets/interfaces/chart';
  import type { IRecordForm } from '@/assets/interfaces/record';
  import type { IAnalysisCardGroup } from '@/assets/interfaces/analysis';

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

  const contextCategoriesID = computed((): string[] => {
    if (selectedCategory.value === EnumRecordType.EXPENSE) {
      return expense.value.map(({ id }) => id);
    }

    if (selectedCategory.value === EnumRecordType.INCOME) {
      return income.value.map(({ id }) => id);
    }

    const contextCategory = expense.value.find(
      ({ id }) => selectedCategory.value === id
    );

    if (contextCategory) {
      return contextCategory.subcategories.map(({ id }) => id);
    }
    return [];
  });

  const contextRecords = computed((): IRecordForm[] => {
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
      return contextCategoriesID.value.includes(category);
    });
  });

  const contextCards = computed((): IAnalysisCardGroup[] => {
    return contextRecords.value.reduce(
      (prev: IAnalysisCardGroup[], current: IRecordForm) => {
        const { category } = current;
        const result = [...prev];

        const isMainCategoryName: boolean =
          selectedCategory.value === EnumRecordType.EXPENSE;

        const name = useCategoryName(category, isMainCategoryName);

        const index = result.findIndex((item) => item.name === name);

        if (index < 0) {
          result.push({ name, storage: [current] });
        } else {
          result[index].storage.push(current);
        }
        return result;
      },
      [] as IAnalysisCardGroup[]
    );
  });

  const provideSeries = computed((): number[] => {
    return contextCards.value.map(({ storage }) => {
      return storage.reduce((prev: number, current: IRecordForm) => {
        return numeral(prev).add(current.price).value() || prev;
      }, 0 as number);
    });
  });

  const provideLabels = computed((): string[] => {
    return contextCards.value.map(({ name }) => name);
  });
</script>
