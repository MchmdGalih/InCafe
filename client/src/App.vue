<script setup>
import { useCounterStore } from './stores/counter'
const store = useCounterStore()
</script>

<template>
  <div>
    <div class="max-w-max p-2 bg-red-300 flex justify-center items-center gap-2">
      <button @click="store.increment" class="bg-blue-500 p-2 rounded cursor-pointer">+</button>
      <p>Count: {{ store.count }}</p>
      <p>DoubleCount: {{ store.doubleCount }}</p>
      <button @click="store.decrement" class="bg-red-500 p-2 rounded cursor-pointer">-</button>
    </div>
  </div>
</template>
