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

  const contextCategories = computed((): string[] => {
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
      return contextCategories.value.includes(category);
    });
  });

  const provideSeries = computed((): number[] => {
    const result: { [key: string]: number } = {};

    contextCards.value.forEach(({ category, price }) => {
      if (selectedCategory.value === EnumRecordType.EXPENSE) {
        const mainName = getMainCategoryID(category);

        if (result[mainName] === undefined) {
          result[mainName] = price;
        } else {
          result[mainName] = result[mainName] + price;
        }
      } else if (result[category] === undefined) {
        result[category] = price;
      } else {
        result[category] = result[category] + price;
      }
    });

    return Object.values(result);
  });

  const provideLabels = computed((): string[] => {
    const result = contextCards.value.map(({ category }) =>
      useCategoryName(category)
    );
    const a: Set<string> = new Set(result);
    return [...a];
  });

  const getMainCategoryID = (categoryID: string): string => {
    const recordType = useCategoryValidator(categoryID);
    if (recordType === EnumRecordType.EXPENSE) {
      return expense.value.reduce((prev, current) => {
        const a = current.subcategories.some(({ id }) => id === categoryID);
        if (a) {
          return current.id;
        }
        return prev;
      }, '' as string);
    }
    return categoryID;
  };
</script>
