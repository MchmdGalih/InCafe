<template>
  <Transition name="slide-fade">
    <div
      v-if="isShowCart"
      class="fixed bg-white/30 backdrop-blur-sm w-full h-[90dvh] max-sm:h-[90vh] flex flex-col z-30 box-border items-end overflow-y-auto hide-scrollbar"
    >
      <div
        class="w-full flex justify-between items-center lg:max-w-2/5 md:w-2/4 p-4 text-xl text-white font-primary bg-amber-800"
      >
        <h1>Your carts</h1>

        <button @click="$emit('close-cart')" class="cursor-pointer rounded-full btn">X</button>
      </div>

      <section
        class="bg-white shadow-xl w-full flex flex-col gap-2 p-2 lg:w-2/5 sm:w-2/4 h-full overflow-y-auto hide-scrollbar"
      >
        
      </section>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isShowCart: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['close-cart'])


</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
