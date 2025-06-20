<template>
  <div>
    <h1>Order View</h1>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/order'
import { onMounted } from 'vue'

const orderStore = useOrderStore()

const fetchOrder = async () => {
  try {
    await orderStore.fetchAllOrder()
  } catch (error) {
    console.log(error, 'error di component')
  }
}

onMounted(() => fetchOrder())
</script>
