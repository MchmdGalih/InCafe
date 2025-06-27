<template>
  <div class="space-y-1.5">
    <h1 class="px-4 text-2xl font-secondary font-bold">Product Management</h1>

    <section class="p-4 flex gap-2 justify-between items-center">
      <Search classSearch="w-[400px]" @handle-search="handleSearch" />
      <button type="button" id="btnAdd" class="btn btn-primary w-24">Add</button>
    </section>

    <section class="space-y-1">
      <div class="flex justify-between items-center mb-4">
        <h1 class="px-2 text-xl font-secondary">Product currently</h1>
        <div class="flex items-center gap-2">
          <select class="select select-warning">
            <option disabled selected>Pick an OS</option>
            <option>Windows</option>
            <option>MacOS</option>
            <option>Linux</option>
          </select>
          <select class="select select-warning">
            <option disabled selected>Pick an OS</option>
            <option>Windows</option>
            <option>MacOS</option>
            <option>Linux</option>
          </select>
        </div>
      </div>

      <div v-if="isLoading">
        <div class="grid grid-cols-4 gap-2">
          <ProductSkeleton v-for="n in 8" :key="n" />
        </div>
      </div>

      <div v-else>
        <div v-if="dataProduct.length > 0" class="grid grid-cols-4 gap-2">
          <ProductCard v-for="product in dataProduct" :key="product.id" :product="product" />
        </div>

        <div v-else class="text-center text-gray-500 mt-10">Sorry, products not available.</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Search from '@/components/landing/Search.vue'
import ProductCard from '@/components/card/ProductCard.vue'
import ProductSkeleton from '@/components/skeleton/ProductSkeleton.vue'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const keyword = ref('')
const isLoading = ref(false)

const handleSearch = (value) => {
  keyword.value = value
}

const dataProduct = computed(() => {
  return products.value
    .filter((product) => product.name.toLowerCase().includes(keyword.value.toLocaleLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12)
})

const getAllProduct = async () => {
  isLoading.value = !isLoading.value
  try {
    const response = await productStore.getAllProducts()
    return response
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = !isLoading.value
  }
}

onMounted(() => getAllProduct())
</script>
