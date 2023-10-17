<template>
  <article
    class="w-full h-full flex flex-col absolute top-0 left-0 z-search-section overflow-hidden bg-black-base"
  >
    <section class="w-full h-full flex flex-col">
      <div>
        <AreaSearchHeader />
        <div class="w-full flex px-wrap-space pb-3">
          <InputClearableText
            v-model.trim="inputValue"
            class="w-full flex-1 mr-2"
          />
          <button
            class="w-9 h-9 basis-9 before-font-material before:content-['\e8b6'] flex justify-center items-center"
          />
        </div>
      </div>
      <div class="h-full overflow-x-hidden relative px-wrap-space"></div>
    </section>
  </article>
</template>

<script setup lang="ts">
  const inputValue = ref<string>('');
</script>
