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
  import numeral from 'numeral';
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRecordStore } from '@/stores/recordStore';
  import { useCategoriesStore } from '@/stores/categoriesStore';
  import { EnumChartMode } from '@/assets/enums/chart';
  import { EnumRecordType } from '@/assets/enums/record';
  import { IChartTimeFrame } from '@/assets/interfaces/chart';
  import { IRecordForm } from '@/assets/interfaces/record';

  interface IContextCardItem {
    name: string;
    storage: IRecordForm[];
  }

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

  const contextCategoryList = computed((): string[] => {
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
      return contextCategoryList.value.includes(category);
    });
  });

  const contextCards = computed((): IContextCardItem[] => {
    return contextRecords.value.reduce((prev, current) => {
      const { category } = current;
      const result = [...prev];
      const isOnlyMainName = selectedCategory.value === EnumRecordType.EXPENSE;
      const name = useCategoryName(category, isOnlyMainName);
      const index = result.findIndex((item) => item.name === name);

      if (index < 0) {
        result.push({ name, storage: [current] });
      } else {
        result[index].storage.push(current);
      }
      return result;
    }, [] as IContextCardItem[]);
  });

  const provideSeries = computed((): number[] => {
    return contextCards.value.map(({ storage }) => {
      return storage.reduce((prev, current) => {
        return numeral(prev).add(current.price).value() || prev;
      }, 0);
    });
  });

  const provideLabels = computed((): string[] => {
    return contextCards.value.map(({ name }) => name);
  });
</script>
