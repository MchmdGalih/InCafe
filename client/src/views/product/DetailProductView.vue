<template>
  <MainLayout>
    <template #content>
      <div class="min-h-screen lg:px-12 font-secondary px-4 py-4">
        <nav class="breadcrumbs text-sm p-2">
          <ul>
            <li>
              <RouterLink to="/"> Home </RouterLink>
            </li>
            <li class="capitalize">{{ product.name }}</li>
          </ul>
        </nav>

        <div
          class="mx-auto bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 lg:mt-8 mt-4"
        >
          <div class="flex items-center justify-center">
            <img
              :src="product.image_cover"
              :alt="product.name"
              class="max-w-md rounded-xl object-cover"
            />
          </div>

          <div class="flex flex-col justify-between space-y-6 py-4">
            <div>
              <span class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.name }}</h1>
                <p :class="classCategory">{{ product.Category?.name }}</p>
              </span>
              <p class="text-gray-600 text-lg mb-4">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="flex gap-2 items-center">
                  <p class="text-2xl font-semibold text-gray-600">
                    {{ formatToIdr(product.price) }}
                  </p>
                  <p class="text-gray-400">
                    {{ product.stock > 0 ? 'In Stock' : 'Out Of Stock' }}
                  </p>
                </span>

                <div class="flex gap-x-2">
                  <button @click="() => (qty == 0 ? 0 : qty--)" class="btn btn-xs">
                    <font-awesome-icon icon="fa-solid fa-minus" />
                  </button>

                  <input
                    type="text"
                    v-model="qty"
                    class="field-sizing-content text-center min-w-10"
                  />
                  <button @click="() => qty++" class="btn btn-xs">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </button>
                </div>
              </div>
            </div>
            <div class="flex gap-4">
              <button
                :disabled="!isAuthenticated"
                @click="handleAddCart"
                class="flex-1 bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold disabled:cursor-not-allowed py-3 px-6 rounded-xl transition duration-300 disabled"
              >
                Add to Cart
              </button>
              <button
                @click="orderNow"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/mainLayout.vue'
import { formatToIdr } from '@/services/formatRp'
import { useProductStore } from '@/stores/product'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useStoreCart } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const storeCart = useStoreCart()
const { isAuthenticated } = storeToRefs(authStore)

const route = useRoute()
const id = route.params.id
const product = ref({})
const productStore = useProductStore()

const qty = ref(0)

const handleAddCart = () => {
  storeCart.addItem(product.value, qty.value)
}

const handleGetProductById = async (id) => {
  try {
    const response = await productStore.getProductById(id)
    product.value = response
  } catch (error) {
    return error
  }
}

const categoryColors = {
  coffee: 'text-amber-900 ',
  snacks: 'text-amber-400',
  foods: 'text-green-800',
}

const classCategory = computed(() => {
  const key = product.value.Category?.name.toLowerCase() || ''
  return categoryColors[key] || 'text-blue-500'
})

onMounted(() => {
  handleGetProductById(id)
})
</script>
