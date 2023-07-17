<template>
  <div id="app" class="max-w-container m-auto bg-black">
    <NuxtLayout>
      <transition name="fade" mode="out-in">
        <NuxtPage />
      </transition>
    </NuxtLayout>
  </div>
</template>
